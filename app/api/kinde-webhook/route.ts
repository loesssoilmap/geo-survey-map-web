import { NextResponse } from 'next/server'
import jwksClient from 'jwks-rsa'
import jwt from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken'
import { postRegisterUser, updateApiClient } from 'geo-survey-map-shared-modules'
import { DEFAULT_URL_FALLBACK } from '@/constants/constants'

const client = jwksClient({
	jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`
})

export async function POST(req: Request) {
	updateApiClient.setBaseURL(process.env.NEXT_PUBLIC_API_URL || DEFAULT_URL_FALLBACK)

	try {
		const token = await req.text()
		const jwtDecoded = jwt.decode(token, { complete: true })

		if (!jwtDecoded) {
			return NextResponse.json({
				status: 500,
				statusText: 'error decoding jwt'
			})
		}

		const header = jwtDecoded.header
		const kid = header.kid

		const key = await client.getSigningKey(kid)
		const signingKey = key.getPublicKey()
		const event = jwt.verify(token, signingKey) as JwtPayload

		switch (event?.type) {
			case 'user.created':
				const user = event.data.user

				await postRegisterUser({
					email: user?.email!,
					kindeId: user?.id!
				})

				break
			default:
				console.log('event not handled', event.type)
				break
		}
	} catch (err) {
		if (err instanceof Error) {
			console.error(err)
			return NextResponse.json({ message: err.message }, { status: 500 })
		}
	}

	return NextResponse.json({ status: 200, statusText: 'success' })
}

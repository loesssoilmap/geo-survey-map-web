'use client'

import { DEFAULT_URL_FALLBACK } from '@/constants/constants'
import { queryClient, TanstackQueryProvider, updateApiClient } from 'geo-survey-map-shared-modules'

export const TQueryProvider = ({
	children,
	isUserAuthenticated,
	accessTokenRaw
}: {
	children: React.ReactNode
	isUserAuthenticated: boolean
	accessTokenRaw: string
}) => {
	if (isUserAuthenticated) {
		updateApiClient.setAuthenticationHeader(accessTokenRaw)
	} else {
		updateApiClient.removeAuthenticationHeader()
	}
	updateApiClient.setBaseURL(process.env.NEXT_PUBLIC_API_URL || DEFAULT_URL_FALLBACK)

	return <TanstackQueryProvider client={queryClient}>{children}</TanstackQueryProvider>
}

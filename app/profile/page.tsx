import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { ProfileContent } from './_components/profile-content'
import { redirect } from 'next/navigation'

export default async function Profile() {
	const { isAuthenticated } = getKindeServerSession()
	const isLoggedIn = await isAuthenticated()

	if (!isLoggedIn) {
		redirect('/map')
	} else {
		return <ProfileContent />
	}
}

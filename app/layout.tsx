import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { AppContextProvider } from '@/context/AppContext'
import { TQueryProvider } from '@/providers/TQueryProvider'
const montserrat = Montserrat({ subsets: ['latin'] })
import { MarkerFormContextProvider } from '@/context/AddMarkerFormContext'
import { LayoutWrapper } from './layout-wrapper'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { ToastProvider } from '@/components/toast'
import { AuthProvider } from '@/providers/AuthProvider'
const { isAuthenticated, getAccessTokenRaw } = getKindeServerSession()

export const metadata: Metadata = {
	title: 'LOESS Soil Map',
	description:
		'The purpose of this platform is to gather your experiences and opinions on observable climate changes in your local environment. Share your insights on how climate shifts are affecting your community and contribute to a growing database of firsthand accounts. Together, we can build a comprehensive picture of the impact of climate change around the world.'
}

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const isUserAuthenticated = await isAuthenticated()
	const accessTokenRaw = await getAccessTokenRaw()

	return (
		<AuthProvider>
			<html lang="en" className="scroll-smooth">
				<body className={montserrat.className}>
					<TQueryProvider isUserAuthenticated={isUserAuthenticated} accessTokenRaw={accessTokenRaw}>
						<AppContextProvider>
							<MarkerFormContextProvider>
								<LayoutWrapper>
									<ToastProvider>{children}</ToastProvider>
								</LayoutWrapper>
							</MarkerFormContextProvider>
						</AppContextProvider>
					</TQueryProvider>
				</body>
			</html>
		</AuthProvider>
	)
}

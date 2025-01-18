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
		'Shape The Future Of Soil Education. Together, we map, connect, and educate to cultivate soil literacy, fostering awareness, engagement, and sustainable practices.'
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

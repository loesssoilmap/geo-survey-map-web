import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { AppContextProvider } from '@/context/AppContext'
import { TQueryProvider } from '@/provider/TQueryProvider'
const montserrat = Montserrat({ subsets: ['latin'] })
import { updateApiClient } from 'geo-survey-map-shared-modules'
import { MarkerFormContextProvider } from '@/context/AddMarkerFormContext'

export const metadata: Metadata = {
	title: 'GeoSurveyMap',
	description:
		'The purpose of this platform is to gather your experiences and opinions on observable climate changes in your local environment. Share your insights on how climate shifts are affecting your community and contribute to a growing database of firsthand accounts. Together, we can build a comprehensive picture of the impact of climate change around the world.'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={montserrat.className}>
				<TQueryProvider>
					<AppContextProvider>
						<MarkerFormContextProvider>{children}</MarkerFormContextProvider>
					</AppContextProvider>
				</TQueryProvider>
			</body>
		</html>
	)
}

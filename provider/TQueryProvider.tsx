'use client'

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
	updateApiClient.setBaseURL('http://localhost:8080')

	return <TanstackQueryProvider client={queryClient}>{children}</TanstackQueryProvider>
}

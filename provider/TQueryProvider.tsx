'use client'

import { queryClient, TanstackQueryProvider, updateApiClient } from 'geo-survey-map-shared-modules'

export const TQueryProvider = ({ children }: { children: React.ReactNode }) => {
	// updateApiClient.setBaseURL('https://geosurveymapbackend-production.up.railway.app/')
	updateApiClient.setBaseURL('http://localhost:8080')

	return <TanstackQueryProvider client={queryClient}>{children}</TanstackQueryProvider>
}

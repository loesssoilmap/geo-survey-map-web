'use client'

import { useAppContext } from '@/context/AppContext'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { useEffect } from 'react'
import { TileLayer, useMap } from 'react-leaflet'
import { useMarkerFormContext } from '@/context/AddMarkerFormContext'
import { toast } from 'react-toastify'
import { getCountryCode, isDefaultLocation } from '@/lib/utils'
import { DEFAULT_COUNTRYCODE, DEFAULT_LOCATION } from '@/constants/constants'
import { useTranslations } from '@/hooks/useTranslations'

export const MapContent = () => {
	const map = useMap()
	const { appState, handleSetUserLocation } = useAppContext()
	const { handlePickLocation } = useMarkerFormContext()
	const { translations } = useTranslations()

	useEffect(() => {
		const handleLocationFound = async (e: any) => {
			const placeData = await getCountryCode(e.latlng.lat, e.latlng.lng)

			map.setView({ lat: e.latlng.lat, lng: e.latlng.lng }, 17)
			handleSetUserLocation({
				x: e.latlng.lat,
				y: e.latlng.lng,
				countryCode: placeData?.countryCode ?? DEFAULT_COUNTRYCODE,
				name: placeData?.placeName ?? DEFAULT_LOCATION.name
			})
			handlePickLocation({
				x: e.latlng.lat,
				y: e.latlng.lng,
				countryCode: placeData?.countryCode ?? DEFAULT_COUNTRYCODE,
				name: placeData?.placeName ?? DEFAULT_LOCATION.name
			})
		}

		const handleLocationError = () => {
			toast(translations.locationError, { type: 'error' })
		}

		map.locate({ enableHighAccuracy: true, watch: false }).on('locationfound', handleLocationFound).on('locationerror', handleLocationError)

		return () => {
			map.off('locationfound', handleLocationFound)
			map.off('locationerror', handleLocationError)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (appState.isRightSideBarShown && !isDefaultLocation(appState.userLocation.x, appState.userLocation.y)) {
			map.setView({ lat: appState.userLocation.x, lng: appState.userLocation.y }, 17)
		}
	}, [map, appState.isRightSideBarShown, appState.userLocation])

	return (
		<TileLayer
			attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
		/>
	)
}

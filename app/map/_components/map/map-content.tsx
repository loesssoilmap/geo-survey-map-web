'use client'

import { useAppContext } from '@/context/AppContext'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { useEffect, useRef } from 'react'
import { TileLayer, useMap } from 'react-leaflet'
import { useMarkerFormContext } from '@/context/AddMarkerFormContext'
import { toast } from 'react-toastify'
import { getCountryCode } from '@/lib/utils'
import { DEFAULT_COUNTRYCODE, DEFAULT_LOCATION } from '@/constants/constants'
import { useTranslations } from '@/hooks/useTranslations'

export const MapContent = () => {
	const map = useMap()
	const { appState, handleSetUserLocation } = useAppContext()
	const { handlePickLocation } = useMarkerFormContext()
	const { translations } = useTranslations()
	const isRightSidebarShownRef = useRef(appState.isRightSideBarShown)
	isRightSidebarShownRef.current = appState.isRightSideBarShown

	useEffect(() => {
		const handleLocationFound = async (e: any) => {
			const placeData = await getCountryCode(e.latlng.lat, e.latlng.lng)

			handleSetUserLocation({
				x: e.latlng.lat,
				y: e.latlng.lng,
				countryCode: placeData?.countryCode ?? DEFAULT_COUNTRYCODE,
				name: placeData?.placeName ?? DEFAULT_LOCATION.name
			})
			if (!isRightSidebarShownRef.current) {
				map.setView({ lat: e.latlng.lat, lng: e.latlng.lng }, 17)
				handlePickLocation({
					x: e.latlng.lat,
					y: e.latlng.lng,
					countryCode: placeData?.countryCode ?? DEFAULT_COUNTRYCODE,
					name: placeData?.placeName ?? DEFAULT_LOCATION.name
				})
			}
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
		if (!appState.isRightSideBarShown) {
			return
		}

		let shouldIgnore = false

		const setMarkerInCenter = async () => {
			const center = map.getCenter()
			handlePickLocation({
				x: center.lat,
				y: center.lng,
				countryCode: DEFAULT_COUNTRYCODE,
				name: DEFAULT_LOCATION.name
			})
			const placeData = await getCountryCode(center.lat, center.lng)

			if (shouldIgnore) {
				return
			}

			handlePickLocation({
				x: center.lat,
				y: center.lng,
				countryCode: placeData?.countryCode ?? DEFAULT_COUNTRYCODE,
				name: placeData?.placeName ?? DEFAULT_LOCATION.name
			})
		}

		setMarkerInCenter()

		return () => {
			shouldIgnore = true
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [map, appState.isRightSideBarShown])

	return (
		<TileLayer
			attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
		/>
	)
}

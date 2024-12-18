'use client'

import { useAppContext } from '@/context/AppContext'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { useEffect } from 'react'
import { TileLayer, useMap } from 'react-leaflet'
import { useMarkerFormContext } from '@/context/AddMarkerFormContext'
import { toast } from 'react-toastify'
import { isDefaultLocation } from '@/lib/utils'

export const MapContent = () => {
	const map = useMap()
	const { appState, handleSetUserLocation } = useAppContext()
	const { handlePickLocation } = useMarkerFormContext()

	useEffect(() => {
		const handleLocationFound = (e: any) => {
			map.setView({ lat: e.latlng.lat, lng: e.latlng.lng }, 17)
			handleSetUserLocation({ x: e.latlng.lat, y: e.latlng.lng })
			handlePickLocation({ x: e.latlng.lat, y: e.latlng.lng })
		}

		const handleLocationError = () => {
			toast('Nie udało się namierzyć twojej lokalizacji, spróbuj odświeżyć stronę.', { type: 'error' })
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

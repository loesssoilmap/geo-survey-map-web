'use client'

import { categoryToAssets } from '@/components/icons'
import { Icon, Marker as MarkerType } from 'leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { useEffect, useMemo, useRef } from 'react'
import { Marker, useMap } from 'react-leaflet'
import { useMarkerFormContext } from '@/context/AddMarkerFormContext'
import { DEFAULT_LOCATION } from '@/constants/constants'
import { gradientForSurveyMapMarker } from 'geo-survey-map-shared-modules'

export const TemporaryMarker = () => {
	const map = useMap()
	const { formState, handlePickLocation } = useMarkerFormContext()
	const markerRef = useRef<MarkerType | null>(null)
	const affectedAreaCircleRef = useRef<L.Circle<any> | null>(null)
	const customMarker = new Icon({
		iconUrl: formState.category ? categoryToAssets[formState.category].iconUrl : '/person_standing.png',
		iconSize: [30, 30]
	})

	const eventHandlers = useMemo(
		() => ({
			dragend() {
				const marker = markerRef.current
				if (marker != null) {
					handlePickLocation({ x: marker.getLatLng().lat, y: marker.getLatLng().lng })
				}
			}
		}),
		[handlePickLocation]
	)

	useEffect(() => {
		if (affectedAreaCircleRef.current) {
			map.removeLayer(affectedAreaCircleRef.current)
		}

		const newCircle = L.circle(
			{ lat: formState.location.x, lng: formState.location.y },
			{
				radius: formState.affectedArea,
				color: formState.category ? gradientForSurveyMapMarker[formState.category][0] : '#c9c9c9',
				fillColor: formState.category ? gradientForSurveyMapMarker[formState.category][1] : '#636363'
			}
		)
		newCircle.addTo(map)

		affectedAreaCircleRef.current = newCircle

		return () => {
			if (affectedAreaCircleRef.current) {
				map.removeLayer(affectedAreaCircleRef.current)
			}
		}
	}, [formState.affectedArea, formState.location, formState.category, map])

	useEffect(() => {
		if (formState.location.x === DEFAULT_LOCATION.x && formState.location.y === DEFAULT_LOCATION.y) {
			const mapCenter = map.getCenter()
			handlePickLocation({ x: mapCenter.lat, y: mapCenter.lng })
		}
	}, [map, formState.location, handlePickLocation])

	return (
		<Marker
			draggable
			icon={customMarker}
			eventHandlers={eventHandlers}
			position={{ lat: formState.location.x, lng: formState.location.y }}
			ref={markerRef}
		/>
	)
}

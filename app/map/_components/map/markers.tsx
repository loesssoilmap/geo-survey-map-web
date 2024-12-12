'use client'

import { categoryToAssets } from '@/components/icons'
import { useAppContext } from '@/context/AppContext'
import { Icon } from 'leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { useEffect, useMemo, useRef } from 'react'
import { Marker, useMap } from 'react-leaflet'
import { gradientForSurveyMapMarker } from 'geo-survey-map-shared-modules'

export const Markers = () => {
	const map = useMap()
	const { appState, handleMarkerInfoModalShow, setMarkerInfoModalData } = useAppContext()
	const filteredMarkers = useMemo(
		() => appState.markers.filter((marker) => appState.mapFilters.includes(marker.category)),
		[appState.markers, appState.mapFilters]
	)
	const markerAffectedAreaRef = useRef<L.Circle | null>(null)
	const markers = useMemo(
		() =>
			filteredMarkers.map((marker) => {
				const customMarker = createCustomMarkerIcon(marker.category)
				return (
					<Marker
						key={marker.id}
						icon={customMarker}
						position={{ lat: marker.location.x, lng: marker.location.y }}
						eventHandlers={{
							click: () => {
								setMarkerInfoModalData({
									category: marker.category,
									description: marker.description,
									location: marker.location,
									solution: marker.solution,
									affectedArea: marker.affectedArea,
									createdAt: marker.createdAt,
									user: marker.user,
									filePath: marker.filePath
								})
								handleMarkerInfoModalShow()

								const markerAffectedArea = L.circle(
									{ lat: marker.location.x, lng: marker.location.y },
									{
										radius: marker.affectedArea,
										color: gradientForSurveyMapMarker[marker.category][0],
										fillColor: gradientForSurveyMapMarker[marker.category][1]
									}
								)
								markerAffectedArea.addTo(map)
								markerAffectedAreaRef.current = markerAffectedArea
								map.setView({ lat: marker.location.x, lng: marker.location.y }, 16)
							}
						}}
					/>
				)
			}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[filteredMarkers]
	)

	useEffect(() => {
		if (markerAffectedAreaRef.current && !appState.markerInfoModal.isShown) {
			map.removeLayer(markerAffectedAreaRef.current)
			markerAffectedAreaRef.current = null
		}
	}, [map, appState.markerInfoModal.isShown])

	return <>{markers}</>
}

const createCustomMarkerIcon = (category: string) =>
	new Icon({
		iconUrl: categoryToAssets[category].iconUrl,
		iconSize: [30, 30]
	})

'use client'

import { categoryToAssets } from '@/components/icons'
import { useAppContext } from '@/context/AppContext'
import { Icon, Marker as MarkerType } from 'leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useMemo, useRef } from 'react'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import { useMarkerFormContext } from '@/context/AddMarkerFormContext'
import { toast } from 'react-toastify'
import { DEFAULT_LOCATION, DEFAULT_ZOOM, DEFAULT_MIN_ZOOM } from '@/constants/constants'

const Map = () => {
	const { appState, handleMarkerInfoModalShow, setMarkerInfoModalData } = useAppContext()
	const filteredMarkers = () => appState.markers.filter((marker) => appState.mapFilters.includes(marker.category))
	const corner1 = L.latLng(-90, -200)
	const corner2 = L.latLng(90, 200)
	const bounds = L.latLngBounds(corner1, corner2)

	return (
		<MapContainer
			center={{ lat: DEFAULT_LOCATION.x, lng: DEFAULT_LOCATION.y }}
			zoom={DEFAULT_ZOOM}
			scrollWheelZoom={true}
			className="min-h-screen min-w-max"
			maxBoundsViscosity={1.0}
			maxBounds={bounds}
			minZoom={DEFAULT_MIN_ZOOM}>
			<MapContent />
			{filteredMarkers().map((marker) => {
				const customMarker = new Icon({
					iconUrl: categoryToAssets[marker.category].iconUrl,
					iconSize: [30, 30]
				})

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
									createdAt: '',
									user: {}
								})
								handleMarkerInfoModalShow()
							}
						}}
					/>
				)
			})}
			{appState.isRightSideBarShown && <TemporaryMarker />}
		</MapContainer>
	)
}

const MapContent = () => {
	const map = useMap()
	const { handleSetUserLocation } = useAppContext()
	const { handlePickLocation } = useMarkerFormContext()

	useEffect(() => {
		const handleLocationFound = (e: any) => {
			map.setView({ lat: e.latlng.lat, lng: e.latlng.lng }, 15)
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

	return (
		<TileLayer
			attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
		/>
	)
}

const TemporaryMarker = () => {
	const map = useMap()
	const { formState, handlePickLocation } = useMarkerFormContext()
	const markerRef = useRef<MarkerType | null>(null)
	const affectedAreaCircleRef = useRef<L.Circle<any> | null>(null)
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

		const newCircle = L.circle({ lat: formState.location.x, lng: formState.location.y }, { radius: formState.affectedArea / 10 })
		newCircle.addTo(map)

		affectedAreaCircleRef.current = newCircle

		return () => {
			if (affectedAreaCircleRef.current) {
				map.removeLayer(affectedAreaCircleRef.current)
			}
		}
	}, [formState.affectedArea, formState.location, map])

	const customMarker = new Icon({
		iconUrl: formState.category ? categoryToAssets[formState.category].iconUrl : '/person_standing.png',
		iconSize: [30, 30]
	})

	return (
		<Marker
			draggable
			icon={customMarker}
			eventHandlers={eventHandlers}
			position={{ lat: formState.location.x, lng: formState.location.y }}
			ref={markerRef}></Marker>
	)
}

export default Map

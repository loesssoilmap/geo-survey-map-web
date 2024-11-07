'use client'

import { categoryToAssets } from '@/components/icons'
import { useAppContext } from '@/context/AppContext'
import { Icon, Marker as MarkerType, MarkerOptions, circle } from 'leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useMarkerFormContext } from '@/context/AddMarkerFormContext'

const Map = () => {
	const { appState, handleMarkerInfoModalShow, setMarkerInfoModalData } = useAppContext()
	const filteredMarkers = () => appState.markers.filter((marker) => appState.mapFilters.includes(marker.category))
	const { user } = useKindeBrowserClient()
	const corner1 = L.latLng(-90, -200)
	const corner2 = L.latLng(90, 200)
	const bounds = L.latLngBounds(corner1, corner2)

	return (
		<MapContainer
			center={{ lat: 52.406374, lng: 16.9251681 }}
			zoom={15}
			scrollWheelZoom={true}
			className="min-h-screen min-w-max"
			maxBoundsViscosity={1.0}
			maxBounds={bounds}
			minZoom={3}>
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
									solution: marker.solution
								})
								handleMarkerInfoModalShow()
							}
						}}
					/>
				)
			})}
			{user && appState.isRightSideBarShown && <TemporaryMarker />}
		</MapContainer>
	)
}

const MapContent = () => {
	const map = useMap()
	const { handleSetUserLocation } = useAppContext()
	const { handlePickLocation } = useMarkerFormContext()

	useEffect(() => {
		map.locate().on('locationfound', (e) => {
			map.setView(e.latlng, map.getZoom())
			handleSetUserLocation({ x: e.latlng.lat, y: e.latlng.lng })
			handlePickLocation({ x: e.latlng.lat, y: e.latlng.lng })
		})
	}, [handlePickLocation, handleSetUserLocation, map])

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

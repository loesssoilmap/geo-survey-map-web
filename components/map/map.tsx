'use client'

import { categoryToAssets } from '@/components/icons'
import { useAppContext } from '@/context/AppContext'
import { Icon, Marker as MarkerType } from 'leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { useEffect, useMemo, useRef } from 'react'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import { useMarkerFormContext } from '@/context/AddMarkerFormContext'
import { toast } from 'react-toastify'
import { DEFAULT_LOCATION, DEFAULT_ZOOM, DEFAULT_MIN_ZOOM } from '@/constants/constants'
import { gradientForSurveyMapMarker } from 'geo-survey-map-shared-modules'

const Markers = () => {
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

const MapContent = () => {
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
		if (appState.isRightSideBarShown) {
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

const TemporaryMarker = () => {
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

const Map = () => {
	const { appState } = useAppContext()
	const corner1 = L.latLng(-90, -200)
	const corner2 = L.latLng(90, 200)
	const bounds = L.latLngBounds(corner1, corner2)
	const createCustomClusterIcon = function (cluster: L.MarkerCluster) {
		return L.divIcon({
			html: `<span>${cluster.getChildCount()}</span>`,
			className: 'marker-cluster-custom',
			iconSize: L.point(40, 40, true)
		})
	}

	useEffect(() => {}, [appState.isRightSideBarShown])

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
			<MarkerClusterGroup showCoverageOnHover={false} iconCreateFunction={createCustomClusterIcon}>
				<Markers />
			</MarkerClusterGroup>
			{appState.isRightSideBarShown && <TemporaryMarker />}
		</MapContainer>
	)
}

export default Map

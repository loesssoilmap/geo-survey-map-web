'use client'

import { useAppContext } from '@/context/AppContext'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { useEffect } from 'react'
import { MapContainer } from 'react-leaflet'
import { DEFAULT_LOCATION, DEFAULT_ZOOM, DEFAULT_MIN_ZOOM } from '@/constants/constants'
import { MapContent } from './map-content'
import { Markers } from './markers'
import { TemporaryMarker } from './temporary-marker'

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
			{appState.isRightSideBarShown ? <TemporaryMarker /> : ''}
		</MapContainer>
	)
}

export default Map

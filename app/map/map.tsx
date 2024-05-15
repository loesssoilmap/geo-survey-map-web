'use client'

import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const Map = () => {
	return (
		<MapContainer center={{ lat: 51.505, lng: -0.09 }} zoom={13} scrollWheelZoom={false} style={{ height: '100vh', width: '100vw' }}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{/* <Marker position={{ lat: 51.505, lng: -0.09 }}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker> */}
		</MapContainer>
	)
}

export default Map

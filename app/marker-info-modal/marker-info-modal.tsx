'use client'

import { Box } from '@/components/box'
import { categoryToAssets } from '@/components/icons'
import { useAppContext } from '@/context/AppContext'
import React, { useEffect, useRef } from 'react'

export const MarkerInfoModal = () => {
	const { appState, handleMarkerInfoModalHide } = useAppContext()
	const toggleInfoModalStyles = appState.markerInfoModal.isShown ? '' : 'translate-y-full'

	const modalRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				handleMarkerInfoModalHide()
			}
		}

		if (appState.markerInfoModal.isShown) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [appState.markerInfoModal.isShown, handleMarkerInfoModalHide])

	return (
		<div className={`absolute bottom-0 z-800 p-4 transition-all left-1/2 -translate-x-1/2 ${toggleInfoModalStyles}`} ref={modalRef}>
			<Box className="flex flex-col h-full w-96">
				<div className="flex justify-between bg-gradient-wet-soils -m-[2px] rounded-ss-lg rounded-se-lg p-4 text-white">
					<h3 className="font-bold">{categoryToAssets[appState.markerInfoModal.survey?.category as string]?.title}</h3>
				</div>
				<div className="w-full flex flex-col p-4">
					<div>
						<small className="font-bold text-gray">Nazwa miejsca</small>
						<h4 className="font-bold text-lg">{appState.markerInfoModal.survey?.location.name}</h4>
					</div>
					<div>
						<small className="font-bold text-gray">Opis</small>
						<p className="text-xs">{appState.markerInfoModal.survey?.description}</p>
					</div>
					<div>
						<small className="font-bold text-gray">Rozwiazanie problemu</small>
						<p className="text-xs">{appState.markerInfoModal.survey?.solution}</p>
					</div>
				</div>
			</Box>
		</div>
	)
}

'use client'

import { Box } from '@/components/box'
import { categoryToAssets } from '@/components/icons'
import { useAppContext } from '@/context/AppContext'
import { useTranslations } from '@/hooks/useTranslations'
import { formatDateTime, resolveImagePath } from '@/lib/utils'
import { Category } from 'geo-survey-map-shared-modules'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'

export const MarkerInfoModal = () => {
	const { translations } = useTranslations()
	const { appState, handleMarkerInfoModalHide } = useAppContext()
	const toggleInfoModalStyles = appState.markerInfoModal.isShown ? '' : 'translate-y-full '

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

	const formatedDate = appState.markerInfoModal.survey?.createdAt ? formatDateTime(appState.markerInfoModal.survey?.createdAt) : ''

	return (
		<div className={`absolute bottom-0 z-800 p-4 transition-all left-1/2 -translate-x-1/2 ${toggleInfoModalStyles} `} ref={modalRef}>
			<Box className="flex flex-col max-h-80 sm:h-full w-72 sm:w-96 overflow-y-auto overflow-x-hidden">
				<div
					className={`flex justify-between ${
						categoryToAssets[appState.markerInfoModal.survey?.category as string]?.gradient
					} rounded-ss-lg rounded-se-lg p-4 text-white`}>
					<div>
						<h3 className="font-bold">{translations.category[appState.markerInfoModal.survey?.category as Category]}</h3>
						<small>{formatedDate}</small>
					</div>
				</div>
				<div className="w-full flex p-4 gap-2">
					<div className="w-1/2">
						<div>
							<small className="text-xs font-bold text-gray">{translations.pointDetails.placeName}</small>
							<p className="text-sm font-medium break-words">{appState.markerInfoModal.survey?.location.name}</p>
						</div>
						<div>
							<small className="text-xs font-bold text-gray">{translations.pointDetails.affectedArea}</small>
							<p className="text-sm font-medium break-words">{appState.markerInfoModal.survey?.affectedArea} m</p>
						</div>
						<div>
							<small className="text-xs font-bold text-gray">{translations.pointDetails.problemDescription}</small>
							<p className="text-sm font-medium break-words">{appState.markerInfoModal.survey?.description}</p>
						</div>
						<div>
							<small className="text-xs font-bold text-gray">{translations.pointDetails.problemSolution}</small>
							<p className="text-sm font-medium break-words">{appState.markerInfoModal.survey?.solution}</p>
						</div>
					</div>
					<Image
						src={resolveImagePath(appState.markerInfoModal.survey?.filePath!)}
						alt="problem"
						width={200}
						height={200}
						className="w-1/2 object-cover rounded-lg"
					/>
				</div>
			</Box>
		</div>
	)
}

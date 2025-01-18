'use client'

import { Box } from '@/components/box'
import { useAppContext } from '@/context/AppContext'
import { useTranslations } from '@/hooks/useTranslations'
import { Category } from 'geo-survey-map-shared-modules'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'

export const CategoryInfoModal = () => {
	const { translations } = useTranslations()
	const { appState, handleCategoryInfoModalHide } = useAppContext()
	const toggleInfoModalStyles = appState.categoryInfoModal.isShown ? '' : 'translate-y-full '
	const modalRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				handleCategoryInfoModalHide()
			}
		}

		if (appState.categoryInfoModal.isShown) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [appState.categoryInfoModal.isShown, handleCategoryInfoModalHide])

	return (
		<div className={`absolute bottom-0 z-800 p-4 transition-all left-1/2 -translate-x-1/2 ${toggleInfoModalStyles} `} ref={modalRef}>
			<Box className="flex flex-col max-h-80 sm:h-full w-72 sm:w-96">
				<div className={`flex justify-between bg-gradient-erosion rounded-ss-lg rounded-se-lg p-4 text-white`}>
					<div>
						<h3 className="font-bold">{translations.category[appState.categoryInfoModal.category as Category]}</h3>
					</div>
				</div>
				<div className="w-full p-4 overflow-y-auto overflow-x-hidden">
					<p
						className="text-sm font-medium break-words mb-4"
						dangerouslySetInnerHTML={{ __html: appState.categoryInfoModal.categoryInfo }}
					/>
					<Image
						src={appState.categoryInfoModal.categoryImageUrl}
						alt="problem"
						width={200}
						height={200}
						className="w-full object-cover rounded-lg"
					/>
				</div>
			</Box>
		</div>
	)
}

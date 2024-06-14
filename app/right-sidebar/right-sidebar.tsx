'use client'

import { Box } from '@/components/box'
import React, { useState } from 'react'
import { X } from 'lucide-react'
import { useAppContext } from '@/context/AppContext'
import { ActionButtons } from './action-buttons'
import { RightSidebarForm } from './right-sidebar-form'
import { useMarkerFormContext } from '@/context/AddMarkerFormContext'
import { useTranslations } from '@/hooks/useTranslations'

export const RightSidebar = () => {
	const { translations } = useTranslations()
	const { appState, handleLeftSidebarToggle, handleRightSidebarToggle, toggleHideFilters } = useAppContext()
	const { isRightSideBarShown } = appState
	const showSidebarStyles = isRightSideBarShown ? '-translate-x-[19rem]' : ''
	const { resetToInitial } = useMarkerFormContext()

	const handleClose = () => {
		handleLeftSidebarToggle()
		handleRightSidebarToggle()
		toggleHideFilters()
		resetToInitial(appState.userLocation)
	}

	return (
		<div className={`fixed z-800 p-4 flex h-full transition-all top-0 right-0 -me-[19rem] ${showSidebarStyles}`}>
			<ActionButtons />
			<Box className="flex flex-col gap-4 max-w-72 p-4 h-full">
				<div className="flex justify-between">
					<h2 className="text-xl font-bold">{translations.addPoint}</h2>
					<button onClick={handleClose}>
						<X strokeWidth={3} />
					</button>
				</div>
				<p>{translations.addPointForm.chooseCategory.description}</p>
				<RightSidebarForm handleClose={handleClose} />
			</Box>
		</div>
	)
}

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
	const showSidebarStyles = isRightSideBarShown ? '-translate-x-[13rem] sm:-translate-x-[19rem]' : ''
	const { resetToInitial } = useMarkerFormContext()
	const [fileName, setFileName] = useState<string | null>(null)
	const [selectSolution, setSelectSolution] = useState<string>('')

	const scrollToTop = () => {
		window.scrollTo(0, 0)
	}

	const handleClose = () => {
		handleLeftSidebarToggle()
		handleRightSidebarToggle()
		toggleHideFilters()
		resetToInitial(appState.userLocation)
		setFileName(null)
		setSelectSolution('')
		scrollToTop()
	}

	return (
		<div
			className={`fixed z-800 p-4 flex h-full transition-all top-0 right-0 -me-[14rem] sm:-me-[19rem] pointer-events-none ${showSidebarStyles}`}>
			<ActionButtons />
			<Box className="flex flex-col gap-4 max-w-52 sm:max-w-72 p-4 h-full pointer-events-auto overflow-y-auto">
				<div className="flex justify-between">
					<h2 className="text-xl font-bold">{translations.addPoint}</h2>
					<button onClick={handleClose}>
						<X strokeWidth={3} />
					</button>
				</div>
				<p>{translations.addPointForm.chooseCategory.description}</p>
				<RightSidebarForm
					handleClose={handleClose}
					fileName={fileName}
					setFileName={setFileName}
					selectSolution={selectSolution}
					setSelectSolution={setSelectSolution}
				/>
			</Box>
		</div>
	)
}

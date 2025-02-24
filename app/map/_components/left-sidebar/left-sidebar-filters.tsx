'use client'

import React from 'react'
import { Category } from 'geo-survey-map-shared-modules'
import { useAppContext } from '@/context/AppContext'
import { FILTERS } from '@/constants/constants'
import { useTranslations } from '@/hooks/useTranslations'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export const LeftSidebarFilters = () => {
	const { translations } = useTranslations()
	const { appState, updateFilters } = useAppContext()
	const getActiveStyling = (category: Category) => (appState.mapFilters.includes(category) ? 'border-primary bg-primary/10' : '')

	return (
		<React.Fragment>
			<small className="font-bold opacity-50">{translations.filters}</small>
			<ul className="flex flex-col gap-2 flex-1 overflow-y-auto min-h-12">
				{FILTERS.map((item) => (
					<TooltipProvider key={item.title}>
						<Tooltip>
							<TooltipTrigger asChild>
								<li
									className={`rounded-lg border border-gray py-3 px-2 flex items-center gap-2 cursor-pointer transition ${getActiveStyling(
										item.category
									)}`}
									onClick={() => updateFilters(item.category)}>
									{item.icon} {translations.category[item.category]}
								</li>
							</TooltipTrigger>
							<TooltipContent className="z-800 max-w-60">
								<p dangerouslySetInnerHTML={{ __html: translations.categoryInformationTooltip[item.category] }} />
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				))}
			</ul>
		</React.Fragment>
	)
}

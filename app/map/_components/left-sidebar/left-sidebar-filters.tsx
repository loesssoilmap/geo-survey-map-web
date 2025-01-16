'use client'

import React from 'react'
import { Category } from 'geo-survey-map-shared-modules'
import { useAppContext } from '@/context/AppContext'
import { FILTERS } from '@/constants/constants'
import { useTranslations } from '@/hooks/useTranslations'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export const LeftSidebarFilters = () => {
	const { translations } = useTranslations()
	const { appState, updateFilters } = useAppContext()

	const getActiveStyling = (category: Category) => (appState.mapFilters.includes(category) ? 'border-primary bg-primary/10' : '')

	const mainFilters = FILTERS.filter((item) => !['LOSS_OF_ORGANIC_MATTER', 'PH', 'BIODIVERSITY'].includes(item.category))

	const otherFilters = FILTERS.filter((item) => ['LOSS_OF_ORGANIC_MATTER', 'PH', 'BIODIVERSITY'].includes(item.category))

	return (
		<React.Fragment>
			<small className="font-bold opacity-50">{translations.filters}</small>
			<ul className="flex flex-col gap-2 flex-1 overflow-y-auto min-h-12">
				{mainFilters.map((item) => (
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
							<TooltipContent className="z-800">
								<p>{translations.categoryInformation[item.category]}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				))}
				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="other" className="border-none">
						<AccordionTrigger className="py-3 px-2 hover:no-underline">
							<small className="font-bold opacity-50 text-xs">{translations.other}</small>
						</AccordionTrigger>
						<AccordionContent>
							<ul className="flex flex-col gap-2 mt-2">
								{otherFilters.map((item) => (
									<TooltipProvider key={item.title}>
										<Tooltip>
											<TooltipTrigger asChild>
												<li
													className={cn(
														'rounded-lg border border-gray py-3 px-2 flex items-center gap-2 cursor-pointer transition',
														getActiveStyling(item.category)
													)}
													onClick={() => updateFilters(item.category)}>
													{item.icon} {translations.category[item.category]}
												</li>
											</TooltipTrigger>
											<TooltipContent className="z-800">
												<p>{translations.categoryInformation[item.category]}</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								))}
							</ul>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</ul>
		</React.Fragment>
	)
}

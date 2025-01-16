'use client'

import { createContext, useState, useContext } from 'react'
import { Category, Survey, Location } from 'geo-survey-map-shared-modules'
import { DEFAULT_COUNTRYCODE, DEFAULT_LOCATION } from '@/constants/constants'

export const initialFormStateValue: Survey = {
	category: '' as Category,
	description: '',
	solution: '',
	location: {
		x: DEFAULT_LOCATION.x,
		y: DEFAULT_LOCATION.y,
		name: '',
		countryCode: DEFAULT_COUNTRYCODE
	},
	affectedArea: 0,
	user: {},
	filePath: '',
	createdAt: '',
	status: 'PENDING'
}

interface Context {
	formState: Survey
	handlePickCategory: (category: Category) => void
	handlePickDescription: (description: string) => void
	handlePickSolution: (solution: string) => void
	handlePickLocation: (location: Location) => void
	handleAffectedArea: (affectedArea: number) => void
	handlePickName: (name: string) => void
	handleFilePath: (photoFilePath: string) => void
	resetToInitial: (location: Location) => void
}

export const MarkerFormContext = createContext<Context | null>(null)

export const MarkerFormContextProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
	const [formState, setFormState] = useState(initialFormStateValue)

	const handlePickCategory = (category: Category) => {
		setFormState((prev) => ({ ...prev, category }))
	}

	const handlePickDescription = (description: string) => {
		setFormState((prev) => ({ ...prev, description }))
	}

	const handlePickSolution = (solution: string) => {
		setFormState((prev) => ({ ...prev, solution }))
	}

	const handlePickLocation = (location: Location) => {
		setFormState((prev) => ({ ...prev, location: { ...prev.location, ...location } }))
	}

	const resetToInitial = (location: Location) => {
		setFormState({
			...initialFormStateValue,
			location: { x: location.x, y: location.y, name: initialFormStateValue.location.name, countryCode: location.countryCode }
		})
	}

	const handlePickName = (name: string) => {
		setFormState((prev) => ({
			...prev,
			location: {
				x: prev.location.x,
				y: prev.location.y,
				countryCode: prev.location.countryCode,
				name
			}
		}))
	}

	const handleAffectedArea = (affectedArea: number) => {
		setFormState((prev) => ({ ...prev, affectedArea }))
	}

	const handleFilePath = (photoFilePath: string) => {
		setFormState((prev) => ({ ...prev, filePath: photoFilePath }))
	}

	return (
		<MarkerFormContext.Provider
			value={{
				formState,
				handlePickCategory,
				handlePickDescription,
				handlePickSolution,
				handlePickLocation,
				handleAffectedArea,
				handlePickName,
				resetToInitial,
				handleFilePath
			}}>
			{children}
		</MarkerFormContext.Provider>
	)
}

export const useMarkerFormContext = () => {
	const markerFormContext = useContext(MarkerFormContext)
	if (!markerFormContext) {
		throw new Error('Wrap components using AppContextProvider')
	}
	return markerFormContext
}

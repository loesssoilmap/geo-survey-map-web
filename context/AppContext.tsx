'use client'

import { createContext, useState, useContext, useEffect } from 'react'
import { Category, Location, Survey, useGetAllSurveys } from 'geo-survey-map-shared-modules'

interface Props {
	children?: React.ReactNode
}

interface MarkerInfoModal {
	isShown: boolean
	survey: Survey | null
}

type Language = 'pl' | 'en'

interface AppState {
	userLocation: Location
	isLeftSideBarShown: boolean
	isRightSideBarShown: boolean
	mapFilters: Category[]
	markers: Survey[]
	markerInfoModal: MarkerInfoModal
	language: Language
}

interface Context {
	appState: AppState
	handleLeftSidebarToggle: () => void
	handleRightSidebarToggle: () => void
	updateFilters: (pickedFilter: Category) => void
	handleSetUserLocation: (location: Location) => void
	toggleHideFilters: () => void
	handleMarkerInfoModalShow: () => void
	handleMarkerInfoModalHide: () => void
	setMarkerInfoModalData: (survey: Survey) => void
	setLanguage: (language: Language) => void
}

const initialStateValue: AppState = {
	userLocation: {} as Location,
	isLeftSideBarShown: true,
	isRightSideBarShown: false,
	markers: [],
	mapFilters: [
		Category.DRY_SOILS,
		Category.WET_SOILS,
		Category.EROSION,
		Category.SEALED_SOILS,
		Category.DEGRADATION,
		Category.BIODIVERSITY,
		Category.LOSS_OF_ORGANIC_MATTER,
		Category.PH
	],
	markerInfoModal: {
		isShown: false,
		survey: null
	},
	language: 'en'
}

export const AppContext = createContext<Context | null>(null)

export const AppContextProvider: React.FC<Props> = ({ children }) => {
	const { data } = useGetAllSurveys()
	const [appState, setAppState] = useState(initialStateValue)

	const handleLeftSidebarToggle = () => {
		setAppState((prev) => ({ ...prev, isLeftSideBarShown: !prev.isLeftSideBarShown }))
	}

	const handleRightSidebarToggle = () => {
		setAppState((prev) => ({ ...prev, isRightSideBarShown: !prev.isRightSideBarShown }))
	}

	const updateFilters = (pickedFilter: Category) => {
		setAppState((prev) => ({
			...prev,
			mapFilters: prev.mapFilters.includes(pickedFilter)
				? prev.mapFilters.filter((filter) => filter !== pickedFilter)
				: [...prev.mapFilters, pickedFilter]
		}))
	}

	const toggleHideFilters = () => {
		setAppState((prev) => ({
			...prev,
			mapFilters: prev.mapFilters.length > 0 ? [] : initialStateValue.mapFilters
		}))
	}

	const handleSetUserLocation = (location: Location) => {
		setAppState((prev) => ({ ...prev, userLocation: location }))
	}

	const handleMarkerInfoModalShow = () => {
		setAppState((prev) => ({ ...prev, markerInfoModal: { ...prev.markerInfoModal, isShown: true } }))
	}

	const handleMarkerInfoModalHide = () => {
		setAppState((prev) => ({ ...prev, markerInfoModal: { ...prev.markerInfoModal, isShown: false } }))
	}

	const setMarkerInfoModalData = (survey: Survey) => {
		setAppState((prev) => ({ ...prev, markerInfoModal: { ...prev.markerInfoModal, survey } }))
	}

	const setLanguage = (language: Language) => {
		setAppState((prev) => ({ ...prev, language }))
	}

	useEffect(() => {
		if (data) {
			setAppState((prev) => ({ ...prev, markers: data }))
		}
	}, [data])

	return (
		<AppContext.Provider
			value={{
				appState,
				handleLeftSidebarToggle,
				handleRightSidebarToggle,
				updateFilters,
				handleSetUserLocation,
				toggleHideFilters,
				handleMarkerInfoModalShow,
				handleMarkerInfoModalHide,
				setMarkerInfoModalData,
				setLanguage
			}}>
			{children}
		</AppContext.Provider>
	)
}

export const useAppContext = () => {
	const appContext = useContext(AppContext)
	if (!appContext) {
		throw new Error('Wrap components using AppContextProvider')
	}
	return appContext
}

'use client'

import { createContext, useState, useContext, useEffect } from 'react'
import { Category, Location, Survey, useGetAllSurveys } from 'geo-survey-map-shared-modules'
import { DEFAULT_LOCATION } from '@/constants/constants'

interface Props {
	children?: React.ReactNode
}

interface MarkerInfoModal {
	isShown: boolean
	survey: Survey | null
}

interface CategoryInfoModal {
	isShown: boolean
	category: Category | null
	categoryInfo: string
	categoryImageUrl: string
}

type CategoryInfoModalData = Omit<CategoryInfoModal, 'isShown'>

type Language = 'pl' | 'en'

interface AppState {
	userLocation: Location
	isLeftSideBarShown: boolean
	isRightSideBarShown: boolean
	mapFilters: Category[]
	markers: Survey[]
	markerInfoModal: MarkerInfoModal
	language: Language
	shouldCenterOnUser: boolean
	categoryInfoModal: CategoryInfoModal
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
	handleCenterOnUser: (center: boolean) => void
	handleUpdateMarkersDisplay: (survey: Survey) => void
	handleCategoryInfoModalShow: () => void
	handleCategoryInfoModalHide: () => void
	setCategoryInfoModalData: ({ category, categoryInfo, categoryImageUrl }: CategoryInfoModalData) => void
}

const initialStateValue: AppState = {
	userLocation: DEFAULT_LOCATION,
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
	categoryInfoModal: {
		isShown: false,
		category: null,
		categoryInfo: '',
		categoryImageUrl: '/las.jpg'
	},
	language: 'en',
	shouldCenterOnUser: true
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

	const handleCenterOnUser = (center: boolean) => {
		setAppState((prev) => ({ ...prev, shouldCenterOnUser: center }))
	}

	const handleUpdateMarkersDisplay = (survey: Survey) => {
		setAppState((prev) => ({ ...prev, markers: [...prev.markers, survey] }))
	}

	const handleCategoryInfoModalShow = () => {
		setAppState((prev) => ({ ...prev, categoryInfoModal: { ...prev.categoryInfoModal, isShown: true } }))
	}

	const handleCategoryInfoModalHide = () => {
		setAppState((prev) => ({ ...prev, categoryInfoModal: { ...prev.categoryInfoModal, isShown: false } }))
	}

	const setCategoryInfoModalData = ({ category, categoryInfo, categoryImageUrl }: CategoryInfoModalData) => {
		setAppState((prev) => ({ ...prev, categoryInfoModal: { ...prev.categoryInfoModal, category, categoryInfo, categoryImageUrl } }))
	}

	useEffect(() => {
		if (data) {
			setAppState((prev) => ({ ...prev, markers: data.filter((survey) => survey.status === 'ACCEPTED') }))
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
				setLanguage,
				handleCenterOnUser,
				handleUpdateMarkersDisplay,
				handleCategoryInfoModalShow,
				handleCategoryInfoModalHide,
				setCategoryInfoModalData
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

import { Category, CountryCode, Location, Permissions, Survey } from 'geo-survey-map-shared-modules'

export type RolesClaim = {
	name: string
	value: {
		id: string
		name: string
		key: string
	}[]
} | null

export interface ChidlrenProps {
	children?: React.ReactNode
}

export interface MarkerInfoModal {
	isShown: boolean
	survey: Survey | null
}

export interface CategoryInfoModal {
	isShown: boolean
	category: Category | null
	categoryInfo: string
	categoryImageUrl: string
}

export type CategoryInfoModalData = Omit<CategoryInfoModal, 'isShown'>

export interface AppState {
	userLocation: Location
	isLeftSideBarShown: boolean
	isRightSideBarShown: boolean
	mapFilters: Category[]
	markers: Survey[]
	markerInfoModal: MarkerInfoModal
	language: CountryCode
	shouldCenterOnUser: boolean
	categoryInfoModal: CategoryInfoModal
}

export interface Context {
	appState: AppState
	handleLeftSidebarToggle: () => void
	handleRightSidebarToggle: () => void
	updateFilters: (pickedFilter: Category) => void
	handleSetUserLocation: (location: Location) => void
	toggleHideFilters: () => void
	handleMarkerInfoModalShow: () => void
	handleMarkerInfoModalHide: () => void
	setMarkerInfoModalData: (survey: Survey) => void
	setLanguage: (language: CountryCode) => void
	handleCenterOnUser: (center: boolean) => void
	handleCategoryInfoModalShow: () => void
	handleCategoryInfoModalHide: () => void
	setCategoryInfoModalData: ({ category, categoryInfo, categoryImageUrl }: CategoryInfoModalData) => void
}

export interface UserItemProps {
	userKindeId: string
	email: string
	permissions: string[]
	isBanned: boolean
	onPermissionsChange: (permissions: Permissions[]) => void
	onBanUser: () => void
}

export interface PointItemProps {
	survey: Survey
	onAccept?: () => void
	onReject?: () => void
}

export interface DeleteAccountModalProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
	translations: {
		title: string
		description: string
		cancel: string
		confirm: string
	}
}

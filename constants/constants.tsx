import { categoryToAssets } from '@/components/icons'
import { Category, CountryCode } from 'geo-survey-map-shared-modules'

export const LANGUAGES = ['en', 'de', 'el', 'ca', 'es', 'ga', 'hu', 'it', 'lt', 'nl', 'pl', 'sk', 'sr', 'sv', 'tr']

export const FILTERS = [
	{
		title: 'Gleba sucha',
		category: Category.DRY_SOILS,
		icon: categoryToAssets[Category.DRY_SOILS].icon
	},
	{
		title: 'Gleba mokra',
		category: Category.WET_SOILS,
		icon: categoryToAssets[Category.WET_SOILS].icon
	},
	{
		title: 'Erozja',
		category: Category.EROSION,
		icon: categoryToAssets[Category.EROSION].icon
	},
	{
		title: 'Gleba zasklepiona',
		category: Category.SEALED_SOILS,
		icon: categoryToAssets[Category.SEALED_SOILS].icon
	},
	{
		title: 'Degradacja gleby',
		category: Category.DEGRADATION,
		icon: categoryToAssets[Category.DEGRADATION].icon
	},
	{
		title: 'Utrata materii organicznej',
		category: Category.LOSS_OF_ORGANIC_MATTER,
		icon: categoryToAssets[Category.PH].icon
	},
	{
		title: 'PH',
		category: Category.PH,
		icon: categoryToAssets[Category.PH].icon
	},
	{
		title: 'Bioróżnorodność',
		category: Category.BIODIVERSITY,
		icon: categoryToAssets[Category.PH].icon
	}
]

export const DEFAULT_LOCATION = {
	x: 50.1109,
	y: 8.6821,
	name: '',
	countryCode: 'DE' as CountryCode
}
export const DEFAULT_ZOOM = 5
export const DEFAULT_MIN_ZOOM = 3
export const DEFAULT_LANGUAGE = 'EN' as CountryCode
export const DEFAULT_COUNTRYCODE = 'DE'
export const MAX_INPUT_LENGTH = 255
export const DEFAULT_REPORT_CREATED_AT = '2025-01-01T12:00:00Z'
export const WHOLE_GLOBE_RADIUS = 20037509
export const DEFAULT_URL_FALLBACK = 'http://localhost:8080/'
export const DEFAULT_STATUS = 'ACTIVE'

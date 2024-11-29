import { categoryToAssets } from '@/components/icons'
import { Category } from 'geo-survey-map-shared-modules'

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
	y: 10.7458
}

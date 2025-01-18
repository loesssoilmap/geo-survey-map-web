import { DEFAULT_LOCATION } from '@/constants/constants'
import { RolesClaim } from '@/types/types'
import { clsx, type ClassValue } from 'clsx'
import { CountryCode } from 'geo-survey-map-shared-modules'
import { twMerge } from 'tailwind-merge'
const minValue = Math.log(1)
const maxValue = Math.log(1000)
const scale = (maxValue - minValue) / 100

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const resolveImagePath = (relativePath: string) => {
	return process.env.NEXT_PUBLIC_IMAGES_URL + 'surveyimages/' + relativePath
}

export const logToLinear = (logValue: number) => {
	return Math.round(Math.exp(minValue + scale * logValue))
}

export const linearToLog = (linearValue: number) => {
	return Math.round((Math.log(linearValue) - minValue) / scale)
}

export const formatDateTime = (input: string): string => {
	const date = new Date(input)

	const hours = date.getHours().toString().padStart(2, '0')
	const minutes = date.getMinutes().toString().padStart(2, '0')
	const day = date.getDate().toString().padStart(2, '0')
	const month = (date.getMonth() + 1).toString().padStart(2, '0')
	const year = date.getFullYear()

	return `${hours}:${minutes}, ${day}.${month}.${year}`
}

export const isDefaultLocation = (x: number, y: number) => x === DEFAULT_LOCATION.x && y === DEFAULT_LOCATION.y

export const checkRole = (roles: RolesClaim, roleKey: string) => {
	if (!roles) return false
	return roles.value?.some((role) => role.key === roleKey)
}

export const getCountryCode = async (
	lat: number,
	lng: number
): Promise<{
	countryCode: CountryCode
	placeName: string
}> => {
	try {
		const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
		const data = await response.json()
		const countryCode = data.address.country_code ? data.address.country_code.toUpperCase() : DEFAULT_LOCATION.countryCode
		const splittedPlaceName = data.display_name.split(',')
		const placeName =
			splittedPlaceName[0] !== 'undefined' && splittedPlaceName[0] !== 'undefined' && splittedPlaceName[0] !== 'undefined'
				? `${splittedPlaceName[0]}, ${splittedPlaceName[1]}, ${splittedPlaceName[2]}`
				: DEFAULT_LOCATION.name

		return {
			countryCode,
			placeName
		}
	} catch (error) {
		return {
			countryCode: DEFAULT_LOCATION.countryCode,
			placeName: DEFAULT_LOCATION.name
		}
	}
}

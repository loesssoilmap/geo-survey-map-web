import { DEFAULT_LOCATION } from '@/constants/constants'
import { clsx, type ClassValue } from 'clsx'
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

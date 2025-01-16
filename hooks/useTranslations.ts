import { useAppContext } from '@/context/AppContext'
import { fallbacks } from 'geo-survey-map-shared-modules'

export const useTranslations = () => {
	const { appState } = useAppContext()
	// @ts-ignore
	const translations = fallbacks[appState.language.toLowerCase()].Default

	return { translations }
}

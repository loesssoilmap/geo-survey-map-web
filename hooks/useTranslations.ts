import { useAppContext } from '@/context/AppContext'
import { fallbacks } from 'geo-survey-map-shared-modules'

export const useTranslations = () => {
	const { appState } = useAppContext()
	const translations = fallbacks[appState.language].Default

	return { translations }
}

import React from 'react'
import { Category, updateApiClient, useCreateSurvey, fallbacks } from 'geo-survey-map-shared-modules'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useAppContext } from '@/context/AppContext'
import { FILTERS } from '@/constants/constants'
import { CircleHelp } from 'lucide-react'
import { useMarkerFormContext } from '@/context/AddMarkerFormContext'
import { Bounce, toast } from 'react-toastify'
import { useTranslations } from '@/hooks/useTranslations'

const MAX_INPUT_LENGTH = 255

interface RightSidebarFormProps {
	handleClose: () => void
}

export const RightSidebarForm: React.FC<RightSidebarFormProps> = ({ handleClose }) => {
	const { translations } = useTranslations()
	const { formState } = useMarkerFormContext()
	const { mutateAsync } = useCreateSurvey()
	const { accessTokenRaw } = useKindeBrowserClient()

	const handleAddMarker = async () => {
		updateApiClient.setAuthenticationHeader(accessTokenRaw as string)
		const response = await mutateAsync({
			category: formState.category,
			description: formState.description,
			locationRequest: formState.location,
			solution: formState.solution,
			affectedArea: formState.affectedArea
		})
		updateApiClient.removeAuthenticationHeader()
		if (response.status === 200) {
			toast.success(translations.addPointForm.successMessage)
		} else {
			toast.error(translations.addPointForm.errorMessage)
		}

		handleClose()
	}

	const checkForFilledFields = () => {
		const fields = [formState.category, formState.description, formState.solution, formState.location.name]
		const emptyFields = fields.filter((field) => field === '')

		return emptyFields.length > 0
	}
	const submitDisabled = checkForFilledFields()

	return (
		<React.Fragment>
			<Categories />
			{/* <AffectedArea /> */}
			<AreaName />
			<AreaDescription />
			<AreaSolution />
			<button
				className={`mt-auto bg-primary rounded-lg text-white mx-8 py-2 font-bold ${submitDisabled ? 'opacity-50' : 'hover:opacity-95'}`}
				disabled={submitDisabled}
				onClick={handleAddMarker}>
				{translations.addPoint}
			</button>
		</React.Fragment>
	)
}

const Categories = () => {
	const { formState, handlePickCategory } = useMarkerFormContext()
	const { translations } = useTranslations()
	const getActiveStyling = (category: Category) => (formState?.category === category ? 'border-primary bg-primary/10' : '')

	return (
		<React.Fragment>
			<small className="font-bold text-gray">{translations.categories}</small>
			<ul className="flex flex-col gap-2 flex-1 overflow-y-auto">
				{FILTERS.map((item) => (
					<li key={item.title} className="flex justify-between gap-2 min-h-12">
						<span
							className={`rounded-lg border border-gray py-2 px-2 flex items-center gap-2 cursor-pointer transition text-sm w-full ${getActiveStyling(
								item.category
							)}`}
							onClick={() => handlePickCategory(item.category)}>
							{item.icon} {translations.category[item.category]}
						</span>
						<span className="bg-white border border-gray rounded-lg flex justify-center items-center hover:bg-zinc-100 transition-all min-w-10 cursor-pointer">
							<CircleHelp size={20} />
						</span>
					</li>
				))}
			</ul>
		</React.Fragment>
	)
}

const AffectedArea = () => {
	const { formState, handleAffectedArea } = useMarkerFormContext()
	const { translations } = useTranslations()

	return (
		<React.Fragment>
			<small className="font-bold text-gray">{translations.addPointForm.affectedArea.title}</small>
			<input
				id="labels-range-input"
				type="range"
				className="w-full"
				value={formState.affectedArea}
				min={1}
				max={1000}
				onChange={(e) => handleAffectedArea(Number(e.target.value))}
			/>
			<div className="flex justify-between">
				<span className="text-xs">1 m</span>
				<span className="text-xs">1 km</span>
			</div>
		</React.Fragment>
	)
}

const AreaName = () => {
	const { formState, handlePickName } = useMarkerFormContext()
	const { translations } = useTranslations()

	return (
		<React.Fragment>
			<small className="font-bold text-gray">{translations.addPointForm.description.placeName.label}</small>
			<input
				className="w-full border border-gray min-h-10 rounded-lg p-2"
				type="text"
				value={formState?.location?.name}
				onChange={(e) => handlePickName(e.target.value)}
				maxLength={MAX_INPUT_LENGTH}
			/>
		</React.Fragment>
	)
}

const AreaDescription = () => {
	const { formState, handlePickDescription } = useMarkerFormContext()
	const { translations } = useTranslations()

	return (
		<React.Fragment>
			<small className="font-bold text-gray">{translations.addPointForm.description.problemDescription.label}</small>
			<textarea
				className="w-full border border-gray min-h-10 rounded-lg p-2 resize-none"
				value={formState.description}
				onChange={(e) => handlePickDescription(e.target.value)}
				maxLength={MAX_INPUT_LENGTH}
			/>
		</React.Fragment>
	)
}

const AreaSolution = () => {
	const { formState, handlePickSolution } = useMarkerFormContext()
	const { translations } = useTranslations()

	return (
		<React.Fragment>
			<small className="font-bold text-gray">{translations.addPointForm.solution.title}</small>
			<textarea
				className="w-full border border-gray min-h-10 rounded-lg p-2 resize-none"
				value={formState.solution}
				onChange={(e) => handlePickSolution(e.target.value)}
				maxLength={MAX_INPUT_LENGTH}
			/>
		</React.Fragment>
	)
}

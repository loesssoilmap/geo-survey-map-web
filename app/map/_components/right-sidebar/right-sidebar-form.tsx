import React, { ChangeEvent } from 'react'
import { Category, useCreateSurvey, useFileUpload } from 'geo-survey-map-shared-modules'
import { useAppContext } from '@/context/AppContext'
import { FILTERS, MAX_INPUT_LENGTH } from '@/constants/constants'
import { Camera, CircleHelp } from 'lucide-react'
import { useMarkerFormContext } from '@/context/AddMarkerFormContext'
import { toast } from 'react-toastify'
import { useTranslations } from '@/hooks/useTranslations'
import { Slider } from '@/components/ui/slider'
import { linearToLog, logToLinear } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface RightSidebarFormProps {
	handleClose: () => void
	fileName: string | null
	setFileName: (fileName: string | null) => void
	selectSolution: string
	setSelectSolution: (selectSolution: string) => void
}

export const RightSidebarForm: React.FC<RightSidebarFormProps> = ({ handleClose, fileName, setFileName, selectSolution, setSelectSolution }) => {
	const { translations } = useTranslations()
	const { formState } = useMarkerFormContext()
	const { mutateAsync: createSurvey } = useCreateSurvey()

	const handleAddMarker = async () => {
		const response = await createSurvey({
			category: formState.category,
			description: formState.description,
			locationRequest: {
				// @ts-expect-error
				name: formState.location.name,
				x: formState.location.x,
				y: formState.location.y,
				countryCode: formState.location.countryCode
			},
			solution: formState.solution,
			affectedArea: formState.affectedArea,
			filePath: formState.filePath
		})
		if (response.status === 200 && response.data.data) {
			toast.success(translations.addPointForm.successMessage)
		} else {
			toast.error(translations.addPointForm.errorMessage)
		}

		handleClose()
	}

	const checkForFilledFields = () => {
		const fields = [formState.category, formState.description, formState.location.name, formState.solution, formState.filePath]
		const emptyFields = fields.filter((field) => field === '')

		return emptyFields.length > 0
	}
	const submitDisabled = checkForFilledFields()

	return (
		<React.Fragment>
			<Categories />
			<AffectedArea />
			<AreaPhoto fileName={fileName} setFileName={setFileName} />
			<AreaName />
			<AreaDescription />
			<AreaSolution selectSolution={selectSolution} setSelectSolution={setSelectSolution} />
			<button
				className={`mt-auto bg-primary hover:bg-primary/90 rounded-lg text-white mx-8 py-2 font-bold ${
					submitDisabled ? 'opacity-50' : 'hover:opacity-95'
				}`}
				disabled={submitDisabled}
				onClick={handleAddMarker}>
				{translations.addPoint}
			</button>
		</React.Fragment>
	)
}

const Categories = () => {
	const { handleCategoryInfoModalShow, setCategoryInfoModalData } = useAppContext()
	const { formState, handlePickCategory } = useMarkerFormContext()
	const { translations } = useTranslations()
	const getActiveStyling = (category: Category) => (formState?.category === category ? 'border-primary bg-primary/10' : '')
	const handleCategoryInfoModal = (category: Category) => {
		handleCategoryInfoModalShow()
		setCategoryInfoModalData({
			category,
			categoryInfo: translations.categoryInformation[category],
			categoryImageUrl: '/las.jpg'
		})
	}

	return (
		<div className="overflow-y-auto min-h-20">
			<small className="font-bold opacity-50">{translations.categories}</small>
			<ul className="flex flex-col gap-2 flex-1">
				{FILTERS.map((item) => (
					<li key={item.title} className="flex justify-between gap-2 min-h-12">
						<span
							className={`rounded-lg border border-gray py-2 px-2 flex items-center gap-2 cursor-pointer transition text-sm w-full ${getActiveStyling(
								item.category
							)}`}
							onClick={() => handlePickCategory(item.category)}>
							{item.icon} {translations.category[item.category]}
						</span>
						<span
							className="bg-white border border-gray rounded-lg flex justify-center items-center hover:bg-zinc-100 transition-all min-w-10 cursor-pointer"
							onClick={() => handleCategoryInfoModal(item.category)}>
							<CircleHelp size={20} />
						</span>
					</li>
				))}
			</ul>
		</div>
	)
}

const AffectedArea = () => {
	const { formState, handleAffectedArea } = useMarkerFormContext()
	const { translations } = useTranslations()

	const handleSliderChange = (value: number[]) => {
		handleAffectedArea(logToLinear(value[0]))
	}

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<small className="font-bold opacity-50">{translations.addPointForm.affectedArea.title}</small>
				<span className="text-sm font-medium">
					{formState.affectedArea} {formState.affectedArea === 1 ? 'm' : 'm'}
				</span>
			</div>
			<Slider
				id="affected-area-slider"
				min={0}
				max={100}
				step={1}
				value={[linearToLog(formState.affectedArea)]}
				onValueChange={handleSliderChange}
				className="w-full"
			/>
			<div className="flex justify-between text-xs font-bold opacity-50">
				<span>1 m</span>
				<span>1000 m</span>
			</div>
		</div>
	)
}

interface AreaPhoto {
	fileName: string | null
	setFileName: (fileName: string | null) => void
}

const AreaPhoto: React.FC<AreaPhoto> = ({ fileName, setFileName }) => {
	const { translations } = useTranslations()
	const { handleFilePath } = useMarkerFormContext()
	const { mutateAsync: uploadFileAsync } = useFileUpload()

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const photoAsset = event.target.files?.[0] || null

		if (photoAsset) {
			let filePath = undefined

			if (photoAsset) {
				const formData = new FormData()
				formData.append('file', photoAsset, photoAsset.name)
				try {
					const {
						data: { data }
					} = await uploadFileAsync(formData)
					filePath = data

					setFileName(photoAsset.name)
					handleFilePath(filePath)
				} catch (error: any) {
					if (error.response.status === 413) {
						toast('File size is too large', { type: 'error' })
					} else {
						toast('Error uploading file', { type: 'error' })
					}
				}
			}
		} else {
			setFileName(null)
		}
	}

	return (
		<div>
			<small className="font-bold opacity-50">{translations.addPointForm.addPhoto.title}</small>
			<div className="relative">
				<input type="file" id="area-photo" accept=".png,.jpg,.jpeg" onChange={handleFileChange} className="sr-only" />
				<label
					htmlFor="area-photo"
					className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 cursor-pointer">
					<Camera className={`w-5 h-5 mr-2 -ml-1 ${fileName ? 'text-black' : 'opacity-50'}`} aria-hidden="true" />
					<span>{fileName}</span>
				</label>
			</div>
		</div>
	)
}

const AreaName = () => {
	const { formState, handlePickName } = useMarkerFormContext()
	const { translations } = useTranslations()

	return (
		<div>
			<Label htmlFor="area-name" className="text-sm font-bold opacity-50">
				{translations.addPointForm.description.placeName.label}
			</Label>
			<Input id="area-name" value={formState?.location?.name} onChange={(e) => handlePickName(e.target.value)} maxLength={MAX_INPUT_LENGTH} />
		</div>
	)
}

const AreaDescription = () => {
	const { formState, handlePickDescription } = useMarkerFormContext()
	const { translations } = useTranslations()

	return (
		<div>
			<Label htmlFor="area-description" className="text-sm font-bold opacity-50">
				{translations.addPointForm.description.problemDescription.label}
			</Label>
			<Textarea
				id="area-description"
				className="resize-none"
				value={formState.description}
				onChange={(e) => handlePickDescription(e.target.value)}
				maxLength={MAX_INPUT_LENGTH}
			/>
		</div>
	)
}

interface AreaSolutionProps {
	selectSolution: string
	setSelectSolution: (selectSolution: string) => void
}

const AreaSolution: React.FC<AreaSolutionProps> = ({ selectSolution, setSelectSolution }) => {
	const { formState, handlePickSolution } = useMarkerFormContext()
	const { translations } = useTranslations()

	const handleSelectChange = (value: string) => {
		setSelectSolution(value)
		if (value !== 'OTHER') {
			handlePickSolution(value)
		} else {
			handlePickSolution('')
		}
	}

	const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		handlePickSolution(e.target.value)
	}

	return (
		<div>
			<Label htmlFor="solution-select" className="text-sm font-bold opacity-50">
				{translations.addPointForm.solution.title}
			</Label>
			<Select onValueChange={handleSelectChange} value={selectSolution}>
				<SelectTrigger id="solution-select" className="w-full">
					<SelectValue placeholder="" />
				</SelectTrigger>
				<SelectContent className="z-800">
					<SelectItem value="NATURE">Caused by nature</SelectItem>
					<SelectItem value="HUMAN">Caused by human</SelectItem>
					<SelectItem value="OTHER">Other</SelectItem>
				</SelectContent>
			</Select>
			{selectSolution === 'OTHER' && (
				<Textarea
					value={formState.solution}
					onChange={handleTextareaChange}
					placeholder="Describe the solution"
					className="resize-none mt-4"
					maxLength={MAX_INPUT_LENGTH}
				/>
			)}
		</div>
	)
}

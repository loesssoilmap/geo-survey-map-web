'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { TabsContent } from '@/components/ui/tabs'
import { useTranslations } from '@/hooks/useTranslations'
import { PointItem } from './point-item'
import { Category, useGetAllSurveys, useUpdateSurveyStatus, useDownloadSurveysReport } from 'geo-survey-map-shared-modules'
import { NoDataFallback } from '@/components/no-data-fallback'
import { toast } from 'react-toastify'
import { DatePickerWithRange } from '@/components/date-picker-with-range'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { addDays } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { DEFAULT_LOCATION, DEFAULT_REPORT_CREATED_AT, WHOLE_GLOBE_RADIUS } from '@/constants/constants'

export const PointsTab = () => {
	const { translations } = useTranslations()
	const { data: surveys, refetch } = useGetAllSurveys()
	const { mutateAsync: updateSurveyStatus } = useUpdateSurveyStatus()
	const [searchTerm, setSearchTerm] = useState('')
	const [dateRange, setDateRange] = useState<DateRange>({ from: addDays(new Date(), -30), to: new Date() })
	const [selectedCategory, setSelectedCategory] = useState<Category | 'ALL'>('ALL')
	const { mutate: downloadReport } = useDownloadSurveysReport()

	const filteredSurveys = useMemo(() => {
		if (!surveys) return []
		return surveys
			.filter((survey) => {
				const matchesSearch = survey.id?.toString().toLowerCase().includes(searchTerm.toLowerCase())
				const matchesCategory = selectedCategory === 'ALL' || survey.category === selectedCategory
				const surveyDate = new Date(survey.createdAt)
				const matchesDateRange = (!dateRange.from || surveyDate >= dateRange.from) && (!dateRange.to || surveyDate <= dateRange.to)
				return matchesSearch && matchesCategory && matchesDateRange
			})
			.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
	}, [surveys, searchTerm, selectedCategory, dateRange])

	const pendingSurveys = useMemo(() => filteredSurveys.filter((survey) => survey.status === 'PENDING'), [filteredSurveys])
	const verifiedSurveys = useMemo(
		() => filteredSurveys.filter((survey) => survey.status === 'ACCEPTED' || survey.status === 'REJECTED'),
		[filteredSurveys]
	)

	const updatePointStatus = async (action: 'ACCEPTED' | 'REJECTED', surveyId: number | undefined) => {
		if (surveyId != undefined) {
			try {
				await updateSurveyStatus({
					status: action,
					surveyId: surveyId
				})
				toast.success('Survey status has been updated')
				refetch()
			} catch (error) {
				toast.error('Oops, something went wrong! Please try again later.')
			}
		}
	}

	const handleDownloadReport = () => {
		downloadReport(
			{
				page: 0,
				size: 20,
				sort: 'createdAt',
				affectedAreaMin: 0,
				affectedAreaMax: 1000,
				createdAtStart: DEFAULT_REPORT_CREATED_AT,
				createdAtEnd: new Date().toISOString(),
				centralX: DEFAULT_LOCATION.x,
				centralY: DEFAULT_LOCATION.y,
				radiusInMeters: WHOLE_GLOBE_RADIUS
			},
			{
				onSuccess: (data: any) => {
					const url = window.URL.createObjectURL(new Blob([data.data]))
					const link = document.createElement('a')
					link.href = url
					link.setAttribute('download', 'loess-surveys-report.xlsx')
					document.body.appendChild(link)
					link.click()
					link.remove()
				},
				onError: () => {
					toast.error('Failed to download the report.')
				}
			}
		)
	}

	return (
		<TabsContent value="points">
			<Card className="border rounded-lg">
				<CardContent className="pt-6">
					<div className="space-y-4">
						<div className="space-y-4">
							<h3 className="text-lg font-semibold">{translations.pointManagement.pointsToApprove}</h3>
							<div className="space-y-2 max-h-[300px] overflow-y-auto pb-8">
								{pendingSurveys.length > 0 ? (
									pendingSurveys?.map((survey) => (
										<PointItem
											key={survey.id}
											survey={survey}
											onAccept={() => updatePointStatus('ACCEPTED', survey.id)}
											onReject={() => updatePointStatus('REJECTED', survey.id)}
										/>
									))
								) : (
									<NoDataFallback text={'No points to approve'} />
								)}
							</div>
						</div>
						<div className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div className="space-y-2">
									<label className="text-sm text-gray-600">{translations.pointManagement.pointId}</label>
									<Input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
								</div>
								<div className="space-y-2">
									<label className="text-sm text-gray-600">Date Range</label>
									<DatePickerWithRange date={dateRange} setDate={setDateRange} />
								</div>
								<div className="space-y-2">
									<label className="text-sm text-gray-600">Category</label>
									<Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as Category | 'ALL')}>
										<SelectTrigger>
											<SelectValue placeholder="Select category" />
										</SelectTrigger>
										<SelectContent>
											{Object.values(Category).map((category) => (
												<SelectItem key={category} value={category}>
													{category.replace(/_/g, ' ')}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className="flex justify-between items-center">
								<h3 className="text-lg font-semibold">{translations.pointManagement.approvedPoints}</h3>
								<Button onClick={handleDownloadReport}>Get data report</Button>
							</div>
							<div className="space-y-2 max-h-[300px] overflow-y-auto">
								{verifiedSurveys.length > 0 ? (
									verifiedSurveys.map((survey) => (
										<PointItem
											key={survey.id}
											survey={survey}
											onAccept={() => updatePointStatus('ACCEPTED', survey.id)}
											onReject={() => updatePointStatus('REJECTED', survey.id)}
										/>
									))
								) : (
									<NoDataFallback text={'No points found'} />
								)}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</TabsContent>
	)
}

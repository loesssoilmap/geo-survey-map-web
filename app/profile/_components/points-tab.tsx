'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { TabsContent } from '@/components/ui/tabs'
import { useTranslations } from '@/hooks/useTranslations'
import { PointItem } from './point-item'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useGetAllSurveys, Survey, useUpdateSurveyStatus } from 'geo-survey-map-shared-modules'
import { NoDataFallback } from '@/components/no-data-fallback'
import { toast } from 'react-toastify'

export const PointsTab = () => {
	const { translations } = useTranslations()
	const { data: surveys } = useGetAllSurveys()
	const { mutateAsync: updateSurveyStatus } = useUpdateSurveyStatus()
	const [searchTerm, setSearchTerm] = useState('')
	const [dialogOpen, setDialogOpen] = useState(false)
	const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null)
	const [action, setAction] = useState<'accept' | 'reject' | null>(null)

	const filteredSurveys = useMemo(() => {
		if (!surveys) return []
		return surveys.filter((survey) => survey.id?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
	}, [surveys, searchTerm])

	const pendingSurveys = useMemo(() => filteredSurveys.filter((survey) => survey.status === 'PENDING'), [filteredSurveys])
	const acceptedSurveys = useMemo(
		() => filteredSurveys.filter((survey) => survey.status === 'ACCEPTED' || survey.status === 'REJECTED'),
		[filteredSurveys]
	)

	const handleAction = (survey: Survey, action: 'accept' | 'reject') => {
		setSelectedSurvey(survey)
		setAction(action)
		setDialogOpen(true)
	}

	const confirmAction = async () => {
		if (selectedSurvey && action) {
			updateSurveyStatus({
				status: action === 'accept' ? 'ACCEPTED' : 'REJECTED',
				surveyId: selectedSurvey.id!
			})

			const response = await updateSurveyStatus({
				status: action === 'accept' ? 'ACCEPTED' : 'REJECTED',
				surveyId: selectedSurvey.id!
			})
			if (response.status === 200 && response.data.data) {
				toast.success('Survey status has been updated')
			} else {
				toast.error('Oops, something went wrong! Please try again later.')
			}
			setDialogOpen(false)
		}
	}

	return (
		<TabsContent value="points">
			<Card className="border rounded-lg">
				<CardContent className="pt-6">
					<div className="space-y-4">
						<div className="space-y-4">
							<h3 className="text-lg font-semibold">{translations.pointManagement.pointsToApprove}</h3>
							<div className="space-y-2 max-h-[300px] overflow-y-auto">
								{pendingSurveys.map((survey) => (
									<PointItem
										key={survey.id}
										survey={survey}
										onAccept={() => handleAction(survey, 'accept')}
										onReject={() => handleAction(survey, 'reject')}
									/>
								))}
							</div>
						</div>
						<div className="space-y-4">
							<div className="space-y-2">
								<label className="text-sm text-gray-600">{translations.pointManagement.pointId}</label>
								<Input type="text" placeholder="ID" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
							</div>
							<h3 className="text-lg font-semibold">{translations.pointManagement.approvedPoints}</h3>
							<div className="space-y-2 max-h-[300px] overflow-y-auto">
								{acceptedSurveys.length > 0 ? (
									acceptedSurveys.map((survey) => <PointItem key={survey.id} survey={survey} />)
								) : (
									<NoDataFallback text={'No points found'} />
								)}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							{action === 'accept' ? 'Are you sure you want to accept this point?' : 'Are you sure you want to reject this point?'}
						</DialogTitle>
						<DialogDescription>
							{action === 'accept' ? 'Are you sure you want to accept this point?' : 'Are you sure you want to reject this point?'}
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button variant="outline" onClick={() => setDialogOpen(false)}>
							Cancel
						</Button>
						<Button onClick={confirmAction}>Confirm</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</TabsContent>
	)
}

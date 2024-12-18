import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Category, Survey } from 'geo-survey-map-shared-modules'
import { categoryToAssets } from '@/components/icons'
import { formatDateTime } from '@/lib/utils'
import { Check, X } from 'lucide-react'

interface PointItemProps {
	survey: Survey
	onAccept?: () => void
	onReject?: () => void
}

export const PointItem: React.FC<PointItemProps> = ({ survey, onAccept, onReject }) => {
	return (
		<div className="p-4 border rounded bg-white shadow-md flex justify-between">
			<div className="flex items-center space-x-4">
				<div className="flex items-center justify-center rounded-full">
					<Image
						src={categoryToAssets[survey.category as Category].iconUrl || '/placeholder.svg'}
						alt={survey.category}
						width={45}
						height={45}
					/>
				</div>
				<div>
					<div className="font-medium">{survey.description}</div>
					<div className="text-sm text-gray-600">{formatDateTime(survey.createdAt)}</div>
					<div className="text-xs text-gray-400">ID: {survey.id}</div>
				</div>
			</div>
			<div className="flex gap-2 items-center">
				<div
					className={`text-sm font-medium ${
						survey.status === 'ACCEPTED' ? 'text-green-500' : survey.status === 'PENDING' ? 'text-yellow-500' : 'text-red-500'
					}`}>
					{survey.status}
				</div>
				{survey.status === 'PENDING' && (
					<>
						<Button onClick={onAccept} variant="default" size="sm">
							<Check />
						</Button>
						<Button onClick={onReject} variant="destructive" size="sm">
							<X />
						</Button>
					</>
				)}
			</div>
		</div>
	)
}

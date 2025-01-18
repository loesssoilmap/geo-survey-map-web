import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Category } from 'geo-survey-map-shared-modules'
import { categoryToAssets } from '@/components/icons'
import { formatDateTime } from '@/lib/utils'
import { Check, X } from 'lucide-react'
import { PointItemProps } from '@/types/types'
import { useTranslations } from '@/hooks/useTranslations'

export const PointItem: React.FC<PointItemProps> = ({ survey, onAccept, onReject, setIsOpen, showActionButtons = false }) => {
	const { translations } = useTranslations()

	return (
		<div className="p-4 border rounded-lg bg-white shadow-md flex flex-col sm:flex-row justify-between" onClick={setIsOpen}>
			<div className="flex items-center space-x-4">
				<Image
					src={categoryToAssets[survey.category as Category].iconUrl}
					alt={survey.category}
					width={45}
					height={45}
					className="w-[45px] h-[45px]"
				/>
				<div>
					<div className="font-medium">{survey.location.name}</div>
					<div className="text-sm text-gray-600">{formatDateTime(survey.createdAt)}</div>
					<div className="text-xs text-gray-400">ID: {survey.id}</div>
				</div>
			</div>
			<div className="flex gap-2 items-center justify-end">
				<div
					className={`text-sm font-medium ${
						survey.status === 'ACCEPTED' ? 'text-green-500' : survey.status === 'PENDING' ? 'text-yellow-500' : 'text-red-500'
					}`}>
					{translations.pointStatus[survey.status]}
				</div>
				{showActionButtons && (
					<>
						{survey.status !== 'ACCEPTED' && onAccept ? (
							<Button
								onClick={(e) => {
									e.stopPropagation()
									onAccept()
								}}
								variant="default"
								size="sm">
								<Check />
							</Button>
						) : null}
						{survey.status !== 'REJECTED' && onReject ? (
							<Button
								onClick={(e) => {
									e.stopPropagation()
									onReject()
								}}
								variant="destructive"
								size="sm">
								<X />
							</Button>
						) : null}
					</>
				)}
			</div>
		</div>
	)
}

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useTranslations } from '@/hooks/useTranslations'
import { PointDetailsModalProps } from '@/types/types'
import Image from 'next/image'
import { categoryToAssets } from '@/components/icons'
import { resolveImagePath } from '@/lib/utils'

export function PointDetailsModal({ isOpen, onClose, point }: PointDetailsModalProps) {
	const { translations } = useTranslations()

	return (
		<Dialog open={isOpen} onOpenChange={onClose} key={point.id!}>
			<DialogContent aria-describedby="Permissions management" className="sm:max-w-96 p-0">
				<DialogHeader
					className={`${
						categoryToAssets[point.category as string]?.gradient
					} rounded-ss-lg rounded-se-lg p-4 text-white flex justify-between`}>
					<DialogTitle>{translations.pointDetails.title}</DialogTitle>
				</DialogHeader>
				<div className="w-full p-4 pt-0 overflow-y-auto overflow-x-hidden">
					<div className="w-full mb-4">
						<div>
							<small className="text-xs font-bold opacity-50">{translations.pointDetails.placeName}</small>
							<p className="text-sm font-medium break-words">{point.location.name!}</p>
						</div>
						<div>
							<small className="text-xs font-bold opacity-50">{translations.pointDetails.affectedArea}</small>
							<p className="text-sm font-medium break-words">{point.affectedArea} m</p>
						</div>
						<div>
							<small className="text-xs font-bold opacity-50">{translations.pointDetails.problemDescription}</small>
							<p className="text-sm font-medium break-words">{point.description}</p>
						</div>
						<div>
							<small className="text-xs font-bold opacity-50">{translations.pointDetails.problemSolution}</small>
							<p className="text-sm font-medium break-words">{point.solution}</p>
						</div>
					</div>
					{point?.filePath ? (
						<Image
							src={resolveImagePath(point?.filePath!)}
							alt="problem"
							width={200}
							height={200}
							className="w-full object-cover rounded-lg"
						/>
					) : null}
				</div>
			</DialogContent>
		</Dialog>
	)
}

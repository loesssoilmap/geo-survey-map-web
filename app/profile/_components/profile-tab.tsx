import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { TabsContent } from '@/components/ui/tabs'
import { useTranslations } from '@/hooks/useTranslations'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { User } from 'lucide-react'
import { Survey, useDeleteUserSelf, useGetUsersSurveys } from 'geo-survey-map-shared-modules'
import { Loader } from '@/components/loader'
import { NoDataFallback } from '@/components/no-data-fallback'
import { toast } from 'react-toastify'
import { DeleteAccountModal } from './delete-account-modal'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { PointDetailsModal } from './point-details-modal'
import { PointItem } from './point-item'

export const ProfileTab = () => {
	const { translations } = useTranslations()
	const { user, isLoading } = useKindeBrowserClient()
	const { data, isFetching } = useGetUsersSurveys()
	const { mutateAsync: deleteAccount } = useDeleteUserSelf()
	const router = useRouter()
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const [selectedPoint, setSelectedPoint] = useState<Survey | null>(null)

	const handleDeleteAccount = async () => {
		setIsDeleteModalOpen(true)
	}

	const confirmDeleteAccount = async () => {
		try {
			await deleteAccount()
			toast.success(translations.userProfile.accountDeleted)
			router.push('/api/auth/logout')
		} catch (error) {
			toast.error(translations.userProfile.deleteError)
		} finally {
			setIsDeleteModalOpen(false)
		}
	}

	return (
		<TabsContent value="profile" className="space-y-6">
			<Card>
				<CardContent className="pt-6">
					<div className="flex flex-col items-center space-y-4">
						<Avatar className="h-20 w-20 bg-primary">
							<AvatarFallback>
								<User />
							</AvatarFallback>
						</Avatar>
						<div className="text-center">
							{isLoading || isFetching ? (
								<Loader />
							) : (
								<>
									<div className="text-gray-600">{user?.email}</div>
									<div className="text-xl font-semibold">
										{translations.userProfile.pts} {data?.length || 0}
									</div>
								</>
							)}
						</div>
					</div>

					<div className="mt-8 space-y-6">
						<div className="space-y-4">
							<h3 className="text-lg font-medium">{translations.userProfile.manageAccount}</h3>
							<Button variant="destructive" className="w-full" onClick={handleDeleteAccount}>
								{translations.userProfile.removeAccount}
							</Button>
						</div>
						<div className="space-y-4">
							<h3 className="text-lg font-medium">{translations.pointsList.title}</h3>
							<div className="space-y-3 max-h-52 overflow-y-auto">
								{isFetching ? (
									<Loader />
								) : data?.length ? (
									data.map((point) => (
										<PointItem
											key={point.id}
											survey={point}
											setIsOpen={() => {
												setIsOpen(true)
												setSelectedPoint(point)
											}}
										/>
									))
								) : (
									<NoDataFallback text={translations.pointsList.noPoints} />
								)}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
			<DeleteAccountModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDeleteAccount} />
			{selectedPoint ? (
				<PointDetailsModal
					isOpen={isOpen}
					onClose={() => {
						setIsOpen(false)
						setSelectedPoint(null)
					}}
					point={selectedPoint}
				/>
			) : null}
		</TabsContent>
	)
}

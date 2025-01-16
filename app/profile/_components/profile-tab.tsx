import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { TabsContent } from '@/components/ui/tabs'
import { useTranslations } from '@/hooks/useTranslations'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { User } from 'lucide-react'
import { useDeleteUserSelf, useGetUsersSurveys } from 'geo-survey-map-shared-modules'
import { formatDateTime, resolveImagePath } from '@/lib/utils'
import { categoryToAssets } from '@/components/icons'
import Image from 'next/image'
import { Loader } from '@/components/loader'
import { NoDataFallback } from '@/components/no-data-fallback'
import { toast } from 'react-toastify'
import { DeleteAccountModal } from './delete-account-modal'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const ProfileTab = () => {
	const { translations } = useTranslations()
	const { user, isLoading } = useKindeBrowserClient()
	const { data, isFetching } = useGetUsersSurveys()
	const { mutateAsync: deleteAccount } = useDeleteUserSelf()
	const router = useRouter()
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

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
											key={point.id!}
											name={point.location.name!}
											category={point.category}
											createdAt={point.createdAt}
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
			<DeleteAccountModal
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				onConfirm={confirmDeleteAccount}
				translations={{
					title: translations.userProfile.deleteModalTitle,
					description: translations.userProfile.deleteModalDescription,
					cancel: translations.userProfile.deleteModalCancel,
					confirm: translations.userProfile.deleteModalConfirm
				}}
			/>
		</TabsContent>
	)
}

const PointItem: React.FC<{ category: string; createdAt: string; name: string }> = ({ category, createdAt, name }) => {
	return (
		<div className="flex items-center justify-between gap-4 rounded-lg border bg-white">
			<div className="flex gap-4 p-4 items-center">
				<Image
					src={categoryToAssets[category].iconUrl}
					alt={'Icon of category'}
					width={45}
					height={45}
					className="rounded-full h-[45px] w-[45px]"
				/>
				<div>
					<div className="font-medium">{name}</div>
					<div className="text-sm text-gray-600">{formatDateTime(createdAt)}</div>
				</div>
			</div>
		</div>
	)
}

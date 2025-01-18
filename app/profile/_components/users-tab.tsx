'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { TabsContent } from '@/components/ui/tabs'
import { useTranslations } from '@/hooks/useTranslations'
import {
	Permissions,
	useBanOrReactivateUser,
	useGetAllUsers,
	useGetSelfUserData,
	UserStatus,
	useSetUserPermissions
} from 'geo-survey-map-shared-modules'
import { NoDataFallback } from '@/components/no-data-fallback'
import { UserItem } from './user-item'
import { toast } from 'react-toastify'
import { Loader } from '@/components/loader'

export const UsersTab = () => {
	const { translations } = useTranslations()
	const { data: users, isLoading, refetch } = useGetAllUsers()
	const { mutateAsync: banOrReactivate } = useBanOrReactivateUser()
	const { mutateAsync: setPermissionsDB } = useSetUserPermissions()
	const [searchTerm, setSearchTerm] = useState('')
	const { refetch: refetchSelfPermissions } = useGetSelfUserData()

	const handlePermissionsChange = async (userId: string, newPermissions: Permissions[]) => {
		try {
			await setPermissionsDB({
				kindeId: userId,
				permissions: newPermissions
			})
			refetchSelfPermissions()
			refetch()
			toast.success(translations.userPermissionsUpdated)
		} catch (error) {
			toast.error(translations.oopsSomethingWentWrong)
		}
	}
	const handleBanUser = async (userId: string, status: UserStatus) => {
		try {
			await banOrReactivate({
				kindeId: userId,
				status
			})
			toast.success(translations.userStatusUpdated)
			refetch()
		} catch (error) {
			toast.error(translations.oopsSomethingWentWrong)
		}
	}

	const filteredUsers = users?.filter((user) => user.email.toLowerCase().includes(searchTerm.toLowerCase()))

	return (
		<TabsContent value="users">
			<Card className="border rounded-lg">
				<CardContent className="pt-6">
					<div className="space-y-4">
						<div className="space-y-2">
							<label className="text-sm text-gray-600">{translations.userManagement.searchUser}</label>
							<Input type="email" placeholder="email@example.com" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
						</div>
						<div className="space-y-2 max-h-80 overflow-y-auto">
							<div>
								<p className="text-gray text-end w-full text-sm">
									{translations.usersCount} {filteredUsers?.length || 0}
								</p>
							</div>
							{isLoading ? (
								<Loader />
							) : filteredUsers?.length ? (
								filteredUsers.map((user) => (
									<UserItem
										key={user.kindeId}
										userKindeId={user.kindeId}
										email={user.email}
										permissions={user.permissions || []}
										isBanned={user.status === 'BANNED'}
										onPermissionsChange={(newPermissions) => handlePermissionsChange(user.kindeId, newPermissions)}
										onBanUser={() => handleBanUser(user.kindeId, user.status === 'ACTIVE' ? 'BANNED' : 'ACTIVE')}
									/>
								))
							) : (
								<NoDataFallback text={translations.userManagement.noUsers} />
							)}
						</div>
					</div>
				</CardContent>
			</Card>
		</TabsContent>
	)
}

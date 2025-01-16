'use client'

import { Logo } from '@/components/logo'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslations } from '@/hooks/useTranslations'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ProfileTab } from './profile-tab'
import { UsersTab } from './users-tab'
import { PointsTab } from './points-tab'
import { cn } from '@/lib/utils'
import { useGetRole } from '@/hooks/useGetRole'

export const ProfileContent = () => {
	const { translations } = useTranslations()
	const { isBasicUser } = useGetRole()
	const gridCols = isBasicUser ? 'grid-cols-1' : 'grid-cols-3'

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="mx-auto max-w-screen-md px-4">
				<header className="py-6">
					<div className="flex items-center">
						<Link href="/map" className="rounded-lg p-2 hover:bg-gray-100">
							<ArrowLeft className="h-6 w-6" />
						</Link>
						<div className="mx-auto">
							<Logo />
						</div>
						<div className="w-10" />
					</div>
				</header>
				<Tabs defaultValue="profile" className="space-y-6">
					<TabsList className={cn('grid w-full h-full', gridCols)}>
						<TabsTrigger value="profile" className="text-wrap h-full">
							{translations.userProfile.title}
						</TabsTrigger>
						{!isBasicUser ? (
							<>
								<TabsTrigger value="users" className="text-wrap h-full">
									{translations.userManagement.title}
								</TabsTrigger>
								<TabsTrigger value="points" className="text-wrap h-full">
									{translations.pointManagement.title}
								</TabsTrigger>
							</>
						) : null}
					</TabsList>
					<ProfileTab />
					{!isBasicUser ? (
						<>
							<UsersTab />
							<PointsTab />
						</>
					) : null}
				</Tabs>
			</div>
		</div>
	)
}

'use client'

import { Logo } from '@/components/logo'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslations } from '@/hooks/useTranslations'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useGetUsersSurveys } from 'geo-survey-map-shared-modules'
import { ProfileTab } from './_components/profile-tab'
import { UsersTab } from './_components/users-tab'
import { PointsTab } from './_components/points-tab'

export default function Component() {
	const { translations } = useTranslations()
	const { user } = useKindeBrowserClient()

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
					<TabsList className="grid w-full grid-cols-3 h-full">
						<TabsTrigger value="profile" className="text-wrap h-full">
							{translations.userProfile.title}
						</TabsTrigger>

						<TabsTrigger value="users" className="text-wrap h-full">
							{translations.userManagement.title}
						</TabsTrigger>
						<TabsTrigger value="points" className="text-wrap h-full">
							{translations.pointManagement.title}
						</TabsTrigger>
					</TabsList>
					<ProfileTab />
					<UsersTab />
					<PointsTab />
				</Tabs>
			</div>
		</div>
	)
}

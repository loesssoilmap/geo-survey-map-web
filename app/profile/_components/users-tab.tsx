'use client'

import { Logo } from '@/components/logo'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslations } from '@/hooks/useTranslations'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { ArrowLeft, Loader2, MapPin, Trash2, User } from 'lucide-react'
// import Image from 'next/image'
import Link from 'next/link'
// import { UserMarkersList } from './_components/user-markers-list'
import { useGetUsersSurveys } from 'geo-survey-map-shared-modules'
import { formatDateTime } from '@/lib/utils'
import { categoryToAssets } from '@/components/icons'
import Image from 'next/image'

export const UsersTab = () => {
	return (
		<TabsContent value="users">
			<Card className="border rounded-lg">
				<CardContent className="pt-6">
					<div className="space-y-4">
						<div className="space-y-2">
							<label className="text-sm text-gray-600">Szukaj użytkownika</label>
							<Input type="email" placeholder="email@example.com" />
						</div>
						<div className="space-y-2 max-h-[500px] overflow-y-auto">
							{[
								'user1@example.com',
								'user2@example.com',
								'user3@example.com',
								'user4@example.com',
								'user5@example.com',
								'user6@example.com',
								'user7@example.com'
							].map((email, index) => (
								<div key={index} className="flex items-center justify-between rounded-lg border bg-white p-4">
									<div className="flex items-center space-x-4">
										<div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
											<User className="h-6 w-6 text-gray-500" />
										</div>
										<div className="font-medium">{email}</div>
									</div>
									<Button variant="destructive" size="icon" className="bg-red-500 hover:bg-red-600 rounded-xl h-10 w-10">
										<Trash2 className="h-5 w-5" />
									</Button>
								</div>
							))}
						</div>
					</div>
				</CardContent>
			</Card>
		</TabsContent>
	)
}

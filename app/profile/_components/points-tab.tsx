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

export const PointsTab = () => {
	return (
		<TabsContent value="points">
			<Card className="border rounded-lg">
				<CardContent className="pt-6">
					<div className="space-y-4">
						<div className="space-y-2">
							<label className="text-sm text-gray-600">Szukaj punktu</label>
							<Input type="text" placeholder="Nazwa punktu" />
						</div>
						<div className="space-y-2 max-h-[500px] overflow-y-auto">
							{[
								{ name: 'Park Kochanowskiego', date: '19/11/2024', status: 'Zatwierdzony' },
								{ name: 'Park Kochanowskiego', date: '18/11/2024', status: 'W trakcie weryfikacji' },
								{ name: 'Park Kochanowskiego', date: '17/11/2024', status: 'Odrzucony' }
							].map((point, index) => (
								<div key={index} className="flex items-center justify-between rounded-lg border bg-white p-4">
									<div className="flex items-center space-x-4">
										<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
											<MapPin className="h-6 w-6 text-blue-500" />
										</div>
										<div>
											<div className="font-medium">{point.name}</div>
											<div className="text-sm text-gray-600">{point.date}</div>
										</div>
									</div>
									<div
										className={`text-sm font-medium ${
											point.status === 'Zatwierdzony'
												? 'text-green-500'
												: point.status === 'W trakcie weryfikacji'
												? 'text-yellow-500'
												: 'text-red-500'
										}`}>
										{point.status}
									</div>
								</div>
							))}
						</div>
					</div>
				</CardContent>
			</Card>
		</TabsContent>
	)
}

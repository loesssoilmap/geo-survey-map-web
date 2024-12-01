'use client'

import { Logo } from '@/components/logo'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslations } from '@/hooks/useTranslations'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { ArrowLeft, MapPin, Trash2, User } from 'lucide-react'
// import Image from 'next/image'
import Link from 'next/link'

export default function Component() {
	const { translations } = useTranslations()
	const { user } = useKindeBrowserClient()

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="mx-auto max-w-xl px-4">
				<header className="py-6">
					<div className="flex items-center">
						<Link href="/" className="rounded-lg p-2 hover:bg-gray-100">
							<ArrowLeft className="h-6 w-6" />
						</Link>
						<div className="mx-auto">
							<Logo />
						</div>
						<div className="w-10" /> {/* Spacer for centering */}
					</div>
				</header>

				<Tabs defaultValue="profile" className="space-y-6">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="profile">{translations.userProfile.title}</TabsTrigger>
						<TabsTrigger value="users">{translations.userManagement.title}</TabsTrigger>
						<TabsTrigger value="points">{translations.pointManagement.title}</TabsTrigger>
					</TabsList>

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
										<div className="text-gray-600">{user?.email}</div>
										<div className="text-xl font-semibold">PKT 145</div>
									</div>
								</div>

								<div className="mt-8 space-y-6">
									<div className="space-y-4">
										<h3 className="text-lg font-medium">Zmiana adresu email</h3>
										<div className="space-y-2">
											<label className="text-sm text-gray-600">Email</label>
											<Input type="email" placeholder={user?.email || 'user@gmail.com'} />
										</div>
										<Button className="w-full bg-emerald-400 hover:bg-emerald-500">Zmień adres email</Button>
									</div>

									<div className="space-y-4">
										<h3 className="text-lg font-medium">Zarządzanie kontem</h3>
										<Button variant="destructive" className="w-full">
											Usuń konto
										</Button>
									</div>

									<div className="space-y-4">
										<h3 className="text-lg font-medium">Dodane punkty</h3>
										<div className="space-y-3">
											{[1, 2].map((point) => (
												<div key={point} className="flex items-center gap-4 rounded-lg border bg-white p-4">
													<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
														<MapPin className="h-6 w-6 text-blue-500" />
													</div>
													<div className="flex-1">
														<div className="font-medium">Park Kochanowskiego</div>
														<div className="text-sm text-gray-600">19/04/2024</div>
													</div>
													{/* <Image
														src="/placeholder.svg?height=60&width=60"
														alt="Location thumbnail"
														width={60}
														height={60}
														className="rounded-lg"
													/> */}
												</div>
											))}
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

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
												<Button
													variant="destructive"
													size="icon"
													className="bg-red-500 hover:bg-red-600 rounded-xl h-10 w-10">
													<Trash2 className="h-5 w-5" />
												</Button>
											</div>
										))}
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

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
				</Tabs>
			</div>
		</div>
	)
}

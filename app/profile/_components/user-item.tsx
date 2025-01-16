'use client'

import { useState } from 'react'
import { User, Settings, Ban } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Permissions } from 'geo-survey-map-shared-modules'
import { cn } from '@/lib/utils'
import { UserItemProps } from '@/types/types'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

export const UserItem: React.FC<UserItemProps> = ({ email, permissions, isBanned, onPermissionsChange, onBanUser }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedPermissions, setSelectedPermissions] = useState<string[]>(permissions)
	const { user } = useKindeBrowserClient()

	const handlePermissionChange = (permission: string, checked: boolean) => {
		setSelectedPermissions((prev) => (checked ? [...prev, permission] : prev.filter((p) => p !== permission)))
		onPermissionsChange(selectedPermissions as Permissions[])
	}

	return (
		<div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg border bg-white p-4 w-full">
			<div className="flex items-center flex-col sm:flex-row gap-2">
				<User className="h-6 w-6" />
				<p className={cn(isBanned ? 'line-through' : '', 'text-sm sm:text-base break-all')}>{email}</p>
			</div>
			<div className="flex gap-4">
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogTrigger asChild>
						<Button variant="outline" size="icon">
							<Settings className="h-4 w-4" />
						</Button>
					</DialogTrigger>
					<DialogContent aria-describedby="Permissions management" className="sm:max-w-96">
						<DialogHeader>
							<DialogTitle>Zarządzaj uprawnieniami</DialogTitle>
						</DialogHeader>
						<ScrollArea className="h-[300px] w-full rounded-md border p-4">
							{Object.values(Permissions).map((permission) => (
								<div key={permission} className="flex items-center space-x-2 mb-2">
									<Checkbox
										id={permission}
										checked={selectedPermissions.includes(permission)}
										onCheckedChange={(checked) => handlePermissionChange(permission, checked as boolean)}
									/>
									<label
										htmlFor={permission}
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
										{permission}
									</label>
								</div>
							))}
						</ScrollArea>
					</DialogContent>
				</Dialog>
				{user?.email !== email ? (
					<TooltipProvider key={email}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="destructive" size="icon" onClick={onBanUser}>
									<Ban className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent className="z-800">
								<p>Ban user. This will prevent them from adding points to the map</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				) : null}
			</div>
		</div>
	)
}

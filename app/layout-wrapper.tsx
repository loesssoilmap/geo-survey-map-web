'use client'

import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname()
	const isMapRoute = pathname === '/map'

	return <div className={cn(isMapRoute ? 'overflow-y-hidden' : '', 'relative')}>{children}</div>
}

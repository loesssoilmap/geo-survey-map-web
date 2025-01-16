'use client'

import { LanguageButton } from '@/components/language-button'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Map } from 'lucide-react'
import Link from 'next/link'

export const Nav = () => {
	return (
		<nav className="fixed top-4 left-0 right-0 z-50 px-4">
			<div className="container mx-auto max-w-5xl">
				<div className="rounded-lg px-4 backdrop-blur-md bg-white/20">
					<div className="flex justify-between items-center">
						<Link href="/" className="w-28">
							<Logo />
						</Link>
						<div className="flex gap-2">
							<LanguageButton size="10" />
							<Link href="/map">
								<Button size="sm" className="text-white h-10">
									<Map />
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}

import { useAppContext } from '@/context/AppContext'
import { useTranslations } from '@/hooks/useTranslations'
import { LoginLink, LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Home, LogIn, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const RightSidebarActionButtons = () => {
	const { user } = useKindeBrowserClient()

	return (
		<div className="flex flex-col gap-4 me-4">
			<HomeButton />
			<AuthButton />
			{user && <ProfileButton />}
			<LanguageButton />
		</div>
	)
}

const authButtonStyles =
	'bg-white border-2 border-gray rounded-lg w-14 h-14 flex flex-col justify-center items-center hover:bg-zinc-100 transition-all pointer-events-auto'

const HomeButton = () => (
	<Link href="/">
		<button className={authButtonStyles}>
			<Home />
		</button>
	</Link>
)

const AuthButton = () => {
	const { translations } = useTranslations()
	const { user } = useKindeBrowserClient()

	return (
		<React.Fragment>
			{user ? (
				<LogoutLink className={authButtonStyles}>
					<LogIn className="rotate-180" />
					<p className="text-[10px] font-bold">{translations.logout}</p>
				</LogoutLink>
			) : (
				<LoginLink className={authButtonStyles}>
					<LogIn />
					<p className="text-[10px] font-bold">{translations.login}</p>
				</LoginLink>
			)}
		</React.Fragment>
	)
}

const ProfileButton = () => {
	const { translations } = useTranslations()

	return (
		<Link href="/profile">
			<button className={authButtonStyles}>
				<User />
				<p className="text-[10px] font-bold">{translations.profile}</p>
			</button>
		</Link>
	)
}

const LanguageButton = () => {
	const { appState, setLanguage } = useAppContext()

	return (
		<button className={authButtonStyles}>
			<select
				className="appearance-none h-full w-13 text-center cursor-pointer font-bold text-xs bg-transparent"
				value={appState.language}
				onChange={(e) => setLanguage(e.target.value as any)}>
				<option className="" value="pl">
					PL
				</option>
				<option className="text-[6px]" value="en">
					ENG
				</option>
			</select>
		</button>
	)
}

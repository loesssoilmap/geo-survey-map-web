import { useAppContext } from '@/context/AppContext'
import { useTranslations } from '@/hooks/useTranslations'
import { LoginLink, LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { LogIn, User } from 'lucide-react'
import React from 'react'

export const ActionButtons = () => {
	const { user } = useKindeBrowserClient()

	return (
		<div className="flex flex-col gap-4 me-4">
			<AuthButton />
			{user && <ProfileButton />}
			<LanguageButton />
		</div>
	)
}

const AuthButton = () => {
	const { translations } = useTranslations()
	const { user } = useKindeBrowserClient()
	const authButtonStyles =
		'bg-white border-2 border-gray rounded-lg w-14 h-14 flex flex-col justify-center items-center hover:bg-zinc-100 transition-all pointer-events-auto'

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
		<button className="bg-white border-2 border-gray rounded-lg w-14 h-14 flex flex-col justify-center items-center hover:bg-zinc-100 transition-all pointer-events-auto">
			<User />
			<p className="text-[10px] font-bold">{translations.profile}</p>
		</button>
	)
}

const LanguageButton = () => {
	const { appState, setLanguage } = useAppContext()

	return (
		<button className="bg-white border-2 border-gray rounded-lg w-14 h-14 hover:bg-zinc-100 transition-all text-2xl pointer-events-auto">
			<select
				className="appearance-none h-full w-full text-center cursor-pointer"
				value={appState.language}
				onChange={(e) => setLanguage(e.target.value as any)}>
				<option value="pl">🇵🇱</option>
				<option value="en">🇬🇧</option>
			</select>
		</button>
	)
}

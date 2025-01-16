import { LanguageButton } from '@/components/language-button'
import { useAppContext } from '@/context/AppContext'
import { useTranslations } from '@/hooks/useTranslations'
import { LoginLink, LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Home, LogIn, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const actionButtonStyles =
	'bg-white border-2 border-gray rounded-lg w-14 h-14 flex flex-col justify-center items-center hover:bg-zinc-100 transition-all pointer-events-auto'

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

const HomeButton = () => (
	<Link href="/">
		<button className={actionButtonStyles}>
			<Home />
		</button>
	</Link>
)

const AuthButton = () => {
	const { appState } = useAppContext()
	const { translations } = useTranslations()
	const { user } = useKindeBrowserClient()

	return (
		<React.Fragment>
			{user ? (
				<LogoutLink className={actionButtonStyles} lang="fr">
					<LogIn className="rotate-180" />
					<p className="text-[10px] font-bold">{translations.logout}</p>
				</LogoutLink>
			) : (
				<LoginLink
					className={actionButtonStyles}
					authUrlParams={{
						lang: appState.language
					}}>
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
			<button className={actionButtonStyles}>
				<User />
				<p className="text-[10px] font-bold">{translations.profile}</p>
			</button>
		</Link>
	)
}

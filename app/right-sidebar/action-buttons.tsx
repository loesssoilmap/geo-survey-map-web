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
	const { user } = useKindeBrowserClient()
	const authButtonStyles =
		'bg-white border-2 border-gray rounded-lg w-14 h-14 flex flex-col justify-center items-center hover:bg-zinc-100 transition-all'

	return (
		<React.Fragment>
			{user ? (
				<LogoutLink className={authButtonStyles}>
					<LogIn className="rotate-180" />
					<p className="text-[10px] font-bold">Wyloguj</p>
				</LogoutLink>
			) : (
				<LoginLink className={authButtonStyles}>
					<LogIn />
					<p className="text-[10px] font-bold">Zaloguj</p>
				</LoginLink>
			)}
		</React.Fragment>
	)
}

const ProfileButton = () => {
	return (
		<button className="bg-white border-2 border-gray rounded-lg w-14 h-14 flex flex-col justify-center items-center hover:bg-zinc-100 transition-all">
			<User />
			<p className="text-[10px] font-bold">Profil</p>
		</button>
	)
}

const LanguageButton = () => {
	return (
		<button className="bg-white border-2 border-gray rounded-lg w-14 h-14 flex flex-col justify-center items-center hover:bg-zinc-100 transition-all text-2xl">
			🇵🇱
		</button>
	)
}

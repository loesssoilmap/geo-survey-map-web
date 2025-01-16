'use client'
import { ChidlrenProps } from '@/types/types'
import { KindeProvider } from '@kinde-oss/kinde-auth-nextjs'

export const AuthProvider: React.FC<ChidlrenProps> = ({ children }) => {
	return <KindeProvider>{children}</KindeProvider>
}

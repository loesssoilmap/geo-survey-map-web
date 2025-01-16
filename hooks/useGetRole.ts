import { checkRole } from '@/lib/utils'
import { RolesClaim } from '@/types/types'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

export const useGetRole = () => {
	// const { getClaim } = useKindeBrowserClient()
	// const roles = getClaim('roles')
	// const isAdmin = checkRole(roles as RolesClaim, 'ADMIN')
	// const isSuperAdmin = checkRole(roles as RolesClaim, 'ADMIN')
	// const isBasicUser = !isAdmin && !isSuperAdmin

	return {
		isAdmin: true,
		isSuperAdmin: true,
		isBasicUser: true
	}
}

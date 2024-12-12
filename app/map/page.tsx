import dynamic from 'next/dynamic'
import { LeftSidebar } from './_components/left-sidebar/left-sidebar'
import { RightSidebar } from './_components/right-sidebar/right-sidebar'
import { ToastProvider } from '@/components/toast'
import { MarkerInfoModal } from './_components/marker-info-modal'
import { CategoryInfoModal } from './_components/category-info-modal'
const DynamicMapComponent = dynamic(() => import('@/app/map/_components/map/map'), { ssr: false })

export default function Home() {
	return (
		<main>
			<ToastProvider />
			<RightSidebar />
			<LeftSidebar />
			<MarkerInfoModal />
			<CategoryInfoModal />
			<DynamicMapComponent />
		</main>
	)
}

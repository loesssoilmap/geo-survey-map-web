import dynamic from 'next/dynamic'
import { LeftSidebar } from './left-sidebar/left-sidebar'
import { RightSidebar } from './right-sidebar/right-sidebar'
import { ToastProvider } from '@/components/toast'
import { MarkerInfoModal } from './marker-info-modal/marker-info-modal'
const DynamicMapComponent = dynamic(() => import('@/app/map/map'), { ssr: false })

export default function Home() {
	return (
		<main>
			<ToastProvider />
			<RightSidebar />
			<LeftSidebar />
			<MarkerInfoModal />
			<DynamicMapComponent />
		</main>
	)
}

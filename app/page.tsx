import dynamic from 'next/dynamic'
import { LeftSidebar } from '@/components/left-sidebar/left-sidebar'
import { RightSidebar } from '@/components/right-sidebar/right-sidebar'
import { ToastProvider } from '@/components/toast'
import { MarkerInfoModal } from '@/components/marker-info-modal'
const DynamicMapComponent = dynamic(() => import('@/components/map/map'), { ssr: false })

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

import dynamic from 'next/dynamic'
const DynamicMapComponent = dynamic(() => import('@/app/map/map'), { ssr: false })

export default function Home() {
	return (
		<main>
			<DynamicMapComponent />
		</main>
	)
}

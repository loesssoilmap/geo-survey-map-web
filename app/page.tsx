import dynamic from 'next/dynamic'
import Link from 'next/link'

export default function Home() {
	return (
		<main>
			<Link href="/map">Go to the map</Link>
		</main>
	)
}

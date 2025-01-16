import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Hero() {
	return (
		<section className="relative min-h-[calc(100svh+12.375rem)] sm:min-h-svh flex items-center bg-center bg-cover bg-no-repeat p-4 bg-[url('/landing_bg.png')]">
			<div className="max-w-5xl mx-auto">
				<div className="flex flex-col gap-5 text-[#004E53] sm:w-1/2 md:gap-8">
					<h1 className="font-black text-xl md:text-4xl">Shape The Future Of Soil Education.</h1>
					<p className="text-sm sm:text-base md:text-lg">
						Together, we map, connect, and educate to cultivate soil literacy, fostering awareness, engagement, and sustainable practices.
					</p>
					<div className="flex flex-col sm:flex-row gap-4">
						<Link href="/map">
							<Button className="md:h-11 md:text-lg">Explore the Map</Button>
						</Link>
						<Link href="#how_it_works">
							<Button className="md:h-11 md:text-lg" variant="outline">
								Learn more
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

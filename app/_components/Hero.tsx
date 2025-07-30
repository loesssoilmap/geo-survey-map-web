import { Button } from '@/components/ui/button'
import { useTranslations } from '@/hooks/useTranslations'
import Link from 'next/link'
import { FaAndroid, FaApple } from 'react-icons/fa'

export default function Hero() {
	const { translations } = useTranslations()

	return (
		<section className="relative min-h-[calc(100svh+12.375rem)] sm:min-h-svh flex items-center bg-center bg-cover bg-no-repeat p-4 bg-[url('/landing_bg.png')]">
			<div className="max-w-5xl mx-auto">
				<div className="flex flex-col gap-5 text-[#004E53] sm:w-1/2 md:gap-8">
					<h1 className="font-black text-xl md:text-4xl">{translations.shapeTheFuture}</h1>
					<p className="text-sm sm:text-base md:text-lg">{translations.togetherWeMap}</p>
					<div className="flex flex-col sm:flex-row gap-4">
						<Link href="/map">
							<Button className="md:h-11 md:text-lg">{translations.exploreTheMap}</Button>
						</Link>
						<Link href="#how_it_works">
							<Button className="md:h-11 md:text-lg" variant="outline">
								{translations.learnMore}
							</Button>
						</Link>
					</div>
					{/* Download buttons for mobile apps */}
					<div className="flex flex-col sm:flex-row gap-4">
						<a
							href="https://uam-my.sharepoint.com/:u:/g/personal/bikol_amu_edu_pl/Ed021jhPsXFPn1SNLdnEXVsBF9VXI1Y8MAZLCI-muoKgXw?e=ywomlI&download=1"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Button className="flex items-center md:h-11 md:text-lg" variant="outline">
								<FaAndroid className="w-5 h-5 mr-2" />
								Android (APK)
							</Button>
						</a>
						<a
							href="https://apps.apple.com/pl/app/loess-soil-map/id6740585479"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Button className="flex items-center md:h-11 md:text-lg" variant="outline">
								<FaApple className="w-5 h-5 mr-2" />
								App Store
							</Button>
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}

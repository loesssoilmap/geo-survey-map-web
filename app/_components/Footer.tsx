import { Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
	return (
		<section>
			<footer className="bg-[#DEEDE0] py-8 px-4 text-[#004E53] relative">
				<div className="max-w-5xl mx-auto">
					<div className="flex flex-col sm:flex-row justify-between items-center">
						<div className="flex flex-col gap-2 mb-8 sm:mb-0">
							<p className="font-bold text-center sm:text-left">&copy; 2025 LOESS Soil Map. All rights reserved.</p>
							<div className="flex flex-col gap-2 text-xs underline">
								<Link href="/privacy-policy" className="hover:text-primary transition-colors text-center sm:text-left">
									Privacy policy
								</Link>
								<Link href="/legal-notice" className="hover:text-primary transition-colors text-center sm:text-left">
									Legal notice
								</Link>
								<Link
									href="/https://github.com/orgs/GeoSurveyMap/repositories"
									className="hover:text-primary transition-colors text-center sm:text-left">
									Code repository
								</Link>
							</div>
						</div>
						<Image className="w-48" src="/funded_by_the_eu.png" alt="Funded by the european union" width={274} height={70} />
					</div>
				</div>
			</footer>
		</section>
	)
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslations } from '@/hooks/useTranslations'

export default function ProjectDescription() {
	const { translations } = useTranslations()

	return (
		<section className="mb-20 text-[#004E53]">
			<div className="container mx-auto px-4">
				<h1 className="font-black text-xl md:text-4xl text-center mb-5">{translations.aboutTheProject}</h1>
				<p className="text-center text-sm sm:text-base md:text-lg mb-5">{translations.learnMoreAboutTheProject}</p>
				<div className="flex flex-col gap-4 items-center">
					<Card className="text-[#004E53] mb-5 md:mb-8 max-w-3xl w-full bg-[url('/radial_bg_1.jpg')] bg-cover bg-no-repeat bg-center">
						<CardHeader>
							<CardTitle>{translations.mappingSoilDegradation}</CardTitle>
						</CardHeader>
						<CardContent className="text-sm sm:text-base md:text-lg">
							<p className="mb-4">{translations.mappingSoilDegradationDescription1}</p>
							<p>{translations.mappingSoilDegradationDescription2}</p>
						</CardContent>
					</Card>
					<Card className="text-[#004E53] mb-5 md:mb-8 max-w-3xl w-full bg-[url('/radial_bg_2.jpg')] bg-cover bg-no-repeat bg-center">
						<CardHeader>
							<CardTitle>{translations.sharedKnowledgeBase}</CardTitle>
						</CardHeader>
						<CardContent className="text-sm sm:text-base md:text-lg">
							<p className="mb-4">{translations.sharedKnowledgeBaseDescription1}</p>
							<p>{translations.sharedKnowledgeBaseDescription2}</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	)
}

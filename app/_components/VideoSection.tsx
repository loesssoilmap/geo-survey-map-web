import { useTranslations } from '@/hooks/useTranslations'

export default function VideoSection() {
	const { translations } = useTranslations()

	return (
		<section id="how_it_works" className="bg-cover bg-bottom bg-no-repeat text-[#004E53] pt-20 mb-20 bg-[url('/half_circle.png')]">
			<div className="max-w-5xl mx-auto px-4 flex flex-col items-center">
				<h1 className="font-black text-xl md:text-4xl text-center mb-5">{translations.howToUseTheApp}</h1>
				<p className="text-center text-sm sm:text-base md:text-lg mb-5 md:mb-20">{translations.watchVideoDescription}</p>
				<div className="aspect-video max-w-3xl w-full">
					<iframe
						className="rounded-lg w-full h-full"
						src="https://www.youtube.com/embed/JGrNVqyldQg?si=kSTeOSB0DaTSktk6"
						title={translations.appTutorial}
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
						allowFullScreen></iframe>
				</div>
			</div>
		</section>
	)
}

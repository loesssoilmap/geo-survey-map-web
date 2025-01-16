import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ProjectDescription() {
	return (
		<section className="mb-20 text-[#004E53]">
			<div className="container mx-auto px-4">
				<h1 className="font-black text-xl md:text-4xl text-center mb-5">About The Project</h1>
				<p className="text-center text-sm sm:text-base md:text-lg mb-5">Learn more about the project</p>
				<div className="flex flex-col gap-4 items-center">
					<Card className="text-[#004E53] mb-5 md:mb-8 max-w-3xl w-full bg-[url('/radial_bg_1.jpg')] bg-cover bg-no-repeat bg-center">
						<CardHeader>
							<CardTitle>Mapping Soil Degradation at Your Fingertips</CardTitle>
						</CardHeader>
						<CardContent className="text-sm sm:text-base md:text-lg">
							<p className="mb-4">
								LOESS Soil Map is a platform that brings the community together in the effort to protect soils. By leveraging
								interactive maps and geolocation tools, users can collaboratively build a database by adding information about soil
								conditions in their local areas.
							</p>
							<p>
								The collected data supports researchers and decision-makers in making informed environmental decisions. With a
								straightforward survey form and an intuitive interface, anyone can contribute to a deeper understanding of soil
								degradation processes and effectively help protect soils.
							</p>
						</CardContent>
					</Card>
					<Card className="text-[#004E53] mb-5 md:mb-8 max-w-3xl w-full bg-[url('/radial_bg_2.jpg')] bg-cover bg-no-repeat bg-center">
						<CardHeader>
							<CardTitle>A Shared Knowledge Base for a Better Tomorrow</CardTitle>
						</CardHeader>
						<CardContent className="text-sm sm:text-base md:text-lg">
							<p className="mb-4">
								The LOESS Soil Map project, carried out under the international LOESS research program, aggregates data on soil
								erosion, pH, and moisture, enabling global analysis. As a result, users gain access to comprehensive information they
								can put into practice—ranging from scientific research to ecological initiatives.
							</p>
							<p>
								Establishing a cohesive data ecosystem is our key to collective solutions. Through community involvement and modern
								technologies, LOESS Soil Map becomes a central hub for information exchange, supporting environmental protection
								efforts and safeguarding the interests of future generations.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	)
}

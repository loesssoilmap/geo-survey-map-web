'use client'

import { Nav } from './_components/Nav'
import Hero from './_components/Hero'
import VideoSection from './_components/VideoSection'
import ProjectDescription from './_components/ProjectDescription'
import Footer from './_components/Footer'

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col dotted-background">
			<Nav />
			<Hero />
			<VideoSection />
			<ProjectDescription />
			<Footer />
		</main>
	)
}

export default function VideoSection() {
	return (
		<section id="how_it_works" className="bg-cover bg-bottom bg-no-repeat text-[#004E53] pt-20 mb-20 bg-[url('/half_circle.png')]">
			<div className="max-w-5xl mx-auto px-4 flex flex-col items-center">
				<h1 className="font-black text-xl md:text-4xl text-center mb-5">How to Use the App</h1>
				<p className="text-center text-sm sm:text-base md:text-lg mb-5 md:mb-20">Watch the short video on how to use the crowdmapping tool</p>
				<div className="aspect-video max-w-3xl w-full">
					<iframe
						className="rounded-lg w-full h-full"
						src="https://www.youtube.com/embed/dQw4w9WgXcQ"
						title="App Tutorial"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
						allowFullScreen
					/>
				</div>
			</div>
		</section>
	)
}

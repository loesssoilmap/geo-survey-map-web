/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '9000',
				pathname: '/surveyimages/**'
			},
			{
				protocol: 'http',
				hostname: 'loess.wmi.amu.edu.pl',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'www.iberdrola.com',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'i0.wp.com',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'www.cipra.org',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'infonet-biovision.org',
				pathname: '/**'
			}
		]
	}
}

export default nextConfig

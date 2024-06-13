import type { Config } from 'tailwindcss'

const config: Config = {
	content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-dry-soils': 'linear-gradient(to bottom, #FFF500, #D6CD00)',
				'gradient-wet-soils': 'linear-gradient(to bottom, #2C9AFF, #1A5C99)',
				'gradient-erosion': 'linear-gradient(to bottom, #C9C9C9, #636363)',
				'gradient-sealed-soils': 'linear-gradient(to bottom, #DB5C00, #753100)',
				'gradient-degradation': 'linear-gradient(to bottom, #FF2C2C, #991A1A)',
				'gradient-ph': 'linear-gradient(to bottom, #D484E8, #442061)'
			},
			zIndex: {
				'800': '800'
			},
			colors: {
				black: '#222222',
				'gray-dark': '#666666',
				gray: '#dcdcdc',
				white: '#ffffff',
				primary: `#14d49b`
			}
		}
	},
	plugins: []
}
export default config

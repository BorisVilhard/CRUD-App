import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				default: '#005b96',
				error: '#ff324d',
				success: '#6c9808',
				onGoing: '#f1c232',
				neutral: '#a0b7d5',
			},
		},
	},
	plugins: [],
};
export default config;

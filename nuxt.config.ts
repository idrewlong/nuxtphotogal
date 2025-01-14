// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	gtag: {
		id: '',
	},
	app: {
		pageTransition: { name: 'page', mode: 'out-in' },
	},
	css: ['~/assets/css/main.css'],
	image: {
		format: ['webp'],
		domains: [''],
	},
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	modules: [
		'@nuxtjs/tailwindcss',
		'@nuxt/image',
		'@nuxt/icon',
		'@nuxt/fonts',
		'nuxt-gtag',
	],
});

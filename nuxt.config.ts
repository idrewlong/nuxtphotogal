// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite';
export default defineNuxtConfig({
	compatibilityDate: '2025-08-22',
	devtools: { enabled: false },
	site: {
		url:
			process.env.NODE_ENV === 'production'
				? 'https://idrewfilm.com'
				: 'http://localhost:3000',
		name: 'idrewfilm',
		defaultLocale: 'en',
	},
	vite: {
		plugins: [tailwindcss()],
	},
	apollo: {
		clients: {
			default: {
				httpEndpoint:
					process.env.GRAPHQL_ENDPOINT || 'https://cms.idrewfilm.com/graphql',
				connectToDevTools: process.env.NODE_ENV === 'development',
			},
		},
	},
	runtimeConfig: {
		public: {
			graphqlEndpoint:
				process.env.GRAPHQL_ENDPOINT || 'https://cms.idrewfilm.com/graphql',
			wordpressUrl: process.env.WORDPRESS_URL || 'https://cms.idrewfilm.com',
		},
	},
	gtag: {
		id: '',
	},
	app: {
		pageTransition: { name: 'page', mode: 'out-in' },
	},
	css: ['~/assets/css/main.css'],
	image: {
		format: ['webp'],
		domains: ['cms.idrewfilm.com'],
	},
	fonts: {
		adobe: {
			id: 'ozb2bpw',
		},
	},

	modules: [
		'@nuxt/image',
		'@nuxt/icon',
		'@nuxt/fonts',
		'nuxt-gtag',
		'@nuxtjs/apollo',
		'@nuxtjs/seo',
	],
});

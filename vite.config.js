import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/pwg/',
	define: {
		__PACKAGE_VERSION__: JSON.stringify(process.env.npm_package_version),
	},
	plugins: [
		VitePWA({
			devOptions: {
				enabled: true,
			},
			manifest: {
				"name": "パスワードを簡単に使い分けるツール",
				"short_name": "パスワード作成",
				"start_url": "/pwg/",
				"display": "standalone",
				"theme_color": "#f8f9fa",
				"background_color": "#ffffff",
				"icons": [
					{
						"src": "pwg-192.png",
						"sizes": "192x192",
						"type": "image/png",
					},
					{
						"src": "pwg.png",
						"sizes": "512x512",
						"type": "image/png",
					},
				],
			},
			registerType: 'autoUpdate',
			workbox: {
				globPatterns: [
					'**/*.{css,html,js,woff,woff2}',
				],
			},
		}),
		vue(),
	],
	server: {
		host: true,
	},
});

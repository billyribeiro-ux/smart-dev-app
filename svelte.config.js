import autoAdapter from '@sveltejs/adapter-auto';
import staticAdapter from '@sveltejs/adapter-static';

const isDesktopBuild = process.env.DESKTOP_BUILD === '1';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true),
		experimental: {
			async: true
		}
	},
	kit: {
		experimental: {
			remoteFunctions: true
		},
		adapter: isDesktopBuild
			? staticAdapter({
					pages: 'build',
					assets: 'build',
					fallback: 'index.html'
				})
			: autoAdapter()
	}
};

export default config;

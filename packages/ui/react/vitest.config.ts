import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		exclude: ['dist/**', 'node_modules/**'],
		setupFiles: ['./vitest.setup.ts'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'lcov'],
			exclude: ['node_modules', 'dist', 'vitest.config.ts'],
		},
	},
});

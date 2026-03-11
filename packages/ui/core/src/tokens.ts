export const uiTokens = {
	color: {
		brand: {
			50: '#f4f8ff',
			100: '#e5efff',
			500: '#2f6df6',
			600: '#1f59d5',
			700: '#1746ab',
		},
		surface: {
			background: '#ffffff',
			foreground: '#171717',
			muted: '#f4f4f5',
			border: '#e4e4e7',
		},
		feedback: {
			success: '#16a34a',
			warning: '#f59e0b',
			error: '#dc2626',
			info: '#0ea5e9',
		},
	},
	space: {
		xs: '0.25rem',
		sm: '0.5rem',
		md: '0.75rem',
		lg: '1rem',
		xl: '1.5rem',
		'2xl': '2rem',
	},
	radius: {
		sm: '0.375rem',
		md: '0.5rem',
		lg: '0.75rem',
		xl: '1rem',
		full: '9999px',
	},
	font: {
		family: {
			sans: 'Inter, system-ui, sans-serif',
			mono: 'ui-monospace, SFMono-Regular, Menlo, monospace',
		},
		size: {
			xs: '0.75rem',
			sm: '0.875rem',
			base: '1rem',
			lg: '1.125rem',
			xl: '1.25rem',
		},
	},
	shadow: {
		sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
		md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
		lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
	},
	breakpoint: {
		sm: '640px',
		md: '768px',
		lg: '1024px',
		xl: '1280px',
		'2xl': '1536px',
		tv: '1920px',
		tv4k: '2560px',
	},
	responsive: {
		fontScale: {
			base: 1,
			tv: 1.15,
			tv4k: 1.3,
		},
		touchTarget: {
			default: 44,
			tv: 56,
		},
	},
} as const;

export type UiTokens = typeof uiTokens;

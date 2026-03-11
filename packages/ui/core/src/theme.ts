import { uiTokens } from './tokens';

type CssVarMap = Record<string, string>;

export function createCssVariables(prefix = 'ui'): CssVarMap {
	return {
		[`--${prefix}-color-brand-50`]: uiTokens.color.brand[50],
		[`--${prefix}-color-brand-100`]: uiTokens.color.brand[100],
		[`--${prefix}-color-brand-500`]: uiTokens.color.brand[500],
		[`--${prefix}-color-brand-600`]: uiTokens.color.brand[600],
		[`--${prefix}-color-brand-700`]: uiTokens.color.brand[700],
		[`--${prefix}-color-surface-background`]: uiTokens.color.surface.background,
		[`--${prefix}-color-surface-foreground`]: uiTokens.color.surface.foreground,
		[`--${prefix}-color-surface-muted`]: uiTokens.color.surface.muted,
		[`--${prefix}-color-surface-border`]: uiTokens.color.surface.border,
		[`--${prefix}-radius-sm`]: uiTokens.radius.sm,
		[`--${prefix}-radius-md`]: uiTokens.radius.md,
		[`--${prefix}-radius-lg`]: uiTokens.radius.lg,
		[`--${prefix}-radius-xl`]: uiTokens.radius.xl,
		[`--${prefix}-shadow-sm`]: uiTokens.shadow.sm,
		[`--${prefix}-shadow-md`]: uiTokens.shadow.md,
		[`--${prefix}-shadow-lg`]: uiTokens.shadow.lg,
	};
}

export function createTailwindTheme(prefix = 'ui') {
	return {
		screens: {
			sm: uiTokens.breakpoint.sm,
			md: uiTokens.breakpoint.md,
			lg: uiTokens.breakpoint.lg,
			xl: uiTokens.breakpoint.xl,
			'2xl': uiTokens.breakpoint['2xl'],
			tv: uiTokens.breakpoint.tv,
			tv4k: uiTokens.breakpoint.tv4k,
		},
		colors: {
			brand: {
				50: `var(--${prefix}-color-brand-50)`,
				100: `var(--${prefix}-color-brand-100)`,
				500: `var(--${prefix}-color-brand-500)`,
				600: `var(--${prefix}-color-brand-600)`,
				700: `var(--${prefix}-color-brand-700)`,
			},
			surface: {
				background: `var(--${prefix}-color-surface-background)`,
				foreground: `var(--${prefix}-color-surface-foreground)`,
				muted: `var(--${prefix}-color-surface-muted)`,
				border: `var(--${prefix}-color-surface-border)`,
			},
		},
		borderRadius: {
			sm: `var(--${prefix}-radius-sm)`,
			md: `var(--${prefix}-radius-md)`,
			lg: `var(--${prefix}-radius-lg)`,
			xl: `var(--${prefix}-radius-xl)`,
		},
		boxShadow: {
			sm: `var(--${prefix}-shadow-sm)`,
			md: `var(--${prefix}-shadow-md)`,
			lg: `var(--${prefix}-shadow-lg)`,
		},
	};
}

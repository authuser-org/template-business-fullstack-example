import { uiTokens } from '@repo/ui-core';

export const nativeUiTokens = uiTokens;

const REM_BASE = 16;

function remToNumber(value: string): number {
	if (value.endsWith('rem')) {
		return Number.parseFloat(value) * REM_BASE;
	}

	return Number.parseFloat(value);
}

export const nativeTheme = {
	colors: {
		brand: uiTokens.color.brand[500],
		background: uiTokens.color.surface.background,
		foreground: uiTokens.color.surface.foreground,
		muted: uiTokens.color.surface.muted,
		border: uiTokens.color.surface.border,
		success: uiTokens.color.feedback.success,
		warning: uiTokens.color.feedback.warning,
		error: uiTokens.color.feedback.error,
		info: uiTokens.color.feedback.info,
	},
	spacing: {
		xs: remToNumber(uiTokens.space.xs),
		sm: remToNumber(uiTokens.space.sm),
		md: remToNumber(uiTokens.space.md),
		lg: remToNumber(uiTokens.space.lg),
		xl: remToNumber(uiTokens.space.xl),
		'2xl': remToNumber(uiTokens.space['2xl']),
	},
	radius: {
		sm: remToNumber(uiTokens.radius.sm),
		md: remToNumber(uiTokens.radius.md),
		lg: remToNumber(uiTokens.radius.lg),
		xl: remToNumber(uiTokens.radius.xl),
		full: Number.MAX_SAFE_INTEGER,
	},
	fontSize: {
		xs: remToNumber(uiTokens.font.size.xs),
		sm: remToNumber(uiTokens.font.size.sm),
		base: remToNumber(uiTokens.font.size.base),
		lg: remToNumber(uiTokens.font.size.lg),
		xl: remToNumber(uiTokens.font.size.xl),
	},
} as const;

export * from './components';
export * from './hooks';

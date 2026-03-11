import { uiTokens } from '@repo/ui-core';

export function cx(...classNames: Array<string | false | null | undefined>) {
	return classNames.filter(Boolean).join(' ');
}

export const reactUiTokens = uiTokens;

export * from './components';
export * from './hooks';

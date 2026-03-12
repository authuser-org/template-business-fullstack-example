import { EN_MESSAGES } from './messages/en';
import { ES_MESSAGES } from './messages/es';

export const SUPPORTED_LOCALES = ['es', 'en'] as const;

export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

export interface MessageTree {
	[key: string]: string | MessageTree;
}

export const SHARED_I18N_MESSAGES: Record<AppLocale, MessageTree> = {
	es: ES_MESSAGES,
	en: EN_MESSAGES,
};

export function isSupportedLocale(
	value: string | undefined,
): value is AppLocale {
	return value !== undefined && SUPPORTED_LOCALES.includes(value as AppLocale);
}

export function resolveLocale(
	value: string | undefined,
	fallback: AppLocale = 'en',
): AppLocale {
	return isSupportedLocale(value) ? value : fallback;
}

export function getSharedMessages(locale: AppLocale): MessageTree {
	return SHARED_I18N_MESSAGES[locale];
}

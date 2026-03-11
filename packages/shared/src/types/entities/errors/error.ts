import type { LocalizedStringMap } from '../i18n/localization';

export type ErrorSeverity = 'info' | 'warning' | 'error' | 'fatal';

export interface DomainError {
	code: string;
	domain:
		| 'auth'
		| 'catalog'
		| 'playback'
		| 'entitlement'
		| 'billing'
		| 'ads'
		| 'device'
		| 'unknown';
	message: string;
	messageI18n?: LocalizedStringMap;
	userMessageKey?: string;
	userMessageI18n?: LocalizedStringMap;
	retryable: boolean;
	severity: ErrorSeverity;
	details?: Record<string, string | number | boolean>;
}

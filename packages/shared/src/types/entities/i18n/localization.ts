export type LocaleCode = string;

export type LocalizedStringMap = Record<LocaleCode, string>;

export interface LocalizedRichText {
	locale: LocaleCode;
	value: string;
}

export interface LocalizationContext {
	defaultLocale: LocaleCode;
	availableLocales: LocaleCode[];
}

export interface RequestLocaleHeaders {
	'accept-language'?: string;
	'x-locale'?: LocaleCode;
	'x-fallback-locale'?: LocaleCode;
}

export interface LocaleResolutionInput {
	headers?: RequestLocaleHeaders;
	requestedLocale?: LocaleCode;
	preferredLocale?: LocaleCode;
	fallbackLocale?: LocaleCode;
	supportedLocales: LocaleCode[];
	defaultLocale: LocaleCode;
}

export interface ResolvedLocale {
	locale: LocaleCode;
	source: 'requested' | 'preferred' | 'fallback' | 'default';
}

export interface RequestLocaleContext {
	headers: RequestLocaleHeaders;
	resolved: ResolvedLocale;
}

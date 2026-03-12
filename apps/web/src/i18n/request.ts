import {
	getSharedMessages,
	isSupportedLocale,
	resolveLocale,
	type AppLocale,
} from '@repo/shared';
import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

function getLocaleFromAcceptLanguage(
	acceptLanguage: string | null | undefined,
): AppLocale | undefined {
	if (!acceptLanguage) return undefined;

	for (const item of acceptLanguage.split(',')) {
		const languageTag = item.split(';')[0]?.trim().toLowerCase();
		if (!languageTag) continue;

		const baseLocale = languageTag.split('-')[0];
		if (isSupportedLocale(baseLocale)) {
			return baseLocale;
		}
	}

	return undefined;
}

export default getRequestConfig(async () => {
	const store = await cookies();
	const requestHeaders = await headers();
	const cookieLocale = store.get('locale')?.value;
	const browserLocale = getLocaleFromAcceptLanguage(
		requestHeaders.get('accept-language'),
	);

	const locale = isSupportedLocale(cookieLocale)
		? cookieLocale
		: resolveLocale(browserLocale, 'en');

	return {
		locale,
		messages: getSharedMessages(locale),
	};
});

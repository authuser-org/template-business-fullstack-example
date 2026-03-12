import { cookies } from 'next/headers';
import { LanguageSelectClient } from './LanguageSelectClient';

export type LanguageSelectProps = {
	currentLocale: string;
};

type LocaleValue = 'es' | 'en';

type LocaleOption = {
	label: string;
	value: LocaleValue;
};

const OPTIONS: readonly LocaleOption[] = [
	{ label: 'Español', value: 'es' },
	{ label: 'English', value: 'en' },
];

export function LanguageSelect({ currentLocale }: LanguageSelectProps) {
	async function setLocale(locale: LocaleValue) {
		'use server';

		const store = await cookies();
		store.set('locale', locale, {
			path: '/',
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 365,
		});
	}

	return (
		<LanguageSelectClient
			currentLocale={currentLocale}
			options={OPTIONS}
			onLocaleChange={setLocale}
		/>
	);
}

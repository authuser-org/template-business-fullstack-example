'use client';

import { Select, type SelectProps } from '@repo/ui-react';
import { useEffect, useMemo, useState, useTransition } from 'react';

type LocaleValue = 'es' | 'en';

type LocaleOption = {
	label: string;
	value: LocaleValue;
};

type LanguageSelectClientProps = {
	currentLocale: string;
	options: readonly LocaleOption[];
	onLocaleChange: (locale: LocaleValue) => Promise<void>;
};

type LocaleOnChange = NonNullable<SelectProps<LocaleOption, false>['onChange']>;

export function LanguageSelectClient({
	currentLocale,
	options,
	onLocaleChange,
}: LanguageSelectClientProps) {
	const [isPending, startTransition] = useTransition();

	const selectedFromCurrentLocale = useMemo(() => {
		return options.find((option) => option.value === currentLocale) ?? null;
	}, [currentLocale, options]);

	const [selectedOption, setSelectedOption] = useState<LocaleOption | null>(
		selectedFromCurrentLocale,
	);

	useEffect(() => {
		setSelectedOption(selectedFromCurrentLocale);
	}, [selectedFromCurrentLocale]);

	const handleChange: LocaleOnChange = (nextValue) => {
		if (!nextValue || Array.isArray(nextValue)) {
			return;
		}

		setSelectedOption(nextValue);
		startTransition(() => {
			void onLocaleChange(nextValue.value);
		});
	};

	return (
		<Select<LocaleOption, false>
			className="mt-6 w-full max-w-xs"
			placeholder="Selecciona idioma"
			searchPlaceholder="Buscar idioma..."
			bottomSheetTitle="Selecciona idioma"
			isClearable={false}
			isSearchable={false}
			isDisabled={isPending}
			options={[...options]}
			value={selectedOption}
			onChange={handleChange}
		/>
	);
}

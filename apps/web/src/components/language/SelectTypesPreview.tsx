'use client';

import { Select } from '@repo/ui-react';
import { useState } from 'react';

type BasicOption = {
	label: string;
	value: string;
};

const LANGUAGE_OPTIONS: BasicOption[] = [
	{ label: 'Español', value: 'es' },
	{ label: 'English', value: 'en' },
	{ label: 'Français', value: 'fr' },
];

const GROUPED_OPTIONS = [
	{
		label: 'Europa',
		options: [
			{ label: 'Español', value: 'es' },
			{ label: 'English', value: 'en' },
			{ label: 'Français', value: 'fr' },
		],
	},
	{
		label: 'América',
		options: [
			{ label: 'Português', value: 'pt' },
			{ label: 'Deutsch', value: 'de' },
		],
	},
];

export function SelectTypesPreview() {
	const [singleValue, setSingleValue] = useState<BasicOption | null>(
		LANGUAGE_OPTIONS[0],
	);
	const [multiValue, setMultiValue] = useState<BasicOption[]>([
		LANGUAGE_OPTIONS[0],
		LANGUAGE_OPTIONS[1],
	]);

	return (
		<section className="mt-10 grid gap-4 md:grid-cols-2">
			<div className="rounded-lg border border-surface-border p-4">
				<p className="mb-2 text-sm font-semibold">Select simple</p>
				<Select<BasicOption, false>
					placeholder="Selecciona idioma"
					searchPlaceholder="Buscar idioma..."
					bottomSheetTitle="Select simple"
					options={LANGUAGE_OPTIONS}
					value={singleValue}
					onChange={(nextValue) => {
						if (!nextValue || Array.isArray(nextValue)) return;
						setSingleValue(nextValue);
					}}
				/>
			</div>

			<div className="rounded-lg border border-surface-border p-4">
				<p className="mb-2 text-sm font-semibold">Select multi</p>
				<Select<BasicOption, true>
					isMulti
					isClearable
					placeholder="Selecciona varios"
					searchPlaceholder="Buscar opciones..."
					bottomSheetTitle="Select multi"
					options={LANGUAGE_OPTIONS}
					value={multiValue}
					onChange={(nextValue) => {
						if (!Array.isArray(nextValue)) return;
						setMultiValue(nextValue);
					}}
				/>
			</div>

			<div className="rounded-lg border border-surface-border p-4 md:col-span-2">
				<p className="mb-2 text-sm font-semibold">Select con grupos</p>
				<Select<BasicOption, false>
					placeholder="Selecciona por grupo"
					searchPlaceholder="Buscar en grupos..."
					bottomSheetTitle="Select agrupado"
					options={GROUPED_OPTIONS}
				/>
			</div>
		</section>
	);
}

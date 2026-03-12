import type { ReactNode } from 'react';
import { useEffect, useId, useMemo, useState } from 'react';
import ReactSelect, {
	type ActionMeta,
	type GroupBase,
	type OnChangeValue,
	type PropsValue,
	type Props as ReactSelectProps,
} from 'react-select';
import { cx } from '../../../index';
import { BottomSheet } from '../bottom-sheet';

const DEFAULT_MOBILE_BREAKPOINT = 768;

type SelectOptionBase = {
	label?: string;
	value?: string;
};

type FlattenedItem<Option> =
	| {
			kind: 'group';
			label: ReactNode;
			key: string;
	  }
	| {
			kind: 'option';
			option: Option;
			key: string;
	  };

export type SelectProps<
	Option extends SelectOptionBase,
	IsMulti extends boolean = false,
	Group extends GroupBase<Option> = GroupBase<Option>,
> = ReactSelectProps<Option, IsMulti, Group> & {
	mobileBreakpoint?: number;
	bottomSheetTitle?: ReactNode;
	searchPlaceholder?: string;
};

function isGroup<
	Option extends SelectOptionBase,
	Group extends GroupBase<Option>,
>(item: Option | Group): item is Group {
	if (typeof item !== 'object' || item === null) {
		return false;
	}

	return 'options' in item && Array.isArray(item.options);
}

function toActionMeta<Option extends SelectOptionBase>(
	meta: ActionMeta<Option>,
) {
	return meta;
}

function defaultGetOptionLabel<Option extends SelectOptionBase>(
	option: Option,
) {
	if (typeof option.label === 'string') {
		return option.label;
	}

	return '';
}

function defaultGetOptionValue<Option extends SelectOptionBase>(
	option: Option,
) {
	if (typeof option.value === 'string') {
		return option.value;
	}

	return defaultGetOptionLabel(option);
}

function useIsMobile(breakpoint: number) {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		const query = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
		const handleChange = () => setIsMobile(query.matches);

		handleChange();
		query.addEventListener('change', handleChange);

		return () => query.removeEventListener('change', handleChange);
	}, [breakpoint]);

	return isMobile;
}

export function Select<
	Option extends SelectOptionBase,
	IsMulti extends boolean = false,
	Group extends GroupBase<Option> = GroupBase<Option>,
>({
	options = [],
	value,
	defaultValue,
	onChange,
	placeholder = 'Seleccionar...',
	noOptionsMessage,
	loadingMessage,
	isMulti,
	isDisabled,
	isLoading,
	isOptionDisabled,
	isClearable,
	filterOption,
	getOptionLabel = defaultGetOptionLabel as (option: Option) => string,
	getOptionValue = defaultGetOptionValue as (option: Option) => string,
	className,
	mobileBreakpoint = DEFAULT_MOBILE_BREAKPOINT,
	bottomSheetTitle,
	searchPlaceholder = 'Buscar...',
	...desktopProps
}: SelectProps<Option, IsMulti, Group>) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [mobileSearch, setMobileSearch] = useState('');
	const [mobileDraftValues, setMobileDraftValues] = useState<Option[]>([]);
	const reactId = useId();
	const [internalValue, setInternalValue] = useState<PropsValue<Option>>(
		defaultValue as PropsValue<Option>,
	);
	const instanceId = desktopProps.instanceId ?? `ui-select-${reactId}`;

	const isMobile = useIsMobile(mobileBreakpoint);
	const isControlled = value !== undefined;
	const selectedValue = (
		isControlled ? value : internalValue
	) as PropsValue<Option>;

	const selectedOptions = useMemo<Option[]>(() => {
		if (Array.isArray(selectedValue)) {
			return selectedValue;
		}

		return selectedValue ? [selectedValue] : [];
	}, [selectedValue]);

	const selectedOptionValues = useMemo(() => {
		return new Set(selectedOptions.map((option) => getOptionValue(option)));
	}, [getOptionValue, selectedOptions]);

	const mobileSelectedOptions = isMulti ? mobileDraftValues : selectedOptions;

	const mobileSelectedOptionValues = useMemo(() => {
		return new Set(
			mobileSelectedOptions.map((option) => getOptionValue(option)),
		);
	}, [getOptionValue, mobileSelectedOptions]);

	useEffect(() => {
		if (!mobileOpen || !isMulti) {
			return;
		}

		setMobileDraftValues(selectedOptions);
	}, [isMulti, mobileOpen, selectedOptions]);

	const flattenedOptions = useMemo(() => {
		const items: Array<FlattenedItem<Option>> = [];

		for (const item of options) {
			if (isGroup<Option, Group>(item)) {
				items.push({
					kind: 'group',
					label: item.label,
					key: `group-${String(item.label ?? items.length)}`,
				});

				for (const option of item.options) {
					items.push({
						kind: 'option',
						option,
						key: `option-${getOptionValue(option)}`,
					});
				}
				continue;
			}

			items.push({
				kind: 'option',
				option: item,
				key: `option-${getOptionValue(item)}`,
			});
		}

		return items;
	}, [getOptionValue, options]);

	const filteredItems = useMemo(() => {
		const search = mobileSearch.trim();

		if (search.length === 0) {
			return flattenedOptions;
		}

		const filtered: Array<FlattenedItem<Option>> = [];
		let lastGroup: FlattenedItem<Option> | null = null;

		for (const item of flattenedOptions) {
			if (item.kind === 'group') {
				lastGroup = item;
				continue;
			}

			const label = getOptionLabel(item.option);
			const valueText = getOptionValue(item.option);

			const matched = filterOption
				? filterOption(
						{
							label,
							value: valueText,
							data: item.option,
						},
						search,
					)
				: `${label} ${valueText}`.toLowerCase().includes(search.toLowerCase());

			if (!matched) {
				continue;
			}

			if (lastGroup) {
				const groupAlreadyAdded = filtered.some(
					(entry) => entry.kind === 'group' && entry.key === lastGroup?.key,
				);
				if (!groupAlreadyAdded) {
					filtered.push(lastGroup);
				}
			}

			filtered.push(item);
		}

		return filtered;
	}, [
		filterOption,
		flattenedOptions,
		getOptionLabel,
		getOptionValue,
		mobileSearch,
	]);

	const selectedLabel = useMemo(() => {
		if (selectedOptions.length === 0) {
			return typeof placeholder === 'string' ? placeholder : 'Seleccionar...';
		}

		if (isMulti) {
			return selectedOptions.map((option) => getOptionLabel(option)).join(', ');
		}

		const firstSelected = selectedOptions[0];
		return firstSelected ? getOptionLabel(firstSelected) : 'Seleccionar...';
	}, [getOptionLabel, isMulti, placeholder, selectedOptions]);

	const handleValueChange = (
		nextValue: OnChangeValue<Option, IsMulti>,
		actionMeta: ActionMeta<Option>,
	) => {
		if (!isControlled) {
			setInternalValue(nextValue as PropsValue<Option>);
		}

		onChange?.(nextValue, actionMeta);
	};

	const handleClear = () => {
		if (isDisabled) {
			return;
		}

		const clearValue = (isMulti ? [] : null) as OnChangeValue<Option, IsMulti>;
		handleValueChange(
			clearValue,
			toActionMeta({ action: 'clear', removedValues: selectedOptions }),
		);
	};

	const toggleMobileOption = (option: Option) => {
		if (isDisabled || isOptionDisabled?.(option, mobileSelectedOptions)) {
			return;
		}

		if (isMulti) {
			const optionValue = getOptionValue(option);
			const alreadySelected = mobileSelectedOptionValues.has(optionValue);

			const nextValues = alreadySelected
				? mobileSelectedOptions.filter(
						(item) => getOptionValue(item) !== optionValue,
					)
				: [...mobileSelectedOptions, option];

			setMobileDraftValues(nextValues);
			return;
		}

		handleValueChange(
			option as unknown as OnChangeValue<Option, IsMulti>,
			toActionMeta({
				action: 'select-option',
				option,
			}),
		);
		setMobileOpen(false);
	};

	const handleMobileCancel = () => {
		setMobileDraftValues(selectedOptions);
		setMobileOpen(false);
	};

	const handleMobileConfirm = () => {
		if (!isMulti) {
			setMobileOpen(false);
			return;
		}

		const nextValues = mobileDraftValues;
		handleValueChange(
			nextValues as unknown as OnChangeValue<Option, IsMulti>,
			nextValues.length === 0
				? toActionMeta({ action: 'clear', removedValues: selectedOptions })
				: toActionMeta({
						action: 'select-option',
						option: nextValues[nextValues.length - 1],
					} as ActionMeta<Option>),
		);
		setMobileOpen(false);
	};

	if (!isMobile) {
		const desktopStyles: ReactSelectProps<Option, IsMulti, Group>['styles'] = {
			...desktopProps.styles,
			menu: (base, state) => ({
				...base,
				backgroundColor: '#ffffff',
				color: '#111827',
				...(desktopProps.styles?.menu
					? desktopProps.styles.menu(base, state)
					: null),
			}),
			menuList: (base, state) => ({
				...base,
				backgroundColor: '#ffffff',
				...(desktopProps.styles?.menuList
					? desktopProps.styles.menuList(base, state)
					: null),
			}),
			option: (base, state) => {
				const selected = state.isSelected;
				const focused = state.isFocused;

				return {
					...base,
					color: selected ? '#ffffff' : '#111827',
					backgroundColor: selected
						? '#2563eb'
						: focused
							? '#eff6ff'
							: '#ffffff',
					...(desktopProps.styles?.option
						? desktopProps.styles.option(base, state)
						: null),
				};
			},
			groupHeading: (base, state) => ({
				...base,
				color: '#374151',
				...(desktopProps.styles?.groupHeading
					? desktopProps.styles.groupHeading(base, state)
					: null),
			}),
		};

		return (
			<ReactSelect<Option, IsMulti, Group>
				{...desktopProps}
				styles={desktopStyles}
				instanceId={instanceId}
				className={className}
				options={options}
				value={
					selectedValue as ReactSelectProps<Option, IsMulti, Group>['value']
				}
				defaultValue={defaultValue}
				onChange={handleValueChange}
				placeholder={placeholder}
				noOptionsMessage={noOptionsMessage}
				loadingMessage={loadingMessage}
				isMulti={isMulti}
				isDisabled={isDisabled}
				isLoading={isLoading}
				isOptionDisabled={isOptionDisabled}
				isClearable={isClearable}
				filterOption={filterOption}
				getOptionLabel={getOptionLabel}
				getOptionValue={getOptionValue}
			/>
		);
	}

	const noOptionsLabel = noOptionsMessage?.({ inputValue: mobileSearch });
	const loadingLabel = loadingMessage?.({ inputValue: mobileSearch });

	return (
		<div className={cx('flex w-full flex-col gap-2', className)}>
			<button
				type="button"
				onClick={() => setMobileOpen(true)}
				disabled={isDisabled}
				className={cx(
					'flex min-h-10 w-full items-center justify-between rounded-md border border-surface-border bg-surface-background px-3 py-2 text-left text-sm text-surface-foreground transition-colors',
					isDisabled
						? 'cursor-not-allowed opacity-60'
						: 'active:border-brand-500',
				)}
			>
				<span className="truncate">{selectedLabel}</span>
				<span className="text-xs text-surface-muted">Abrir</span>
			</button>

			{isClearable && selectedOptions.length > 0 ? (
				<button
					type="button"
					onClick={handleClear}
					disabled={isDisabled}
					className="self-start text-xs font-medium text-brand-600 disabled:opacity-50"
				>
					Limpiar selección
				</button>
			) : null}

			<BottomSheet
				open={mobileOpen}
				onOpenChange={setMobileOpen}
				title={bottomSheetTitle ?? placeholder}
			>
				<input
					type="search"
					value={mobileSearch}
					onChange={(event) => setMobileSearch(event.target.value)}
					placeholder={searchPlaceholder}
					className="w-full rounded-md border border-surface-border bg-surface-background px-3 py-2 text-sm text-surface-foreground outline-none ring-brand-500 focus:ring-2"
				/>

				{isLoading ? (
					<p className="px-1 py-3 text-sm text-surface-muted">
						{loadingLabel ?? 'Cargando...'}
					</p>
				) : null}

				{!isLoading && filteredItems.length === 0 ? (
					<p className="px-1 py-3 text-sm text-surface-muted">
						{noOptionsLabel ?? 'Sin opciones'}
					</p>
				) : null}

				{!isLoading && filteredItems.length > 0 ? (
					<div className="flex flex-col gap-1 pb-2">
						{filteredItems.map((item) => {
							if (item.kind === 'group') {
								return (
									<p
										key={item.key}
										className="px-1 pt-2 text-xs font-semibold uppercase tracking-wide text-surface-foreground"
									>
										{item.label}
									</p>
								);
							}

							const optionValue = getOptionValue(item.option);
							const selected = mobileSelectedOptionValues.has(optionValue);
							const disabled = isOptionDisabled?.(
								item.option,
								mobileSelectedOptions,
							);

							return (
								<button
									type="button"
									key={item.key}
									onClick={() => toggleMobileOption(item.option)}
									disabled={disabled}
									className={cx(
										'flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm transition-colors',
										selected
											? 'bg-brand-50 text-brand-700'
											: 'text-surface-foreground hover:bg-surface-muted',
										disabled ? 'cursor-not-allowed opacity-50' : undefined,
									)}
								>
									<span>{getOptionLabel(item.option)}</span>
									{selected ? (
										<span className="text-xs font-semibold">Seleccionado</span>
									) : null}
								</button>
							);
						})}
					</div>
				) : null}

				{isMulti ? (
					<div className="sticky bottom-0 mt-2 flex gap-2 border-t border-surface-border bg-surface-background pt-2">
						<button
							type="button"
							onClick={handleMobileCancel}
							className="flex-1 rounded-md border border-surface-border px-3 py-2 text-sm font-medium text-surface-foreground"
						>
							Cancelar
						</button>
						<button
							type="button"
							onClick={handleMobileConfirm}
							className="flex-1 rounded-md border border-brand-500 bg-brand-500 px-3 py-2 text-sm font-medium text-white"
						>
							Confirmar
						</button>
					</div>
				) : null}
			</BottomSheet>
		</div>
	);
}

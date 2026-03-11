import { useState, type FormEvent, type InputHTMLAttributes } from 'react';
import { cx } from '../../../index';
import { Button } from '../button';

export interface SearchBarProps extends Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'onChange'
> {
	defaultValue?: string;
	onSearch?: (value: string) => void;
	onValueChange?: (value: string) => void;
}

export function SearchBar({
	defaultValue = '',
	onSearch,
	onValueChange,
	className,
	placeholder = 'Buscar...',
	...props
}: SearchBarProps) {
	const [value, setValue] = useState(defaultValue);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSearch?.(value);
	};

	return (
		<form
			className={cx('flex w-full items-center gap-2', className)}
			onSubmit={handleSubmit}
		>
			<input
				value={value}
				onChange={(event) => {
					setValue(event.currentTarget.value);
					onValueChange?.(event.currentTarget.value);
				}}
				placeholder={placeholder}
				className="w-full rounded-md border border-surface-border bg-surface-background px-3 py-2 text-sm"
				{...props}
			/>
			<Button size="sm" type="submit">
				Buscar
			</Button>
		</form>
	);
}

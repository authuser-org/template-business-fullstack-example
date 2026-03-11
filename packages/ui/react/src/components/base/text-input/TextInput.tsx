import type { InputHTMLAttributes } from 'react';
import { cx } from '../../../index';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
}

export function TextInput({
	label,
	error,
	className,
	id,
	...props
}: TextInputProps) {
	const inputId = id ?? props.name;

	return (
		<div className="flex w-full flex-col gap-1">
			{label ? (
				<label
					htmlFor={inputId}
					className="text-sm font-medium text-surface-foreground"
				>
					{label}
				</label>
			) : null}
			<input
				id={inputId}
				className={cx(
					'w-full rounded-md border border-surface-border bg-surface-background px-3 py-2 text-sm text-surface-foreground outline-none ring-brand-500 focus:ring-2',
					error ? 'border-red-500' : undefined,
					className,
				)}
				{...props}
			/>
			{error ? <p className="text-xs text-red-600">{error}</p> : null}
		</div>
	);
}

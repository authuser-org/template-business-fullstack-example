import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../../index';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends Omit<
	HTMLAttributes<HTMLDivElement>,
	'title'
> {
	title?: ReactNode;
	variant?: AlertVariant;
	children: ReactNode;
}

const variantClassName: Record<AlertVariant, string> = {
	info: 'border-sky-300 bg-sky-50 text-sky-900',
	success: 'border-emerald-300 bg-emerald-50 text-emerald-900',
	warning: 'border-amber-300 bg-amber-50 text-amber-900',
	error: 'border-red-300 bg-red-50 text-red-900',
};

export function Alert({
	title,
	variant = 'info',
	children,
	className,
	...props
}: AlertProps) {
	return (
		<div
			role="alert"
			className={cx(
				'w-full rounded-md border px-3 py-2',
				variantClassName[variant],
				className,
			)}
			{...props}
		>
			{title ? <p className="text-sm font-semibold">{title}</p> : null}
			<p className="text-sm">{children}</p>
		</div>
	);
}

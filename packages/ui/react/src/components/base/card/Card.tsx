import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../../index';

export interface CardProps extends Omit<
	HTMLAttributes<HTMLDivElement>,
	'children'
> {
	children: ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
	return (
		<div
			className={cx(
				'rounded-lg border border-surface-border bg-surface-background p-4 shadow-sm',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}

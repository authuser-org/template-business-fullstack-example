import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../../index';

export interface FooterProps extends HTMLAttributes<HTMLElement> {
	children: ReactNode;
}

export function Footer({ children, className, ...props }: FooterProps) {
	return (
		<footer
			className={cx(
				'border-t border-surface-border px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400',
				className,
			)}
			{...props}
		>
			{children}
		</footer>
	);
}

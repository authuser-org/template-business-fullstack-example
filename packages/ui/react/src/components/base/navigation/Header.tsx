import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../../index';

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
	logo?: ReactNode;
	actions?: ReactNode;
	children?: ReactNode;
}

export function Header({
	logo,
	actions,
	children,
	className,
	...props
}: HeaderProps) {
	return (
		<header
			className={cx(
				'flex items-center justify-between gap-3 border-b border-surface-border bg-surface-background px-4 py-3',
				className,
			)}
			{...props}
		>
			<div className="flex items-center gap-3">
				{logo}
				{children}
			</div>
			<div>{actions}</div>
		</header>
	);
}

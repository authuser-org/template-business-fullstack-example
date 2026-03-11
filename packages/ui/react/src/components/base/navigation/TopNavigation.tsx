import type { HTMLAttributes } from 'react';
import { cx } from '../../../index';

export type NavigationItem = { id: string; label: string };

export interface TopNavigationProps extends Omit<
	HTMLAttributes<HTMLElement>,
	'onChange'
> {
	items: NavigationItem[];
	activeId?: string;
	onChange?: (id: string) => void;
}

export function TopNavigation({
	items,
	activeId,
	onChange,
	className,
	...props
}: TopNavigationProps) {
	return (
		<nav
			className={cx('flex flex-wrap items-center gap-2', className)}
			{...props}
		>
			{items.map((item) => (
				<button
					key={item.id}
					type="button"
					onClick={() => onChange?.(item.id)}
					className={cx(
						'rounded-md border px-3 py-1.5 text-sm',
						activeId === item.id
							? 'border-brand-500 bg-brand-500 text-white'
							: 'border-surface-border bg-surface-background text-surface-foreground',
					)}
				>
					{item.label}
				</button>
			))}
		</nav>
	);
}

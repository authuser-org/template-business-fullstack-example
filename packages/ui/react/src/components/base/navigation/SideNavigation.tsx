import type { HTMLAttributes } from 'react';
import { cx } from '../../../index';
import type { NavigationItem } from './TopNavigation';

export interface SideNavigationProps extends Omit<
	HTMLAttributes<HTMLElement>,
	'onChange'
> {
	items: NavigationItem[];
	activeId?: string;
	onChange?: (id: string) => void;
}

export function SideNavigation({
	items,
	activeId,
	onChange,
	className,
	...props
}: SideNavigationProps) {
	return (
		<nav className={cx('flex flex-col gap-2', className)} {...props}>
			{items.map((item) => (
				<button
					key={item.id}
					type="button"
					onClick={() => onChange?.(item.id)}
					className={cx(
						'rounded-md px-3 py-2 text-left text-sm',
						activeId === item.id
							? 'bg-brand-500 text-white'
							: 'bg-surface-muted text-surface-foreground hover:bg-surface-border',
					)}
				>
					{item.label}
				</button>
			))}
		</nav>
	);
}

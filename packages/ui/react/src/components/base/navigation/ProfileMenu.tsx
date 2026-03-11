import type { DetailsHTMLAttributes } from 'react';
import { cx } from '../../../index';

export type ProfileMenuItem = { id: string; label: string };

export interface ProfileMenuProps extends Omit<
	DetailsHTMLAttributes<HTMLDetailsElement>,
	'onSelect'
> {
	label: string;
	items: ProfileMenuItem[];
	onSelect?: (id: string) => void;
}

export function ProfileMenu({
	label,
	items,
	onSelect,
	className,
	...props
}: ProfileMenuProps) {
	return (
		<details className={cx('relative', className)} {...props}>
			<summary className="cursor-pointer list-none rounded-md border border-surface-border bg-surface-background px-3 py-1.5 text-sm">
				{label}
			</summary>
			<div className="absolute right-0 z-20 mt-2 w-48 rounded-md border border-surface-border bg-surface-background p-1 shadow-md">
				{items.map((item) => (
					<button
						key={item.id}
						type="button"
						onClick={() => onSelect?.(item.id)}
						className="block w-full rounded px-2 py-1.5 text-left text-sm hover:bg-surface-muted"
					>
						{item.label}
					</button>
				))}
			</div>
		</details>
	);
}

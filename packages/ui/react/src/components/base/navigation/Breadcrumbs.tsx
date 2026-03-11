import type { HTMLAttributes } from 'react';
import { cx } from '../../../index';

export type BreadcrumbItem = { id: string; label: string };

export interface BreadcrumbsProps extends Omit<
	HTMLAttributes<HTMLElement>,
	'onSelect'
> {
	items: BreadcrumbItem[];
	onSelect?: (id: string) => void;
}

export function Breadcrumbs({
	items,
	onSelect,
	className,
	...props
}: BreadcrumbsProps) {
	return (
		<nav
			className={cx('flex flex-wrap items-center gap-2 text-sm', className)}
			{...props}
		>
			{items.map((item, index) => (
				<div key={item.id} className="flex items-center gap-2">
					<button
						type="button"
						onClick={() => onSelect?.(item.id)}
						className="text-zinc-700 hover:underline dark:text-zinc-300"
					>
						{item.label}
					</button>
					{index < items.length - 1 ? (
						<span className="text-zinc-400">/</span>
					) : null}
				</div>
			))}
		</nav>
	);
}

import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../../index';

export type SearchResultItem = {
	id: string;
	title: ReactNode;
	description?: ReactNode;
};

export interface SearchResultsProps extends Omit<
	HTMLAttributes<HTMLDivElement>,
	'onSelect'
> {
	items: SearchResultItem[];
	onSelect?: (id: string) => void;
}

export function SearchResults({
	items,
	onSelect,
	className,
	...props
}: SearchResultsProps) {
	return (
		<div className={cx('flex flex-col gap-2', className)} {...props}>
			{items.map((item) => (
				<button
					key={item.id}
					type="button"
					onClick={() => onSelect?.(item.id)}
					className="rounded-md border border-surface-border bg-surface-background p-3 text-left"
				>
					<p className="text-sm font-semibold text-surface-foreground">
						{item.title}
					</p>
					{item.description ? (
						<p className="text-xs text-zinc-600 dark:text-zinc-400">
							{item.description}
						</p>
					) : null}
				</button>
			))}
		</div>
	);
}

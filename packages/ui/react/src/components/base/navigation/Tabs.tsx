import type { HTMLAttributes } from 'react';
import { cx } from '../../../index';

export type TabItem = { id: string; label: string };

export interface TabsProps extends Omit<
	HTMLAttributes<HTMLDivElement>,
	'onChange'
> {
	items: TabItem[];
	activeId?: string;
	onChange?: (id: string) => void;
}

export function Tabs({
	items,
	activeId,
	onChange,
	className,
	...props
}: TabsProps) {
	return (
		<div
			className={cx('flex flex-wrap items-center gap-2', className)}
			{...props}
		>
			{items.map((item) => (
				<button
					key={item.id}
					type="button"
					onClick={() => onChange?.(item.id)}
					className={cx(
						'rounded-full border px-3 py-1.5 text-sm',
						activeId === item.id
							? 'border-brand-500 bg-brand-500 text-white'
							: 'border-surface-border bg-surface-background text-surface-foreground',
					)}
				>
					{item.label}
				</button>
			))}
		</div>
	);
}

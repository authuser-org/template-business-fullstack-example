import type { HTMLAttributes } from 'react';
import { Tabs, type TabItem } from './Tabs';

export interface GenreNavigationProps extends Omit<
	HTMLAttributes<HTMLDivElement>,
	'onChange'
> {
	items: TabItem[];
	activeId?: string;
	onChange?: (id: string) => void;
}

export function GenreNavigation({
	items,
	activeId,
	onChange,
	...props
}: GenreNavigationProps) {
	return (
		<Tabs items={items} activeId={activeId} onChange={onChange} {...props} />
	);
}

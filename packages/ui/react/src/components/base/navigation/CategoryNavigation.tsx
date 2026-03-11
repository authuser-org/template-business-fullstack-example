import type { HTMLAttributes } from 'react';
import { Tabs, type TabItem } from './Tabs';

export interface CategoryNavigationProps extends Omit<
	HTMLAttributes<HTMLDivElement>,
	'onChange'
> {
	items: TabItem[];
	activeId?: string;
	onChange?: (id: string) => void;
}

export function CategoryNavigation({
	items,
	activeId,
	onChange,
	...props
}: CategoryNavigationProps) {
	return (
		<Tabs items={items} activeId={activeId} onChange={onChange} {...props} />
	);
}

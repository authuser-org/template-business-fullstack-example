import { Tabs, type TabItem } from './Tabs';

export interface CategoryNavigationProps {
	items: TabItem[];
	activeId?: string;
	onChange?: (id: string) => void;
}

export function CategoryNavigation({
	items,
	activeId,
	onChange,
}: CategoryNavigationProps) {
	return <Tabs items={items} activeId={activeId} onChange={onChange} />;
}

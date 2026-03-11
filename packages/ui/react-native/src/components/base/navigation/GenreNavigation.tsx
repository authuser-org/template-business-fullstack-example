import { Tabs, type TabItem } from './Tabs';

export interface GenreNavigationProps {
	items: TabItem[];
	activeId?: string;
	onChange?: (id: string) => void;
}

export function GenreNavigation({
	items,
	activeId,
	onChange,
}: GenreNavigationProps) {
	return <Tabs items={items} activeId={activeId} onChange={onChange} />;
}

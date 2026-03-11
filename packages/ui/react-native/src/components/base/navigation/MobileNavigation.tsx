import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../button';

export type MobileNavigationItem = { id: string; label: ReactNode };

export interface MobileNavigationProps {
	items: MobileNavigationItem[];
	activeId?: string;
	onChange?: (id: string) => void;
}

export function MobileNavigation({
	items,
	activeId,
	onChange,
}: MobileNavigationProps) {
	return (
		<View style={styles.root}>
			{items.map((item) => (
				<Button
					key={item.id}
					size="sm"
					variant={activeId === item.id ? 'primary' : 'ghost'}
					onPress={() => onChange?.(item.id)}
				>
					{item.label}
				</Button>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		gap: 8,
		paddingVertical: 8,
	},
});

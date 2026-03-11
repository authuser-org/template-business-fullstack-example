import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { nativeTheme } from '../../../index';
import { Button } from '../button';

export type TabItem = { id: string; label: ReactNode };

export interface TabsProps {
	items: TabItem[];
	activeId?: string;
	onChange?: (id: string) => void;
}

export function Tabs({ items, activeId, onChange }: TabsProps) {
	return (
		<View style={styles.root}>
			{items.map((item) => {
				const isActive = activeId === item.id;
				return (
					<Button
						key={item.id}
						size="sm"
						variant={isActive ? 'primary' : 'secondary'}
						onPress={() => onChange?.(item.id)}
					>
						<Text style={styles.label}>{item.label}</Text>
					</Button>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
	label: {
		fontSize: nativeTheme.fontSize.sm,
	},
});

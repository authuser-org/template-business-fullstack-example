import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { nativeTheme } from '../../../index';
import { Button } from '../button';

export type SearchResultItem = {
	id: string;
	title: ReactNode;
	description?: ReactNode;
};

export interface SearchResultsProps {
	items: SearchResultItem[];
	onSelect?: (id: string) => void;
}

export function SearchResults({ items, onSelect }: SearchResultsProps) {
	return (
		<View style={styles.root}>
			{items.map((item) => (
				<View key={item.id} style={styles.item}>
					<Text style={styles.title}>{item.title}</Text>
					{item.description ? (
						<Text style={styles.description}>{item.description}</Text>
					) : null}
					<Button size="sm" variant="ghost" onPress={() => onSelect?.(item.id)}>
						Abrir
					</Button>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		gap: 8,
	},
	item: {
		borderWidth: 1,
		borderColor: nativeTheme.colors.border,
		borderRadius: nativeTheme.radius.md,
		backgroundColor: nativeTheme.colors.background,
		padding: 10,
		gap: 4,
	},
	title: {
		fontSize: nativeTheme.fontSize.base,
		fontWeight: '700',
		color: nativeTheme.colors.foreground,
	},
	description: {
		fontSize: nativeTheme.fontSize.sm,
		color: nativeTheme.colors.muted,
	},
});

import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { nativeTheme } from '../../../index';
import { Button } from '../button';

export type ProfileMenuItem = { id: string; label: ReactNode };

export interface ProfileMenuProps {
	label: ReactNode;
	items: ProfileMenuItem[];
	onSelect?: (id: string) => void;
}

export function ProfileMenu({ label, items, onSelect }: ProfileMenuProps) {
	return (
		<View style={styles.root}>
			<Text style={styles.label}>{label}</Text>
			<View style={styles.items}>
				{items.map((item) => (
					<Button
						key={item.id}
						size="sm"
						variant="secondary"
						onPress={() => onSelect?.(item.id)}
					>
						{item.label}
					</Button>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		gap: 8,
	},
	label: {
		fontSize: nativeTheme.fontSize.sm,
		fontWeight: '700',
		color: nativeTheme.colors.foreground,
	},
	items: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
});

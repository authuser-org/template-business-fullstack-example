import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { nativeTheme } from '../../../index';
import { Button } from '../button';

export interface SearchBarProps {
	defaultValue?: string;
	onSearch?: (value: string) => void;
	onValueChange?: (value: string) => void;
	placeholder?: string;
}

export function SearchBar({
	defaultValue = '',
	onSearch,
	onValueChange,
	placeholder = 'Buscar...',
}: SearchBarProps) {
	const [value, setValue] = useState(defaultValue);

	return (
		<View style={styles.root}>
			<TextInput
				value={value}
				onChangeText={(nextValue) => {
					setValue(nextValue);
					onValueChange?.(nextValue);
				}}
				placeholder={placeholder}
				placeholderTextColor={nativeTheme.colors.muted}
				style={styles.input}
			/>
			<Button size="sm" onPress={() => onSearch?.(value)}>
				Buscar
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: nativeTheme.colors.border,
		borderRadius: nativeTheme.radius.md,
		paddingHorizontal: 12,
		paddingVertical: 10,
		fontSize: nativeTheme.fontSize.sm,
		color: nativeTheme.colors.foreground,
		backgroundColor: nativeTheme.colors.background,
	},
});

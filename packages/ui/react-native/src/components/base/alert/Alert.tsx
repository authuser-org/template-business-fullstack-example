import { uiTokens } from '@repo/ui-core';
import type { ReactNode } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
	title?: ReactNode;
	children: ReactNode;
	variant?: AlertVariant;
	style?: StyleProp<ViewStyle>;
	titleStyle?: StyleProp<TextStyle>;
	textStyle?: StyleProp<TextStyle>;
}

const variantStyle: Record<
	AlertVariant,
	{ borderColor: string; backgroundColor: string; color: string }
> = {
	info: {
		borderColor: '#7dd3fc',
		backgroundColor: '#e0f2fe',
		color: '#0c4a6e',
	},
	success: {
		borderColor: '#86efac',
		backgroundColor: '#dcfce7',
		color: '#14532d',
	},
	warning: {
		borderColor: '#fcd34d',
		backgroundColor: '#fef3c7',
		color: '#78350f',
	},
	error: {
		borderColor: '#fca5a5',
		backgroundColor: '#fee2e2',
		color: '#7f1d1d',
	},
};

export function Alert({
	title,
	children,
	variant = 'info',
	style,
	titleStyle,
	textStyle,
}: AlertProps) {
	const currentVariant = variantStyle[variant];

	return (
		<View
			style={[
				styles.base,
				{
					borderColor: currentVariant.borderColor,
					backgroundColor: currentVariant.backgroundColor,
				},
				style,
			]}
		>
			{title ? (
				<Text
					style={[styles.title, { color: currentVariant.color }, titleStyle]}
				>
					{title}
				</Text>
			) : null}
			<Text
				style={[
					styles.text,
					{ color: currentVariant.color || uiTokens.color.surface.foreground },
					textStyle,
				]}
			>
				{children}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	base: {
		width: '100%',
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 10,
		gap: 4,
	},
	title: {
		fontSize: 14,
		fontWeight: '700',
	},
	text: {
		fontSize: 14,
	},
});

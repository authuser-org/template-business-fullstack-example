import { uiTokens } from '@repo/ui-core';
import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

export interface CardProps {
	children: ReactNode;
	style?: StyleProp<ViewStyle>;
}

export function Card({ children, style }: CardProps) {
	return <View style={[styles.base, style]}>{children}</View>;
}

const styles = StyleSheet.create({
	base: {
		backgroundColor: uiTokens.color.surface.background,
		borderColor: uiTokens.color.surface.border,
		borderWidth: 1,
		borderRadius: 12,
		padding: 16,
	},
});

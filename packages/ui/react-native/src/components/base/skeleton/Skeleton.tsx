import { uiTokens } from '@repo/ui-core';
import type { DimensionValue, StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

export interface SkeletonProps {
	height?: number;
	width?: DimensionValue;
	circle?: boolean;
	style?: StyleProp<ViewStyle>;
}

export function Skeleton({
	height = 16,
	width = '100%',
	circle,
	style,
}: SkeletonProps) {
	return (
		<View
			style={[
				styles.base,
				circle ? { borderRadius: 999 } : null,
				{ height, width },
				style,
			]}
		/>
	);
}

const styles = StyleSheet.create({
	base: {
		borderRadius: 8,
		backgroundColor: uiTokens.color.surface.muted,
	},
});

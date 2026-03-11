import { uiTokens } from '@repo/ui-core';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

export interface ProgressProps {
	value: number;
	style?: StyleProp<ViewStyle>;
}

function clampProgress(value: number) {
	return Math.max(0, Math.min(100, value));
}

export function Progress({ value, style }: ProgressProps) {
	const safeValue = clampProgress(value);

	return (
		<View style={[styles.track, style]}>
			<View style={[styles.fill, { width: `${safeValue}%` }]} />
		</View>
	);
}

const styles = StyleSheet.create({
	track: {
		height: 8,
		width: '100%',
		borderRadius: 999,
		overflow: 'hidden',
		backgroundColor: uiTokens.color.surface.muted,
	},
	fill: {
		height: '100%',
		borderRadius: 999,
		backgroundColor: uiTokens.color.brand[500],
	},
});

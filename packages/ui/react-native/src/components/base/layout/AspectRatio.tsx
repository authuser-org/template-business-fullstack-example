import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

export interface AspectRatioProps {
	children: ReactNode;
	ratio?: number;
	style?: StyleProp<ViewStyle>;
}

export function AspectRatio({
	children,
	ratio = 16 / 9,
	style,
}: AspectRatioProps) {
	return (
		<View style={[{ width: '100%', aspectRatio: ratio }, style]}>
			{children}
		</View>
	);
}

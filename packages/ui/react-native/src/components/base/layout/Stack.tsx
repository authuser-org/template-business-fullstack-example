import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

export interface StackProps {
	children: ReactNode;
	gap?: number;
	direction?: 'row' | 'column';
	align?: ViewStyle['alignItems'];
	justify?: ViewStyle['justifyContent'];
	wrap?: ViewStyle['flexWrap'];
	style?: StyleProp<ViewStyle>;
}

export function Stack({
	children,
	gap = 12,
	direction = 'column',
	align,
	justify,
	wrap,
	style,
}: StackProps) {
	return (
		<View
			style={[
				{
					gap,
					flexDirection: direction,
					alignItems: align,
					justifyContent: justify,
					flexWrap: wrap,
				},
				style,
			]}
		>
			{children}
		</View>
	);
}

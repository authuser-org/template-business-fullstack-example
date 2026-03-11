import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

export interface ContainerProps {
	children: ReactNode;
	style?: StyleProp<ViewStyle>;
}

export function Container({ children, style }: ContainerProps) {
	return (
		<View style={[{ width: '100%', paddingHorizontal: 16 }, style]}>
			{children}
		</View>
	);
}

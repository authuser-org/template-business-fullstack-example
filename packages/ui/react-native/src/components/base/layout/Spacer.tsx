import { View, type StyleProp, type ViewStyle } from 'react-native';

export interface SpacerProps {
	size?: number;
	axis?: 'vertical' | 'horizontal';
	style?: StyleProp<ViewStyle>;
}

export function Spacer({ size = 12, axis = 'vertical', style }: SpacerProps) {
	return (
		<View
			style={[
				{
					width: axis === 'horizontal' ? size : '100%',
					height: axis === 'vertical' ? size : 1,
					flexShrink: 0,
				},
				style,
			]}
		/>
	);
}

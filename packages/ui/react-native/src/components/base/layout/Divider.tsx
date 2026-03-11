import { View, type StyleProp, type ViewStyle } from 'react-native';
import { nativeTheme } from '../../../index';

export interface DividerProps {
	orientation?: 'horizontal' | 'vertical';
	style?: StyleProp<ViewStyle>;
}

export function Divider({ orientation = 'horizontal', style }: DividerProps) {
	return (
		<View
			style={[
				{
					backgroundColor: nativeTheme.colors.border,
					width: orientation === 'horizontal' ? '100%' : 1,
					height: orientation === 'horizontal' ? 1 : '100%',
				},
				style,
			]}
		/>
	);
}

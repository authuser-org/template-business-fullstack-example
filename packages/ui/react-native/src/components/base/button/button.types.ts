import type { ReactNode } from 'react';
import type {
	PressableProps,
	StyleProp,
	TextStyle,
	ViewStyle,
} from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<
	PressableProps,
	'children' | 'style'
> {
	children: ReactNode;
	variant?: ButtonVariant;
	size?: ButtonSize;
	style?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
}

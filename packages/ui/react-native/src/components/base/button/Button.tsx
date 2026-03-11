import { Pressable, StyleSheet, Text } from 'react-native';
import { uiTokens } from '@repo/ui-core';
import type { ButtonProps } from './button.types';

const sizeStyle = {
	sm: {
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 6,
		fontSize: 14,
	},
	md: {
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderRadius: 8,
		fontSize: 16,
	},
	lg: {
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 12,
		fontSize: 18,
	},
} as const;

const variantStyle = {
	primary: {
		backgroundColor: uiTokens.color.brand[500],
		borderColor: uiTokens.color.brand[500],
		textColor: '#ffffff',
	},
	secondary: {
		backgroundColor: uiTokens.color.surface.muted,
		borderColor: uiTokens.color.surface.border,
		textColor: uiTokens.color.surface.foreground,
	},
	ghost: {
		backgroundColor: 'transparent',
		borderColor: 'transparent',
		textColor: uiTokens.color.brand[500],
	},
} as const;

export function Button({
	children,
	variant = 'primary',
	size = 'md',
	style,
	textStyle,
	disabled,
	...props
}: ButtonProps) {
	const currentSize = sizeStyle[size];
	const currentVariant = variantStyle[variant];

	return (
		<Pressable
			accessibilityRole="button"
			disabled={disabled}
			style={({ pressed }) => [
				styles.base,
				{
					paddingVertical: currentSize.paddingVertical,
					paddingHorizontal: currentSize.paddingHorizontal,
					borderRadius: currentSize.borderRadius,
					backgroundColor: currentVariant.backgroundColor,
					borderColor: currentVariant.borderColor,
					opacity: disabled ? 0.6 : pressed ? 0.85 : 1,
				},
				style,
			]}
			{...props}
		>
			<Text
				style={[
					styles.text,
					{ color: currentVariant.textColor, fontSize: currentSize.fontSize },
					textStyle,
				]}
			>
				{children}
			</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	base: {
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
	},
	text: {
		fontWeight: '600',
	},
});

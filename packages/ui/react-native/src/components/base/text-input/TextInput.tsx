import { uiTokens } from '@repo/ui-core';
import type { ReactNode } from 'react';
import {
	TextInput as RNTextInput,
	type TextInputProps as RNTextInputProps,
	type StyleProp,
	StyleSheet,
	Text,
	type TextStyle,
	View,
	type ViewStyle,
} from 'react-native';

export interface TextInputProps extends RNTextInputProps {
	label?: ReactNode;
	error?: ReactNode;
	containerStyle?: StyleProp<ViewStyle>;
	labelStyle?: StyleProp<TextStyle>;
	errorStyle?: StyleProp<TextStyle>;
}

export function TextInput({
	label,
	error,
	style,
	containerStyle,
	labelStyle,
	errorStyle,
	...props
}: TextInputProps) {
	return (
		<View style={[styles.container, containerStyle]}>
			{label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}
			<RNTextInput
				placeholderTextColor={uiTokens.color.surface.border}
				style={[styles.input, error ? styles.inputError : null, style]}
				{...props}
			/>
			{error ? <Text style={[styles.error, errorStyle]}>{error}</Text> : null}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		gap: 6,
	},
	label: {
		fontSize: 13,
		fontWeight: '600',
		color: uiTokens.color.surface.foreground,
	},
	input: {
		borderWidth: 1,
		borderColor: uiTokens.color.surface.border,
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 10,
		fontSize: 14,
		color: uiTokens.color.surface.foreground,
		backgroundColor: uiTokens.color.surface.background,
	},
	inputError: {
		borderColor: uiTokens.color.feedback.error,
	},
	error: {
		fontSize: 12,
		color: uiTokens.color.feedback.error,
	},
});

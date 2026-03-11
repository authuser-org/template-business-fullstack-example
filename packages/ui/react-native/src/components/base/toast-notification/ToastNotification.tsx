import { uiTokens } from '@repo/ui-core';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type ToastVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

export type ToastNotificationProps = {
	visible: boolean;
	message: string;
	description?: string;
	variant?: ToastVariant;
	duration?: number;
	onClose?: () => void;
};

const variantStyles: Record<
	ToastVariant,
	{ backgroundColor: string; borderColor: string }
> = {
	default: {
		backgroundColor: uiTokens.color.surface.background,
		borderColor: uiTokens.color.surface.border,
	},
	success: {
		backgroundColor: '#dcfce7',
		borderColor: '#86efac',
	},
	warning: {
		backgroundColor: '#fef3c7',
		borderColor: '#fcd34d',
	},
	error: {
		backgroundColor: '#fee2e2',
		borderColor: '#fca5a5',
	},
	info: {
		backgroundColor: '#e0f2fe',
		borderColor: '#7dd3fc',
	},
};

export function ToastNotification({
	visible,
	message,
	description,
	variant = 'default',
	duration = 2500,
	onClose,
}: ToastNotificationProps) {
	useEffect(() => {
		if (!visible || !onClose) {
			return;
		}

		const timeout = setTimeout(() => {
			onClose();
		}, duration);

		return () => clearTimeout(timeout);
	}, [visible, duration, onClose]);

	if (!visible) {
		return null;
	}

	const currentStyle = variantStyles[variant];

	return (
		<View pointerEvents="none" style={styles.root}>
			<View
				style={[
					styles.toast,
					{
						backgroundColor: currentStyle.backgroundColor,
						borderColor: currentStyle.borderColor,
					},
				]}
			>
				<Text style={styles.message}>{message}</Text>
				{description ? (
					<Text style={styles.description}>{description}</Text>
				) : null}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		position: 'absolute',
		left: 16,
		right: 16,
		bottom: 16,
		alignItems: 'center',
		zIndex: 60,
	},
	toast: {
		width: '100%',
		maxWidth: 520,
		borderWidth: 1,
		borderRadius: 10,
		paddingHorizontal: 12,
		paddingVertical: 10,
		gap: 4,
	},
	message: {
		fontSize: 14,
		fontWeight: '700',
		color: uiTokens.color.surface.foreground,
	},
	description: {
		fontSize: 13,
		color: uiTokens.color.surface.foreground,
	},
});

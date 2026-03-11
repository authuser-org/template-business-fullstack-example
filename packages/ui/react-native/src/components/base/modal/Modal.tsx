import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import {
	Animated,
	Pressable,
	Modal as RNModal,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { nativeTheme } from '../../../index';
import { Button } from '../button';

export type ModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: ReactNode;
	title?: ReactNode;
};

const MODAL_ANIMATION_MS = 220;

export function Modal({ open, onOpenChange, children, title }: ModalProps) {
	const [rendered, setRendered] = useState(open);
	const progress = useRef(new Animated.Value(open ? 1 : 0)).current;

	useEffect(() => {
		if (open) {
			setRendered(true);
			Animated.timing(progress, {
				toValue: 1,
				duration: MODAL_ANIMATION_MS,
				useNativeDriver: true,
			}).start();
			return;
		}

		Animated.timing(progress, {
			toValue: 0,
			duration: MODAL_ANIMATION_MS,
			useNativeDriver: true,
		}).start(({ finished }) => {
			if (finished) {
				setRendered(false);
			}
		});
	}, [open, progress]);

	if (!rendered) {
		return null;
	}

	const backdropAnimatedStyle = {
		opacity: progress.interpolate({
			inputRange: [0, 1],
			outputRange: [0, 1],
		}),
	};

	const panelAnimatedStyle = {
		opacity: progress,
		transform: [
			{
				translateY: progress.interpolate({
					inputRange: [0, 1],
					outputRange: [16, 0],
				}),
			},
			{
				scale: progress.interpolate({
					inputRange: [0, 1],
					outputRange: [0.96, 1],
				}),
			},
		],
	};

	return (
		<RNModal
			visible={rendered}
			transparent
			animationType="none"
			onRequestClose={() => onOpenChange(false)}
		>
			<View style={styles.root}>
				<Animated.View style={[styles.backdrop, backdropAnimatedStyle]}>
					<Pressable
						style={StyleSheet.absoluteFill}
						onPress={() => onOpenChange(false)}
					/>
				</Animated.View>
				<Animated.View style={[styles.panel, panelAnimatedStyle]}>
					<View style={styles.header}>
						{title ? <Text style={styles.title}>{title}</Text> : <View />}
						<Button
							size="sm"
							variant="ghost"
							onPress={() => onOpenChange(false)}
						>
							Cerrar
						</Button>
					</View>
					<View style={styles.content}>{children}</View>
				</Animated.View>
			</View>
		</RNModal>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 16,
	},
	backdrop: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	panel: {
		width: '100%',
		maxWidth: 520,
		borderRadius: nativeTheme.radius.lg,
		borderWidth: 1,
		borderColor: nativeTheme.colors.border,
		backgroundColor: nativeTheme.colors.background,
		padding: 16,
		gap: 12,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 8,
	},
	title: {
		flex: 1,
		fontSize: 16,
		fontWeight: '700',
		color: nativeTheme.colors.foreground,
	},
	content: {
		gap: 12,
	},
});

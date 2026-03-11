import BottomSheetLib, { BottomSheetView } from '@gorhom/bottom-sheet';
import { uiTokens } from '@repo/ui-core';
import type { ReactNode } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import { Easing, StyleSheet, Text } from 'react-native';

export interface BottomSheetProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: ReactNode;
	title?: ReactNode;
	snapPoints?: Array<number | string>;
}

export function BottomSheet({
	open,
	onOpenChange,
	children,
	title,
	snapPoints,
}: BottomSheetProps) {
	const reference = useRef<BottomSheetLib>(null);
	const animationConfigs = useMemo(
		() => ({
			duration: 220,
			easing: Easing.out(Easing.cubic),
		}),
		[],
	);
	const computedSnapPoints = useMemo(
		() => snapPoints ?? ['40%', '75%'],
		[snapPoints],
	);

	useEffect(() => {
		if (open) {
			reference.current?.snapToIndex(0);
			return;
		}

		reference.current?.close();
	}, [open]);

	return (
		<BottomSheetLib
			ref={reference}
			index={-1}
			enablePanDownToClose
			snapPoints={computedSnapPoints}
			animationConfigs={animationConfigs}
			onClose={() => onOpenChange(false)}
			backgroundStyle={styles.background}
			handleIndicatorStyle={styles.handle}
		>
			<BottomSheetView style={styles.content}>
				{title ? <Text style={styles.title}>{title}</Text> : null}
				{children}
			</BottomSheetView>
		</BottomSheetLib>
	);
}

const styles = StyleSheet.create({
	background: {
		backgroundColor: uiTokens.color.surface.background,
	},
	handle: {
		backgroundColor: uiTokens.color.surface.border,
	},
	content: {
		gap: 12,
		padding: 16,
	},
	title: {
		fontSize: 16,
		fontWeight: '700',
		color: uiTokens.color.surface.foreground,
	},
});

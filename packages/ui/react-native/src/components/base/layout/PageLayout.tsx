import type { ReactNode } from 'react';
import {
	StyleSheet,
	Text,
	View,
	type StyleProp,
	type ViewStyle,
} from 'react-native';
import { nativeTheme } from '../../../index';

export interface PageLayoutProps {
	title?: ReactNode;
	description?: ReactNode;
	children: ReactNode;
	style?: StyleProp<ViewStyle>;
}

export function PageLayout({
	title,
	description,
	children,
	style,
}: PageLayoutProps) {
	return (
		<View style={[styles.root, style]}>
			{title || description ? (
				<View style={styles.header}>
					{title ? <Text style={styles.title}>{title}</Text> : null}
					{description ? (
						<Text style={styles.description}>{description}</Text>
					) : null}
				</View>
			) : null}
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		gap: 12,
	},
	header: {
		gap: 4,
	},
	title: {
		fontSize: nativeTheme.fontSize.xl,
		fontWeight: '700',
		color: nativeTheme.colors.foreground,
	},
	description: {
		fontSize: nativeTheme.fontSize.sm,
		color: nativeTheme.colors.muted,
	},
});

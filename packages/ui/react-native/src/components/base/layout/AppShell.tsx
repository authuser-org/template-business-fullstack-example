import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

export interface AppShellProps {
	header?: ReactNode;
	navigation?: ReactNode;
	footer?: ReactNode;
	children: ReactNode;
	style?: StyleProp<ViewStyle>;
}

export function AppShell({
	header,
	navigation,
	footer,
	children,
	style,
}: AppShellProps) {
	return (
		<View style={[styles.root, style]}>
			{header ? <View>{header}</View> : null}
			<View style={styles.body}>
				{navigation ? (
					<View style={styles.navigation}>{navigation}</View>
				) : null}
				<View style={styles.content}>{children}</View>
			</View>
			{footer ? <View>{footer}</View> : null}
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	body: {
		flex: 1,
		flexDirection: 'row',
		gap: 12,
		padding: 12,
	},
	navigation: {
		width: 240,
	},
	content: {
		flex: 1,
	},
});

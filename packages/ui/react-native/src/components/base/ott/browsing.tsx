import type { ReactNode } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    type StyleProp,
    type ViewStyle,
} from 'react-native';
import { nativeTheme } from '../../../index';

type BaseProps = {
	title?: ReactNode;
	description?: ReactNode;
	children?: ReactNode;
	style?: StyleProp<ViewStyle>;
};

export type ContentSectionProps = BaseProps & {
	actionLabel?: ReactNode;
	onActionPress?: () => void;
};

export function ContentSection({
	title,
	description,
	actionLabel,
	onActionPress,
	children,
	style,
}: ContentSectionProps) {
	return (
		<View style={[styles.base, style]}>
			{title || actionLabel ? (
				<View style={styles.header}>
					<View style={styles.headerTextWrap}>
						{title ? <Text style={styles.title}>{title}</Text> : null}
						{description ? <Text style={styles.description}>{description}</Text> : null}
					</View>
					{actionLabel ? (
						<Pressable style={styles.action} onPress={onActionPress}>
							<Text style={styles.actionText}>{actionLabel}</Text>
						</Pressable>
					) : null}
				</View>
			) : null}
			{children}
		</View>
	);
}

export type ContentRowProps = BaseProps & {
	items?: ReactNode[];
};

export function ContentRow({ title, description, items, children, style }: ContentRowProps) {
	return (
		<ContentSection title={title} description={description} style={style}>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.rowContent}
			>
				{items?.map((item, index) => (
					<View key={index} style={styles.rowItem}>
						{item}
					</View>
				))}
				{children}
			</ScrollView>
		</ContentSection>
	);
}

export function ContentCarousel(props: ContentRowProps) {
	return <ContentRow {...props} />;
}

export type ContentSliderProps = Omit<BaseProps, 'children'> & {
	value: number;
	onValueChange?: (value: number) => void;
};

export function ContentSlider({
	title,
	description,
	value,
	onValueChange,
	style,
}: ContentSliderProps) {
	return (
		<ContentSection title={title} description={description} style={style}>
			<View style={styles.sliderRow}>
				<TextInput
					value={String(value)}
					onChangeText={(next) => {
						const parsed = Number(next.replace(/[^0-9]/g, ''));
						if (!Number.isNaN(parsed)) {
							onValueChange?.(parsed);
						}
					}}
					keyboardType="numeric"
					style={styles.input}
				/>
				<Text style={styles.description}>0-100</Text>
			</View>
		</ContentSection>
	);
}

export type ContentListProps = BaseProps & {
	items?: ReactNode[];
};

export function ContentList({ title, description, items, children, style }: ContentListProps) {
	return (
		<ContentSection title={title} description={description} style={style}>
			<View style={styles.list}>
				{items?.map((item, index) => (
					<View key={index} style={styles.listItem}>
						{item}
					</View>
				))}
				{children}
			</View>
		</ContentSection>
	);
}

export function ContinueWatchingRow(props: ContentRowProps) {
	return <ContentRow title={props.title ?? 'Continuar viendo'} {...props} />;
}

export function TrendingRow(props: ContentRowProps) {
	return <ContentRow title={props.title ?? 'Tendencias'} {...props} />;
}

export function RecommendedRow(props: ContentRowProps) {
	return <ContentRow title={props.title ?? 'Recomendado para ti'} {...props} />;
}

export function CategoryRow(props: ContentRowProps) {
	return <ContentRow title={props.title ?? 'Categorías'} {...props} />;
}

export function GenreRow(props: ContentRowProps) {
	return <ContentRow title={props.title ?? 'Géneros'} {...props} />;
}

const styles = StyleSheet.create({
	base: {
		borderWidth: 1,
		borderColor: nativeTheme.colors.border,
		backgroundColor: nativeTheme.colors.background,
		borderRadius: nativeTheme.radius.md,
		padding: 12,
		gap: 6,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 8,
	},
	headerTextWrap: {
		flex: 1,
		gap: 2,
	},
	title: {
		fontSize: nativeTheme.fontSize.base,
		fontWeight: '700',
		color: nativeTheme.colors.foreground,
	},
	description: {
		fontSize: nativeTheme.fontSize.sm,
		color: nativeTheme.colors.foreground,
		opacity: 0.75,
	},
	action: {
		borderWidth: 1,
		borderColor: nativeTheme.colors.border,
		borderRadius: nativeTheme.radius.sm,
		paddingHorizontal: 10,
		paddingVertical: 6,
	},
	actionText: {
		fontSize: nativeTheme.fontSize.xs,
		fontWeight: '600',
		color: nativeTheme.colors.foreground,
	},
	rowContent: {
		gap: 8,
	},
	rowItem: {
		minWidth: 180,
		borderWidth: 1,
		borderColor: nativeTheme.colors.border,
		borderRadius: nativeTheme.radius.md,
		padding: 10,
	},
	sliderRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: nativeTheme.colors.border,
		borderRadius: nativeTheme.radius.sm,
		paddingHorizontal: 10,
		paddingVertical: 8,
		color: nativeTheme.colors.foreground,
	},
	list: {
		gap: 8,
	},
	listItem: {
		borderWidth: 1,
		borderColor: nativeTheme.colors.border,
		borderRadius: nativeTheme.radius.sm,
		padding: 10,
	},
});

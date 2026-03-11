import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    type StyleProp,
    type ViewStyle,
} from 'react-native';
import { nativeTheme } from '../../../index';

type BaseProps = {
	title?: ReactNode;
	subtitle?: ReactNode;
	children?: ReactNode;
	style?: StyleProp<ViewStyle>;
};

export type HeroBannerProps = BaseProps & {
	tag?: ReactNode;
	ctaLabel?: ReactNode;
	onCtaPress?: () => void;
};

export function HeroBanner({
	tag,
	title,
	subtitle,
	ctaLabel,
	onCtaPress,
	children,
	style,
}: HeroBannerProps) {
	return (
		<View style={[styles.banner, style]}>
			{tag ? <Text style={styles.kicker}>{tag}</Text> : null}
			{title ? <Text style={styles.title}>{title}</Text> : null}
			{subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
			{children}
			{ctaLabel ? (
				<Pressable style={styles.cta} onPress={onCtaPress}>
					<Text style={styles.ctaText}>{ctaLabel}</Text>
				</Pressable>
			) : null}
		</View>
	);
}

export type HeroSlideProps = BaseProps & {
	tag?: ReactNode;
};

export function HeroSlide({ tag, title, subtitle, children, style }: HeroSlideProps) {
	return (
		<View style={[styles.base, style]}>
			{tag ? <Text style={styles.kicker}>{tag}</Text> : null}
			{title ? <Text style={styles.title}>{title}</Text> : null}
			{subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
			{children}
		</View>
	);
}

export type HeroCarouselItem = {
	id: string;
	title: ReactNode;
	subtitle?: ReactNode;
	tag?: ReactNode;
};

export type HeroCarouselProps = {
	items: HeroCarouselItem[];
	initialIndex?: number;
	onIndexChange?: (index: number) => void;
	style?: StyleProp<ViewStyle>;
};

export function HeroCarousel({
	items,
	initialIndex = 0,
	onIndexChange,
	style,
}: HeroCarouselProps) {
	const safeItems = useMemo(() => (items.length ? items : []), [items]);
	const [index, setIndex] = useState(
		Math.min(Math.max(initialIndex, 0), Math.max(safeItems.length - 1, 0)),
	);

	const active = safeItems[index] ?? safeItems[0];
	if (!active) {
		return null;
	}

	const setSafeIndex = (next: number) => {
		const bounded = Math.min(Math.max(next, 0), Math.max(safeItems.length - 1, 0));
		setIndex(bounded);
		onIndexChange?.(bounded);
	};

	if (!safeItems.length) {
		return (
			<View style={[styles.base, style]}>
				<Text style={styles.subtitle}>No hay slides disponibles.</Text>
			</View>
		);
	}

	return (
		<View style={[styles.carouselRoot, style]}>
			<HeroSlide title={active.title} subtitle={active.subtitle} tag={active.tag} />
			<View style={styles.carouselControls}>
				<Pressable
					style={[styles.navButton, index === 0 && styles.disabled]}
					onPress={() => setSafeIndex(index - 1)}
					disabled={index === 0}
				>
					<Text style={styles.navButtonText}>Anterior</Text>
				</Pressable>
				<Pressable
					style={[styles.navButton, index === safeItems.length - 1 && styles.disabled]}
					onPress={() => setSafeIndex(index + 1)}
					disabled={index === safeItems.length - 1}
				>
					<Text style={styles.navButtonText}>Siguiente</Text>
				</Pressable>
			</View>
		</View>
	);
}

export type FeaturedContentProps = BaseProps & {
	meta?: ReactNode;
};

export function FeaturedContent({
	title,
	subtitle,
	meta,
	children,
	style,
}: FeaturedContentProps) {
	return (
		<View style={[styles.base, style]}>
			{title ? <Text style={styles.title}>{title}</Text> : null}
			{subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
			{meta ? <Text style={styles.meta}>{meta}</Text> : null}
			{children}
		</View>
	);
}

export function FeaturedCard(props: FeaturedContentProps) {
	return <FeaturedContent {...props} />;
}

export type FeaturedCarouselProps = {
	items: Array<{ id: string; title: ReactNode; subtitle?: ReactNode; meta?: ReactNode }>;
	style?: StyleProp<ViewStyle>;
};

export function FeaturedCarousel({ items, style }: FeaturedCarouselProps) {
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={[styles.featuredRow, style]}
		>
			{items.map((item) => (
				<FeaturedCard
					key={item.id}
					title={item.title}
					subtitle={item.subtitle}
					meta={item.meta}
					style={styles.featuredCard}
				/>
			))}
		</ScrollView>
	);
}

export function SpotlightBanner(props: HeroBannerProps) {
	return <HeroBanner tag={props.tag ?? 'Spotlight'} {...props} />;
}

export function PromotionBanner(props: HeroBannerProps) {
	return <HeroBanner tag={props.tag ?? 'Promoción'} {...props} />;
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
	banner: {
		borderWidth: 1,
		borderColor: nativeTheme.colors.border,
		backgroundColor: nativeTheme.colors.background,
		borderRadius: nativeTheme.radius.lg,
		padding: 16,
		gap: 8,
	},
	kicker: {
		fontSize: nativeTheme.fontSize.xs,
		fontWeight: '700',
		color: nativeTheme.colors.brand,
		textTransform: 'uppercase',
	},
	title: {
		fontSize: nativeTheme.fontSize.base,
		fontWeight: '700',
		color: nativeTheme.colors.foreground,
	},
	subtitle: {
		fontSize: nativeTheme.fontSize.sm,
		color: nativeTheme.colors.foreground,
		opacity: 0.8,
	},
	meta: {
		fontSize: nativeTheme.fontSize.xs,
		fontWeight: '600',
		color: nativeTheme.colors.brand,
	},
	cta: {
		alignSelf: 'flex-start',
		borderRadius: nativeTheme.radius.sm,
		backgroundColor: nativeTheme.colors.brand,
		paddingHorizontal: 10,
		paddingVertical: 8,
	},
	ctaText: {
		fontSize: nativeTheme.fontSize.sm,
		fontWeight: '600',
		color: nativeTheme.colors.background,
	},
	carouselRoot: {
		gap: 8,
	},
	carouselControls: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: 8,
	},
	navButton: {
		borderWidth: 1,
		borderColor: nativeTheme.colors.border,
		borderRadius: nativeTheme.radius.sm,
		paddingHorizontal: 10,
		paddingVertical: 6,
	},
	navButtonText: {
		fontSize: nativeTheme.fontSize.sm,
		fontWeight: '600',
		color: nativeTheme.colors.foreground,
	},
	disabled: {
		opacity: 0.5,
	},
	featuredRow: {
		gap: 8,
	},
	featuredCard: {
		width: 220,
	},
});

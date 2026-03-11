import type { ReactNode } from 'react';
import {
    StyleSheet,
    Text,
    View,
    type StyleProp,
    type ViewStyle,
} from 'react-native';
import { nativeTheme } from '../../../index';

type BaseCardProps = {
	title?: ReactNode;
	subtitle?: ReactNode;
	meta?: ReactNode;
	progress?: number;
	children?: ReactNode;
	style?: StyleProp<ViewStyle>;
};

function BaseCard({
	title,
	subtitle,
	meta,
	progress,
	children,
	style,
}: BaseCardProps) {
	return (
		<View style={[styles.base, style]}>
			{title ? <Text style={styles.title}>{title}</Text> : null}
			{subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
			{meta ? <Text style={styles.meta}>{meta}</Text> : null}
			{typeof progress === 'number' ? (
				<View style={styles.progressTrack}>
					<View
						style={[
							styles.progressBar,
							{ width: `${Math.min(Math.max(progress, 0), 100)}%` },
						]}
					/>
				</View>
			) : null}
			{children}
		</View>
	);
}

export type ContentCardProps = BaseCardProps;

export function ContentCard(props: ContentCardProps) {
	return <BaseCard {...props} />;
}

export function ContentPosterCard(props: ContentCardProps) {
	return <BaseCard {...props} style={[styles.poster, props.style]} />;
}

export function ContentLandscapeCard(props: ContentCardProps) {
	return <BaseCard {...props} style={[styles.landscape, props.style]} />;
}

export function ContentSquareCard(props: ContentCardProps) {
	return <BaseCard {...props} style={[styles.square, props.style]} />;
}

export function ContentPreviewCard(props: ContentCardProps) {
	return <BaseCard {...props} style={[styles.preview, props.style]} />;
}

export function EpisodeCard(props: ContentCardProps) {
	return <BaseCard {...props} meta={props.meta ?? 'Episodio'} />;
}

export function SeasonCard(props: ContentCardProps) {
	return <BaseCard {...props} meta={props.meta ?? 'Temporada'} />;
}

export function PlaylistCard(props: ContentCardProps) {
	return <BaseCard {...props} meta={props.meta ?? 'Playlist'} />;
}

export function CollectionCard(props: ContentCardProps) {
	return <BaseCard {...props} meta={props.meta ?? 'Colección'} />;
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
	progressTrack: {
		height: 6,
		borderRadius: 999,
		backgroundColor: nativeTheme.colors.border,
		overflow: 'hidden',
	},
	progressBar: {
		height: 6,
		backgroundColor: nativeTheme.colors.brand,
		borderRadius: 999,
	},
	poster: {
		width: 180,
	},
	landscape: {
		width: 280,
	},
	square: {
		width: 180,
	},
	preview: {
		borderColor: nativeTheme.colors.brand,
	},
});

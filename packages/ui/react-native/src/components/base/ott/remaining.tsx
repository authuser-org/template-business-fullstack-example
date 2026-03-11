import type { ReactNode } from 'react';
import { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Pressable,
	Image,
	type StyleProp,
	type ViewStyle,
} from 'react-native';
import { nativeTheme } from '../../../index';

type BaseProps = {
	title?: ReactNode;
	children?: ReactNode;
	style?: StyleProp<ViewStyle>;
};

// ============================================================================
// CONTENT DETAIL SECTION
// ============================================================================

export type ContentHeaderProps = BaseProps & {
	imageUrl?: string;
	subtitle?: ReactNode;
	badge?: ReactNode;
};

export function ContentHeader({
	title,
	imageUrl,
	subtitle,
	badge,
	children,
	style,
}: ContentHeaderProps) {
	return (
		<View style={[styles.headerContainer, style]}>
			{imageUrl ? (
				<Image source={{ uri: imageUrl }} style={styles.headerImage} />
			) : (
				<View style={styles.headerImagePlaceholder} />
			)}
			<View style={styles.headerContent}>
				{badge ? <Text style={styles.badge}>{badge}</Text> : null}
				{title ? <Text style={styles.headerTitle}>{title}</Text> : null}
				{subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
				{children}
			</View>
		</View>
	);
}

export type ContentMetadataProps = Omit<BaseProps, 'children'> & {
	rating?: ReactNode;
	year?: ReactNode;
	duration?: ReactNode;
	genres?: ReactNode[];
	meta?: Array<{ label: ReactNode; value: ReactNode }>;
};

export function ContentMetadata({
	rating,
	year,
	duration,
	genres,
	meta,
	style,
}: ContentMetadataProps) {
	return (
		<View style={[styles.metadataContainer, style]}>
			<View style={styles.metadataRow}>
				{rating ? (
					<Text style={styles.metadataText}>★ {rating}</Text>
				) : null}
				{year ? <Text style={styles.metadataText}>{year}</Text> : null}
				{duration ? (
					<Text style={styles.metadataText}>{duration}</Text>
				) : null}
			</View>
			{genres && genres.length ? (
				<View style={styles.genresContainer}>
					{genres.map((genre, idx) => (
						<Text key={idx} style={styles.genreTag}>
							{genre}
						</Text>
					))}
				</View>
			) : null}
			{meta && meta.length ? (
				<View style={styles.metaList}>
					{meta.map((item, idx) => (
						<View key={idx} style={styles.metaItem}>
							<Text style={styles.metaLabel}>{item.label}:</Text>
							<Text style={styles.metaValue}>{item.value}</Text>
						</View>
					))}
				</View>
			) : null}
		</View>
	);
}

export type ContentDescriptionProps = BaseProps & {
	expanded?: boolean;
	onToggleExpand?: (expanded: boolean) => void;
};

export function ContentDescription({
	title,
	children,
	expanded,
	onToggleExpand,
	style,
}: ContentDescriptionProps) {
	const [isExpanded, setIsExpanded] = useState(expanded ?? false);

	const handleToggle = () => {
		const next = !isExpanded;
		setIsExpanded(next);
		onToggleExpand?.(next);
	};

	return (
		<View style={[styles.descriptionContainer, style]}>
			{title ? <Text style={styles.descriptionTitle}>{title}</Text> : null}
			<Text
				style={[
					styles.descriptionText,
					!isExpanded && { maxHeight: 60, overflow: 'hidden' },
				]}
				numberOfLines={isExpanded ? undefined : 2}
			>
				{children}
			</Text>
			{children && String(children).length > 150 ? (
				<Pressable onPress={handleToggle}>
					<Text style={styles.toggleButton}>
						{isExpanded ? 'Mostrar menos' : 'Mostrar más'}
					</Text>
				</Pressable>
			) : null}
		</View>
	);
}

export type ContentDetailProps = BaseProps & {
	imageUrl?: string;
	subtitle?: ReactNode;
	rating?: ReactNode;
	year?: ReactNode;
	duration?: ReactNode;
	genres?: ReactNode[];
	description?: ReactNode;
	meta?: Array<{ label: ReactNode; value: ReactNode }>;
	ctaLabel?: ReactNode;
	onCtaClick?: () => void;
};

export function ContentDetail({
	title,
	subtitle,
	imageUrl,
	rating,
	year,
	duration,
	genres,
	description,
	meta,
	ctaLabel = 'Ver ahora',
	onCtaClick,
	children,
	style,
}: ContentDetailProps) {
	return (
		<ScrollView style={[styles.contentDetailContainer, style]}>
			<ContentHeader
				title={title}
				subtitle={subtitle}
				imageUrl={imageUrl}
				badge={rating}
			/>
			<ContentMetadata
				rating={rating}
				year={year}
				duration={duration}
				genres={genres}
				meta={meta}
			/>
			{description ? (
				<ContentDescription title="Sinopsis">{description}</ContentDescription>
			) : null}
			<View style={styles.buttonRow}>
				{ctaLabel ? (
					<Pressable style={styles.ctaButton} onPress={onCtaClick}>
						<Text style={styles.buttonText}>{ctaLabel}</Text>
					</Pressable>
				) : null}
				<Pressable style={styles.secondaryButton}>
					<Text style={styles.secondaryButtonText}>Más opciones</Text>
				</Pressable>
			</View>
			{children}
		</ScrollView>
	);
}

export type ContentTagsProps = BaseProps & {
	tags?: string[];
	onTagClick?: (tag: string) => void;
};

export function ContentTags({ tags, onTagClick, style }: ContentTagsProps) {
	return (
		<View style={[styles.tagsContainer, style]}>
			{tags?.map((tag) => (
				<Pressable
					key={tag}
					style={styles.tagButton}
					onPress={() => onTagClick?.(tag)}
				>
					<Text style={styles.tagText}>{tag}</Text>
				</Pressable>
			))}
		</View>
	);
}

// Placeholder rápido para el resto
function createBlock(displayName: string) {
	function Component({ title, children, style }: BaseProps) {
		return (
			<View style={[styles.blockBase, style]}>
				<Text style={styles.blockKicker}>{displayName}</Text>
				{title ? <Text style={styles.blockTitle}>{title}</Text> : null}
				{children}
			</View>
		);
	}
	Component.displayName = displayName;
	return Component;
}

export const ContentCast = createBlock('ContentCast');
export const ContentCrew = createBlock('ContentCrew');
export const ContentGallery = createBlock('ContentGallery');
export const ContentTrailer = createBlock('ContentTrailer');
export const ContentRecommendations = createBlock('ContentRecommendations');
export const ContentEpisodes = createBlock('ContentEpisodes');
export const ContentSeasons = createBlock('ContentSeasons');

// ============================================================================
// VIDEO PLAYER SECTION
// ============================================================================

export type VideoControlsProps = BaseProps & {
	isPlaying?: boolean;
	onPlayPauseClick?: () => void;
	currentTime?: number;
	duration?: number;
	onSeek?: (time: number) => void;
	volume?: number;
	onVolumeChange?: (vol: number) => void;
};

export function VideoControls({
	isPlaying,
	onPlayPauseClick,
	currentTime = 0,
	duration = 100,
	volume = 75,
	style,
}: VideoControlsProps) {
	return (
		<View style={[styles.controlsContainer, style]}>
			<View style={styles.controlsRow}>
				<Pressable
					style={styles.playPauseButton}
					onPress={onPlayPauseClick}
				>
					<Text style={styles.playPauseText}>
						{isPlaying ? '⏸ Pausa' : '▶ Reproducir'}
					</Text>
				</Pressable>
				<View style={styles.progressInfo}>
					<Text style={styles.timeText}>
						{Math.floor(currentTime)}s / {Math.floor(duration)}s
					</Text>
				</View>
				<Text style={styles.volumeText}>🔊 {volume}%</Text>
			</View>
		</View>
	);
}

export type VideoPlayerProps = BaseProps & {
	isPlaying?: boolean;
	onPlayPauseClick?: () => void;
	currentTime?: number;
	duration?: number;
	onSeek?: (time: number) => void;
	volume?: number;
	onVolumeChange?: (vol: number) => void;
	aspectRatio?: '16/9' | '4/3';
};

export function VideoPlayer({
	title,
	isPlaying = false,
	onPlayPauseClick,
	currentTime = 0,
	duration = 100,
	volume = 75,
	children,
	style,
}: VideoPlayerProps) {
	const [internalPlaying, setInternalPlaying] = useState(isPlaying);

	const handlePlayPause = () => {
		setInternalPlaying(!internalPlaying);
		onPlayPauseClick?.();
	};

	return (
		<View style={[styles.videoPlayerContainer, style]}>
			<View style={styles.videoFrame}>
				<Pressable
					style={styles.playButtonContainer}
					onPress={handlePlayPause}
				>
					<Text style={styles.playButtonIcon}>
						{internalPlaying ? '⏸' : '▶'}
					</Text>
				</Pressable>
				{title ? <Text style={styles.videoTitle}>{title}</Text> : null}
			</View>
			<VideoControls
				isPlaying={internalPlaying}
				onPlayPauseClick={handlePlayPause}
				currentTime={currentTime}
				duration={duration}
				volume={volume}
			/>
			{children}
		</View>
	);
}

export const PlayButton = createBlock('PlayButton');
export const PauseButton = createBlock('PauseButton');
export const SeekBar = createBlock('SeekBar');
export const VolumeControl = createBlock('VolumeControl');
export const PlaybackSpeedSelector = createBlock('PlaybackSpeedSelector');
export const SubtitleSelector = createBlock('SubtitleSelector');
export const AudioTrackSelector = createBlock('AudioTrackSelector');
export const QualitySelector = createBlock('QualitySelector');
export const FullscreenButton = createBlock('FullscreenButton');
export const PictureInPictureButton = createBlock('PictureInPictureButton');
export const NextEpisodeOverlay = createBlock('NextEpisodeOverlay');
export const SkipIntroButton = createBlock('SkipIntroButton');
export const SkipRecapButton = createBlock('SkipRecapButton');

export const PlayerOverlay = createBlock('PlayerOverlay');
export const PlayerTopBar = createBlock('PlayerTopBar');
export const PlayerBottomBar = createBlock('PlayerBottomBar');
export const PlayerLoading = createBlock('PlayerLoading');
export const PlayerError = createBlock('PlayerError');
export const PlayerPreviewThumbnail = createBlock('PlayerPreviewThumbnail');
export const PlayerProgressIndicator = createBlock('PlayerProgressIndicator');
export const AutoplayCountdown = createBlock('AutoplayCountdown');

export const ContinueWatchingCard = createBlock('ContinueWatchingCard');
export const UpNextOverlay = createBlock('UpNextOverlay');
export const EpisodeNavigation = createBlock('EpisodeNavigation');
export const EpisodeSelector = createBlock('EpisodeSelector');
export const SeasonSelector = createBlock('SeasonSelector');
export const WatchHistory = createBlock('WatchHistory');

export const UserAvatar = createBlock('UserAvatar');
export const UserProfileCard = createBlock('UserProfileCard');
export const ProfileSelector = createBlock('ProfileSelector');
export const ProfileManager = createBlock('ProfileManager');
export const AccountSettings = createBlock('AccountSettings');
export const SubscriptionPlan = createBlock('SubscriptionPlan');
export const BillingInformation = createBlock('BillingInformation');
export const DeviceManagement = createBlock('DeviceManagement');
export const ParentalControls = createBlock('ParentalControls');

export const LikeButton = createBlock('LikeButton');
export const FavoriteButton = createBlock('FavoriteButton');
export const WatchlistButton = createBlock('WatchlistButton');
export const ShareButton = createBlock('ShareButton');
export const CommentSection = createBlock('CommentSection');
export const RatingStars = createBlock('RatingStars');
export const ReviewCard = createBlock('ReviewCard');
export const ReactionBar = createBlock('ReactionBar');

export const SearchInput = createBlock('SearchInput');
export const SearchSuggestions = createBlock('SearchSuggestions');
export const SearchFilters = createBlock('SearchFilters');
export const SearchResultsGrid = createBlock('SearchResultsGrid');
export const SearchEmptyState = createBlock('SearchEmptyState');
export const SearchHistory = createBlock('SearchHistory');

export const NotificationBell = createBlock('NotificationBell');
export const NotificationList = createBlock('NotificationList');
export const NotificationItem = createBlock('NotificationItem');
export const SystemAlert = createBlock('SystemAlert');

export const AdPlayer = createBlock('AdPlayer');
export const AdOverlay = createBlock('AdOverlay');
export const AdCountdown = createBlock('AdCountdown');
export const AdBanner = createBlock('AdBanner');
export const AdCompanion = createBlock('AdCompanion');

export const SkeletonCard = createBlock('SkeletonCard');
export const SkeletonRow = createBlock('SkeletonRow');
export const LoadingSpinner = createBlock('LoadingSpinner');
export const EmptyState = createBlock('EmptyState');
export const ErrorState = createBlock('ErrorState');
export const OfflineState = createBlock('OfflineState');

export const LoginForm = createBlock('LoginForm');
export const RegisterForm = createBlock('RegisterForm');
export const AuthModal = createBlock('AuthModal');
export const ForgotPasswordForm = createBlock('ForgotPasswordForm');
export const AccessGate = createBlock('AccessGate');
export const AgeVerificationGate = createBlock('AgeVerificationGate');
export const GeoRestrictionGate = createBlock('GeoRestrictionGate');
export const SubscriptionGate = createBlock('SubscriptionGate');

const styles = StyleSheet.create({
	// Header
	headerContainer: {
		borderWidth: 1,
		borderColor: nativeTheme.colors.border,
		borderRadius: nativeTheme.radius.lg,
		overflow: 'hidden',
		marginBottom: 12,
	},
	headerImage: {
		width: '100%',
		height: 256,
	},
	headerImagePlaceholder: {
		width: '100%',
		height: 256,
		backgroundColor: nativeTheme.colors.muted,
	},
	headerContent: {
		borderTopWidth: 1,
		borderTopColor: nativeTheme.colors.border,
		backgroundColor: nativeTheme.colors.background,
		padding: 16,
		gap: 8,
	},
	badge: {
		fontSize: nativeTheme.fontSize.xs,
		fontWeight: '700',
		color: '#ffffff',
		backgroundColor: nativeTheme.colors.brand,
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: nativeTheme.radius.md,
		alignSelf: 'flex-start',
	},
	headerTitle: {
		fontSize: nativeTheme.fontSize.xl,
		fontWeight: '700',
		color: nativeTheme.colors.foreground,
	},
	subtitle: {
		fontSize: nativeTheme.fontSize.sm,
		color: nativeTheme.colors.muted,
		marginTop: 4,
	},

	// Metadata
	metadataContainer: {
		borderWidth: 1,
		borderColor: nativeTheme.colors.border,
		backgroundColor: nativeTheme.colors.background,
		borderRadius: nativeTheme.radius.md,
		padding: 16,
		gap: 8,
		marginBottom: 12,
	},
	metadataRow: {
		flexDirection: 'row',
		gap: 12,
		alignItems: 'center',
	},
	metadataText: {
		fontSize: nativeTheme.fontSize.sm,
		color: nativeTheme.colors.foreground,
		fontWeight: '600',
	},
	genresContainer: {
		flexDirection: 'row',
		gap: 8,
		flexWrap: 'wrap',
		marginTop: 8,
	},
	genreTag: {
		fontSize: nativeTheme.fontSize.xs,
		borderWidth: 1,
		borderColor: nativeTheme.colors.border,
		color: nativeTheme.colors.muted,
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: nativeTheme.radius.full,
	},
	metaList: {
		marginTop: 8,
		gap: 4,
	},
	metaItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 4,
	},
	metaLabel: {
		fontSize: nativeTheme.fontSize.sm,
		color: nativeTheme.colors.muted,
	},
	metaValue: {
		fontSize: nativeTheme.fontSize.sm,
		fontWeight: '600',
		color: nativeTheme.colors.foreground,
	},

	// Description
	descriptionContainer: {
		borderWidth: 1,
		borderColor: nativeTheme.colors.border,
		backgroundColor: nativeTheme.colors.background,
		borderRadius: nativeTheme.radius.md,
		padding: 16,
		gap: 8,
		marginBottom: 12,
	},
	descriptionTitle: {
		fontSize: nativeTheme.fontSize.base,
		fontWeight: '600',
		color: nativeTheme.colors.foreground,
	},
	descriptionText: {
		fontSize: nativeTheme.fontSize.sm,
		color: nativeTheme.colors.muted,
		lineHeight: 20,
	},
	toggleButton: {
		fontSize: nativeTheme.fontSize.sm,
		fontWeight: '600',
		color: nativeTheme.colors.brand,
		marginTop: 8,
	},

	// Content Detail
	contentDetailContainer: {
		flex: 1,
		gap: 12,
	},
	buttonRow: {
		flexDirection: 'row',
		gap: 8,
		marginBottom: 12,
	},
	ctaButton: {
		flex: 1,
		backgroundColor: nativeTheme.colors.brand,
		paddingVertical: 12,
		borderRadius: nativeTheme.radius.md,
		alignItems: 'center',
	},
	buttonText: {
		fontSize: nativeTheme.fontSize.base,
		fontWeight: '600',
		color: '#ffffff',
	},
	secondaryButton: {
		flex: 1,
		borderWidth: 1,
		borderColor: nativeTheme.colors.border,
		paddingVertical: 12,
		borderRadius: nativeTheme.radius.md,
		alignItems: 'center',
	},
	secondaryButtonText: {
		fontSize: nativeTheme.fontSize.base,
		fontWeight: '600',
		color: nativeTheme.colors.foreground,
	},

	// Tags
	tagsContainer: {
		flexDirection: 'row',
		gap: 8,
		flexWrap: 'wrap',
		marginBottom: 12,
	},
	tagButton: {
		borderWidth: 1,
		borderColor: nativeTheme.colors.border,
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: nativeTheme.radius.full,
	},
	tagText: {
		fontSize: nativeTheme.fontSize.xs,
		fontWeight: '600',
		color: nativeTheme.colors.foreground,
	},

	// Video Player
	videoPlayerContainer: {
		gap: 12,
		marginBottom: 12,
	},
	videoFrame: {
		aspectRatio: 16 / 9,
		backgroundColor: '#000000',
		borderRadius: nativeTheme.radius.md,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: nativeTheme.colors.border,
	},
	playButtonContainer: {
		backgroundColor: nativeTheme.colors.brand,
		borderRadius: 32,
		width: 64,
		height: 64,
		justifyContent: 'center',
		alignItems: 'center',
	},
	playButtonIcon: {
		fontSize: 32,
		color: '#ffffff',
	},
	videoTitle: {
		position: 'absolute',
		bottom: 12,
		fontSize: nativeTheme.fontSize.sm,
		color: '#ffffff',
		opacity: 0.75,
	},

	// Controls
	controlsContainer: {
		borderWidth: 1,
		borderColor: nativeTheme.colors.border,
		backgroundColor: nativeTheme.colors.background,
		borderRadius: nativeTheme.radius.md,
		padding: 12,
	},
	controlsRow: {
		flexDirection: 'row',
		gap: 12,
		alignItems: 'center',
	},
	playPauseButton: {
		backgroundColor: nativeTheme.colors.brand,
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: nativeTheme.radius.md,
	},
	playPauseText: {
		fontSize: nativeTheme.fontSize.sm,
		fontWeight: '600',
		color: '#ffffff',
	},
	progressInfo: {
		flex: 1,
	},
	timeText: {
		fontSize: nativeTheme.fontSize.xs,
		color: nativeTheme.colors.muted,
	},
	volumeText: {
		fontSize: nativeTheme.fontSize.xs,
		color: nativeTheme.colors.foreground,
	},

	// Block base
	blockBase: {
		borderWidth: 1,
		borderColor: nativeTheme.colors.border,
		backgroundColor: nativeTheme.colors.background,
		borderRadius: nativeTheme.radius.md,
		padding: 12,
		gap: 6,
	},
	blockKicker: {
		fontSize: nativeTheme.fontSize.xs,
		fontWeight: '700',
		color: nativeTheme.colors.brand,
		textTransform: 'uppercase',
	},
	blockTitle: {
		fontSize: nativeTheme.fontSize.base,
		fontWeight: '700',
		color: nativeTheme.colors.foreground,
	},
});

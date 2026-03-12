import type { ReactNode } from 'react';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

type BaseProps = {
	title?: ReactNode;
	subtitle?: ReactNode;
	children?: ReactNode;
	style?: any;
};

// ============================================================================
// PLACEHOLDER RÁPIDO PARA COMPONENTES (factory inline)
// ============================================================================

function createBlock(displayName: string) {
	function Component({ title, children, style }: BaseProps) {
		return (
			<View style={[styles.blockContainer, style]}>
				<Text style={styles.blockLabel}>{displayName}</Text>
				{title ? <Text style={styles.blockTitle}>{title}</Text> : null}
				{children}
			</View>
		);
	}
	Component.displayName = displayName;
	return Component;
}

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

// ============================================================================
// USER ACCOUNT SECTION (Fase 4)
// ============================================================================

export type UserAvatarProps = BaseProps & {
	imageUrl?: string;
	initials?: string;
	status?: 'online' | 'offline' | 'idle';
	size?: 'sm' | 'md' | 'lg';
	onPress?: () => void;
};

export function UserAvatar({
	title,
	imageUrl,
	initials = 'U',
	status,
	size = 'md',
	onPress,
	style,
}: UserAvatarProps) {
	const sizeStyle = {
		sm: styles.avatarSmall,
		md: styles.avatarMedium,
		lg: styles.avatarLarge,
	}[size];

	const statusColor = {
		online: '#22c55e',
		offline: '#9ca3af',
		idle: '#eab308',
	}[status || 'offline'];

	return (
		<Pressable
			onPress={onPress}
			style={[styles.userAvatarButton, style]}
		>
			<View style={styles.avatarContainer}>
				{imageUrl ? (
					<Image
						source={{ uri: imageUrl }}
						style={[sizeStyle, { borderRadius: size === 'sm' ? 16 : size === 'md' ? 20 : 28 }]}
					/>
				) : (
					<View style={[sizeStyle, styles.avatarPlaceholder]}>
						<Text style={styles.initials}>{initials}</Text>
					</View>
				)}
				{status ? (
					<View
						style={[
							styles.statusIndicator,
							{ backgroundColor: statusColor },
						]}
					/>
				) : null}
			</View>
			{title ? <Text style={styles.avatarLabel}>{title}</Text> : null}
		</Pressable>
	);
}

export type UserProfileCardProps = BaseProps & {
	imageUrl?: string;
	email?: string;
	tier?: ReactNode;
	joined?: ReactNode;
	onEditPress?: () => void;
};

export function UserProfileCard({
	title,
	imageUrl,
	email,
	tier,
	joined,
	onEditPress,
	style,
}: UserProfileCardProps) {
	return (
		<View style={[styles.profileCardContainer, style]}>
			<View style={styles.profileCardHeader}>
				{imageUrl ? (
					<Image
						source={{ uri: imageUrl }}
						style={styles.profileImage}
					/>
				) : (
					<View style={styles.profileImagePlaceholder}>
						<Text style={styles.profileInitial}>
							{typeof title === 'string' ? title.charAt(0) : 'U'}
						</Text>
					</View>
				)}
				<View style={styles.profileInfo}>
					{title ? (
						<Text style={styles.profileTitle}>{title}</Text>
					) : null}
					{email ? (
						<Text style={styles.profileEmail}>{email}</Text>
					) : null}
				</View>
			</View>
			{tier || joined ? (
				<View style={styles.profileDetails}>
					{tier ? (
						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>Nivel: </Text>
							<Text style={styles.detailValue}>{tier}</Text>
						</View>
					) : null}
					{joined ? (
						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>Miembro: </Text>
							<Text style={styles.detailValue}>{joined}</Text>
						</View>
					) : null}
				</View>
			) : null}
			{onEditPress ? (
				<Pressable
					onPress={onEditPress}
					style={styles.editButton}
				>
					<Text style={styles.editButtonText}>Editar perfil</Text>
				</Pressable>
			) : null}
		</View>
	);
}

export const ProfileSelector = createBlock('ProfileSelector');
export const ProfileManager = createBlock('ProfileManager');
export const AccountSettings = createBlock('AccountSettings');
export const SubscriptionPlan = createBlock('SubscriptionPlan');
export const BillingInformation = createBlock('BillingInformation');
export const DeviceManagement = createBlock('DeviceManagement');
export const ParentalControls = createBlock('ParentalControls');

// ============================================================================
// ENGAGEMENT / SOCIAL SECTION (Fase 4)
// ============================================================================

export type LikeButtonProps = Omit<BaseProps, 'children'> & {
	liked?: boolean;
	count?: number;
	onLikePress?: () => void;
};

export function LikeButton({
	liked = false,
	count = 0,
	onLikePress,
	style,
}: LikeButtonProps) {
	const [isLiked, setIsLiked] = useState(liked);
	const [likeCount, setLikeCount] = useState(count);

	const handleLike = () => {
		const next = !isLiked;
		setIsLiked(next);
		setLikeCount((prev) => prev + (next ? 1 : -1));
		onLikePress?.();
	};

	return (
		<Pressable
			onPress={handleLike}
			style={[
				styles.likeButton,
				isLiked ? styles.likeButtonLiked : styles.likeButtonDefault,
				style,
			]}
		>
			<Text style={styles.likeEmoji}>{isLiked ? '❤️' : '🤍'}</Text>
			{likeCount > 0 ? (
				<Text style={styles.likeCount}>{likeCount}</Text>
			) : null}
		</Pressable>
	);
}

export type FavoriteButtonProps = Omit<BaseProps, 'children'> & {
	favorited?: boolean;
	onFavoritePress?: () => void;
};

export function FavoriteButton({
	favorited = false,
	onFavoritePress,
	style,
}: FavoriteButtonProps) {
	const [isFavorited, setIsFavorited] = useState(favorited);

	const handleFavorite = () => {
		const next = !isFavorited;
		setIsFavorited(next);
		onFavoritePress?.();
	};

	return (
		<Pressable
			onPress={handleFavorite}
			style={[
				styles.favoriteButton,
				isFavorited ? styles.favoriteButtonActive : styles.favoriteButtonDefault,
				style,
			]}
		>
			<Text style={styles.favoriteEmoji}>{isFavorited ? '⭐' : '☆'}</Text>
			<Text style={styles.favoriteLabel}> Favorito</Text>
		</Pressable>
	);
}

export const WatchlistButton = createBlock('WatchlistButton');
export const ShareButton = createBlock('ShareButton');
export const CommentSection = createBlock('CommentSection');
export const RatingStars = createBlock('RatingStars');
export const ReviewCard = createBlock('ReviewCard');
export const ReactionBar = createBlock('ReactionBar');

// ============================================================================
// SEARCH & DISCOVERY SECTION (Fase 4)
// ============================================================================

export type SearchInputProps = BaseProps & {
	placeholder?: string;
	value?: string;
	onChangeText?: (text: string) => void;
	onSubmitEditing?: (text: string) => void;
};

export function SearchInput({
	placeholder = 'Buscar contenido...',
	value: valueProp = '',
	onChangeText,
	onSubmitEditing,
	style,
}: SearchInputProps) {
	const [value, setValue] = useState(valueProp);

	const handleChangeText = (text: string) => {
		setValue(text);
		onChangeText?.(text);
	};

	return (
		<View style={[styles.searchContainer, style]}>
			<Text style={styles.searchIcon}>🔍</Text>
			<Text style={styles.searchPlaceholder}>{placeholder}</Text>
		</View>
	);
}

export const SearchSuggestions = createBlock('SearchSuggestions');
export const SearchFilters = createBlock('SearchFilters');
export const SearchResultsGrid = createBlock('SearchResultsGrid');
export const SearchEmptyState = createBlock('SearchEmptyState');
export const SearchHistory = createBlock('SearchHistory');

// ============================================================================
// NOTIFICATIONS SECTION (Fase 4)
// ============================================================================

export type NotificationBellProps = BaseProps & {
	count?: number;
	onPress?: () => void;
};

export function NotificationBell({
	count = 0,
	onPress,
	style,
}: NotificationBellProps) {
	const [isOpen, setIsOpen] = useState(false);

	const handlePress = () => {
		setIsOpen(!isOpen);
		onPress?.();
	};

	return (
		<Pressable
			onPress={handlePress}
			style={[styles.notificationBell, style]}
		>
			<Text style={styles.bellIcon}>🔔</Text>
			{count > 0 ? (
				<View style={styles.notificationBadge}>
					<Text style={styles.notificationCount}>
						{count > 99 ? '99+' : count}
					</Text>
				</View>
			) : null}
		</Pressable>
	);
}

export type NotificationItemProps = BaseProps & {
	message?: string;
	timestamp?: string;
	read?: boolean;
	onDismiss?: () => void;
};

export function NotificationItem({
	title,
	message,
	timestamp,
	read = false,
	onDismiss,
	style,
}: NotificationItemProps) {
	return (
		<View
			style={[
				styles.notificationItemContainer,
				read ? styles.notificationItemRead : styles.notificationItemUnread,
				style,
			]}
		>
			<View style={styles.notificationContent}>
				{title ? (
					<Text style={styles.notificationTitle}>{title}</Text>
				) : null}
				{message ? (
					<Text style={styles.notificationMessage}>{message}</Text>
				) : null}
				{timestamp ? (
					<Text style={styles.notificationTimestamp}>{timestamp}</Text>
				) : null}
			</View>
			{onDismiss ? (
				<Pressable onPress={onDismiss} style={styles.dismissButton}>
					<Text style={styles.dismissText}>✕</Text>
				</Pressable>
			) : null}
		</View>
	);
}

export const NotificationList = createBlock('NotificationList');
export const SystemAlert = createBlock('SystemAlert');

// ============================================================================
// ADS SECTION (Fase 4)
// ============================================================================

export type AdPlayerProps = BaseProps & {
	duration?: number;
	onSkip?: () => void;
	skipable?: boolean;
};

export function AdPlayer({
	title = 'Anuncio',
	duration = 30,
	onSkip,
	skipable = false,
	style,
}: AdPlayerProps) {
	const [timeRemaining, setTimeRemaining] = useState(duration);

	return (
		<View style={[styles.adPlayerContainer, style]}>
			<Text style={styles.adLabel}>Anuncio {timeRemaining}s</Text>
			<View style={styles.adFrame}>
				<Text style={styles.adText}>📢 {title}</Text>
			</View>
			{skipable && timeRemaining <= 5 ? (
				<Pressable
					onPress={onSkip}
					style={styles.skipAdButton}
				>
					<Text style={styles.skipAdText}>Saltar anuncio</Text>
				</Pressable>
			) : null}
		</View>
	);
}

export const AdOverlay = createBlock('AdOverlay');
export const AdCountdown = createBlock('AdCountdown');
export const AdBanner = createBlock('AdBanner');
export const AdCompanion = createBlock('AdCompanion');

// ============================================================================
// CONTENT DETAIL SECTION (Fase 3 - included for compatibility)
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


const styles = StyleSheet.create({
	blockContainer: {
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#e5e7eb',
		backgroundColor: '#ffffff',
		padding: 12,
	},
	blockLabel: {
		fontSize: 10,
		fontWeight: '600',
		textTransform: 'uppercase',
		color: '#2563eb',
	},
	blockTitle: {
		fontSize: 14,
		fontWeight: '600',
		color: '#1f2937',
		marginTop: 4,
	},
	userAvatarButton: {
		flexDirection: 'column',
		alignItems: 'center',
		gap: 8,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#e5e7eb',
		backgroundColor: '#ffffff',
		padding: 12,
	},
	avatarContainer: {
		position: 'relative',
	},
	avatarSmall: {
		width: 32,
		height: 32,
	},
	avatarMedium: {
		width: 40,
		height: 40,
	},
	avatarLarge: {
		width: 56,
		height: 56,
	},
	avatarPlaceholder: {
		backgroundColor: '#2563eb',
		justifyContent: 'center',
		alignItems: 'center',
	},
	initials: {
		fontSize: 14,
		fontWeight: '600',
		color: '#ffffff',
	},
	statusIndicator: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		width: 12,
		height: 12,
		borderRadius: 6,
		borderWidth: 2,
		borderColor: '#ffffff',
	},
	avatarLabel: {
		fontSize: 12,
		fontWeight: '500',
		color: '#1f2937',
	},
	profileCardContainer: {
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#e5e7eb',
		backgroundColor: '#ffffff',
		padding: 16,
	},
	profileCardHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	profileImage: {
		width: 48,
		height: 48,
		borderRadius: 24,
	},
	profileImagePlaceholder: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: '#2563eb',
		justifyContent: 'center',
		alignItems: 'center',
	},
	profileInitial: {
		fontSize: 14,
		fontWeight: '600',
		color: '#ffffff',
	},
	profileInfo: {
		flex: 1,
	},
	profileTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: '#1f2937',
	},
	profileEmail: {
		fontSize: 12,
		color: '#6b7280',
		marginTop: 2,
	},
	profileDetails: {
		borderTopWidth: 1,
		borderTopColor: '#e5e7eb',
		marginTop: 8,
		paddingTop: 8,
	},
	detailRow: {
		flexDirection: 'row',
		marginBottom: 4,
	},
	detailLabel: {
		fontSize: 12,
		color: '#6b7280',
	},
	detailValue: {
		fontSize: 12,
		fontWeight: '600',
		color: '#2563eb',
	},
	editButton: {
		marginTop: 12,
		paddingVertical: 8,
		paddingHorizontal: 12,
		backgroundColor: '#f3f4f6',
		borderRadius: 6,
		alignItems: 'center',
	},
	editButtonText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#1f2937',
	},
	likeButton: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 6,
		borderWidth: 1,
	},
	likeButtonDefault: {
		borderColor: '#e5e7eb',
		backgroundColor: '#ffffff',
	},
	likeButtonLiked: {
		borderColor: '#2563eb',
		backgroundColor: '#dbeafe',
	},
	likeEmoji: {
		fontSize: 16,
	},
	likeCount: {
		fontSize: 12,
		fontWeight: '600',
	},
	favoriteButton: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 6,
		borderWidth: 1,
	},
	favoriteButtonDefault: {
		borderColor: '#e5e7eb',
		backgroundColor: '#ffffff',
	},
	favoriteButtonActive: {
		borderColor: '#fbbf24',
		backgroundColor: '#fef3c7',
	},
	favoriteEmoji: {
		fontSize: 16,
	},
	favoriteLabel: {
		fontSize: 12,
		fontWeight: '600',
	},
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#e5e7eb',
		backgroundColor: '#ffffff',
		paddingHorizontal: 12,
		paddingVertical: 8,
	},
	searchIcon: {
		fontSize: 16,
		marginRight: 8,
	},
	searchPlaceholder: {
		flex: 1,
		fontSize: 14,
		color: '#9ca3af',
	},
	notificationBell: {
		position: 'relative',
		padding: 8,
	},
	bellIcon: {
		fontSize: 18,
	},
	notificationBadge: {
		position: 'absolute',
		top: -4,
		right: -4,
		backgroundColor: '#2563eb',
		borderRadius: 10,
		minWidth: 20,
		height: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	notificationCount: {
		fontSize: 10,
		fontWeight: '700',
		color: '#ffffff',
	},
	notificationItemContainer: {
		flexDirection: 'row',
		borderRadius: 8,
		borderWidth: 1,
		padding: 12,
		gap: 8,
	},
	notificationItemRead: {
		borderColor: '#e5e7eb',
		backgroundColor: '#ffffff',
	},
	notificationItemUnread: {
		borderColor: '#dbeafe',
		backgroundColor: '#f0f9ff',
	},
	notificationContent: {
		flex: 1,
	},
	notificationTitle: {
		fontSize: 14,
		fontWeight: '600',
		color: '#1f2937',
	},
	notificationMessage: {
		fontSize: 12,
		color: '#6b7280',
		marginTop: 2,
	},
	notificationTimestamp: {
		fontSize: 10,
		color: '#9ca3af',
		marginTop: 4,
	},
	dismissButton: {
		padding: 4,
	},
	dismissText: {
		fontSize: 16,
		color: '#9ca3af',
	},
	adPlayerContainer: {
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#e5e7eb',
		backgroundColor: '#ffffff',
		padding: 16,
		alignItems: 'center',
	},
	adLabel: {
		fontSize: 10,
		fontWeight: '600',
		textTransform: 'uppercase',
		color: '#2563eb',
		marginBottom: 8,
	},
	adFrame: {
		aspectRatio: 16 / 9,
		width: '100%',
		backgroundColor: '#000000',
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 8,
	},
	adText: {
		color: '#ffffff',
		opacity: 0.75,
		fontSize: 14,
	},
	skipAdButton: {
		width: '100%',
		paddingVertical: 8,
		backgroundColor: '#2563eb',
		borderRadius: 6,
		alignItems: 'center',
	},
	skipAdText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#ffffff',
	},
	headerContainer: {
		borderWidth: 1,
		borderColor: '#e5e7eb',
		borderRadius: 8,
		overflow: 'hidden',
		marginBottom: 12,
	},
	headerImage: {
		width: '100%',
		height: 160,
	},
	headerImagePlaceholder: {
		width: '100%',
		height: 160,
		backgroundColor: '#f3f4f6',
	},
	headerContent: {
		borderTopWidth: 1,
		borderTopColor: '#e5e7eb',
		backgroundColor: '#ffffff',
		padding: 12,
		gap: 8,
	},
	badge: {
		fontSize: 10,
		fontWeight: '700',
		color: '#ffffff',
		backgroundColor: '#2563eb',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 4,
		alignSelf: 'flex-start',
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: '700',
		color: '#1f2937',
	},
	subtitle: {
		fontSize: 12,
		color: '#6b7280',
		marginTop: 4,
	},
	metadataContainer: {
		borderWidth: 1,
		borderColor: '#e5e7eb',
		backgroundColor: '#ffffff',
		borderRadius: 8,
		padding: 12,
		gap: 8,
		marginBottom: 12,
	},
	metadataRow: {
		flexDirection: 'row',
		gap: 12,
		alignItems: 'center',
	},
	metadataText: {
		fontSize: 12,
		color: '#1f2937',
		fontWeight: '600',
	},
	genresContainer: {
		flexDirection: 'row',
		gap: 8,
		flexWrap: 'wrap',
		marginTop: 8,
	},
	genreTag: {
		fontSize: 10,
		borderWidth: 1,
		borderColor: '#e5e7eb',
		color: '#6b7280',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
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
		fontSize: 12,
		color: '#6b7280',
	},
	metaValue: {
		fontSize: 12,
		fontWeight: '600',
		color: '#1f2937',
	},
	descriptionContainer: {
		borderWidth: 1,
		borderColor: '#e5e7eb',
		backgroundColor: '#ffffff',
		borderRadius: 8,
		padding: 12,
		gap: 8,
		marginBottom: 12,
	},
	descriptionTitle: {
		fontSize: 14,
		fontWeight: '600',
		color: '#1f2937',
	},
	descriptionText: {
		fontSize: 12,
		color: '#6b7280',
		lineHeight: 20,
	},
	toggleButton: {
		fontSize: 12,
		fontWeight: '600',
		color: '#2563eb',
		marginTop: 8,
	},
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
		backgroundColor: '#2563eb',
		paddingVertical: 12,
		borderRadius: 8,
		alignItems: 'center',
	},
	buttonText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#ffffff',
	},
	secondaryButton: {
		flex: 1,
		borderWidth: 1,
		borderColor: '#e5e7eb',
		paddingVertical: 12,
		borderRadius: 8,
		alignItems: 'center',
	},
	secondaryButtonText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#1f2937',
	},
	tagsContainer: {
		flexDirection: 'row',
		gap: 8,
		flexWrap: 'wrap',
		marginBottom: 12,
	},
	tagButton: {
		borderWidth: 1,
		borderColor: '#e5e7eb',
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 12,
	},
	tagText: {
		fontSize: 10,
		fontWeight: '600',
		color: '#1f2937',
	},
	videoPlayerContainer: {
		gap: 12,
		marginBottom: 12,
	},
	videoFrame: {
		aspectRatio: 16 / 9,
		backgroundColor: '#000000',
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#e5e7eb',
	},
	playButtonContainer: {
		backgroundColor: '#2563eb',
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
		fontSize: 12,
		color: '#ffffff',
		opacity: 0.75,
	},
	controlsContainer: {
		borderWidth: 1,
		borderColor: '#e5e7eb',
		backgroundColor: '#ffffff',
		borderRadius: 8,
		padding: 12,
	},
	controlsRow: {
		flexDirection: 'row',
		gap: 12,
		alignItems: 'center',
	},
	playPauseButton: {
		backgroundColor: '#2563eb',
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 8,
	},
	playPauseText: {
		fontSize: 12,
		fontWeight: '600',
		color: '#ffffff',
	},
	progressInfo: {
		flex: 1,
	},
	timeText: {
		fontSize: 10,
		color: '#6b7280',
	},
	volumeText: {
		fontSize: 10,
		color: '#1f2937',
	},
});

// ============================================================================
// LOADING & STATES SECTION (Fase 5)
// ============================================================================

export type SkeletonCardProps = BaseProps & {
	lines?: number;
};

export function SkeletonCard({ title = 'SkeletonCard', lines = 3, style }: SkeletonCardProps) {
	return (
		<View style={[styles.blockContainer, style]}>
			<Text style={styles.blockLabel}>{title}</Text>
			{Array.from({ length: lines }).map((_, index) => (
				<View
					key={index}
					style={{
						height: 10,
						borderRadius: 4,
						backgroundColor: '#e5e7eb',
						marginTop: 6,
						width: index === lines - 1 ? '70%' : '100%',
					}}
				/>
			))}
		</View>
	);
}

export type SkeletonRowProps = BaseProps & {
	items?: number;
};

export function SkeletonRow({ items = 3, style }: SkeletonRowProps) {
	return (
		<View style={[{ flexDirection: 'row', gap: 8 }, style]}>
			{Array.from({ length: items }).map((_, index) => (
				<View key={index} style={{ flex: 1 }}>
					<SkeletonCard lines={2} />
				</View>
			))}
		</View>
	);
}

export type LoadingSpinnerProps = BaseProps & {
	label?: ReactNode;
};

export function LoadingSpinner({ label = 'Cargando...', style }: LoadingSpinnerProps) {
	return (
		<View style={[styles.blockContainer, { flexDirection: 'row', alignItems: 'center', gap: 8 }, style]}>
			<Text>⏳</Text>
			<Text style={styles.blockTitle}>{label}</Text>
		</View>
	);
}

export type EmptyStateProps = BaseProps & {
	description?: ReactNode;
	actionLabel?: ReactNode;
	onActionPress?: () => void;
};

export function EmptyState({
	title = 'Sin resultados',
	description = 'No hay contenido para mostrar.',
	actionLabel,
	onActionPress,
	style,
}: EmptyStateProps) {
	return (
		<View style={[styles.blockContainer, style]}>
			<Text style={styles.blockTitle}>{title}</Text>
			<Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>{description}</Text>
			{actionLabel ? (
				<Pressable onPress={onActionPress} style={[styles.editButton, { marginTop: 10 }]}> 
					<Text style={styles.editButtonText}>{actionLabel}</Text>
				</Pressable>
			) : null}
		</View>
	);
}

export type ErrorStateProps = BaseProps & {
	description?: ReactNode;
	onRetry?: () => void;
};

export function ErrorState({
	title = 'Ha ocurrido un error',
	description = 'Inténtalo de nuevo en unos segundos.',
	onRetry,
	style,
}: ErrorStateProps) {
	return (
		<View style={[styles.blockContainer, { borderColor: '#fecaca', backgroundColor: '#fef2f2' }, style]}>
			<Text style={[styles.blockTitle, { color: '#b91c1c' }]}>{title}</Text>
			<Text style={{ fontSize: 12, color: '#b91c1c', marginTop: 4 }}>{description}</Text>
			<Pressable onPress={onRetry} style={[styles.editButton, { marginTop: 10 }]}> 
				<Text style={styles.editButtonText}>Reintentar</Text>
			</Pressable>
		</View>
	);
}

export type OfflineStateProps = BaseProps & {
	onReconnect?: () => void;
};

export function OfflineState({ title = 'Sin conexión', subtitle = 'Revisa tu red para continuar.', onReconnect, style }: OfflineStateProps) {
	return (
		<View style={[styles.blockContainer, { borderColor: '#fde68a', backgroundColor: '#fffbeb' }, style]}>
			<Text style={[styles.blockTitle, { color: '#92400e' }]}>{title}</Text>
			{subtitle ? <Text style={{ fontSize: 12, color: '#92400e', marginTop: 4 }}>{subtitle}</Text> : null}
			<Pressable onPress={onReconnect} style={[styles.editButton, { marginTop: 10 }]}> 
				<Text style={styles.editButtonText}>Reconectar</Text>
			</Pressable>
		</View>
	);
}

// ============================================================================
// AUTH / ACCESS SECTION (Fase 5)
// ============================================================================

export type LoginFormProps = BaseProps & {
	onSubmit?: (payload: { email: string; password: string }) => void;
};

export function LoginForm({ title = 'Iniciar sesión', onSubmit, style }: LoginFormProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<View style={[styles.blockContainer, style]}>
			<Text style={styles.blockTitle}>{title}</Text>
			<TextInput value={email} onChangeText={setEmail} placeholder="email@dominio.com" style={{ marginTop: 8, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 8 }} />
			<TextInput value={password} onChangeText={setPassword} secureTextEntry placeholder="••••••••" style={{ marginTop: 8, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 8 }} />
			<Pressable onPress={() => onSubmit?.({ email, password })} style={[styles.editButton, { marginTop: 10 }]}> 
				<Text style={styles.editButtonText}>Entrar</Text>
			</Pressable>
		</View>
	);
}

export type RegisterFormProps = BaseProps & {
	onSubmit?: (payload: { name: string; email: string; password: string }) => void;
};

export function RegisterForm({ title = 'Crear cuenta', onSubmit, style }: RegisterFormProps) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<View style={[styles.blockContainer, style]}>
			<Text style={styles.blockTitle}>{title}</Text>
			<TextInput value={name} onChangeText={setName} placeholder="Nombre" style={{ marginTop: 8, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 8 }} />
			<TextInput value={email} onChangeText={setEmail} placeholder="email@dominio.com" style={{ marginTop: 8, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 8 }} />
			<TextInput value={password} onChangeText={setPassword} secureTextEntry placeholder="Contraseña" style={{ marginTop: 8, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 8 }} />
			<Pressable onPress={() => onSubmit?.({ name, email, password })} style={[styles.editButton, { marginTop: 10 }]}> 
				<Text style={styles.editButtonText}>Registrarme</Text>
			</Pressable>
		</View>
	);
}

export type AuthModalProps = BaseProps & {
	open?: boolean;
	onClose?: () => void;
};

export function AuthModal({ open = false, title = 'Autenticación', children, onClose, style }: AuthModalProps) {
	if (!open) return null;

	return (
		<View style={[{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 12, backgroundColor: '#ffffff' }, style]}>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
				<Text style={styles.blockTitle}>{title}</Text>
				<Pressable onPress={onClose}><Text>✕</Text></Pressable>
			</View>
			{children}
		</View>
	);
}

export type ForgotPasswordFormProps = BaseProps & {
	onSubmit?: (email: string) => void;
};

export function ForgotPasswordForm({ title = 'Recuperar contraseña', onSubmit, style }: ForgotPasswordFormProps) {
	const [email, setEmail] = useState('');

	return (
		<View style={[styles.blockContainer, style]}>
			<Text style={styles.blockTitle}>{title}</Text>
			<TextInput value={email} onChangeText={setEmail} placeholder="email@dominio.com" style={{ marginTop: 8, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 8 }} />
			<Pressable onPress={() => onSubmit?.(email)} style={[styles.editButton, { marginTop: 10 }]}> 
				<Text style={styles.editButtonText}>Enviar enlace</Text>
			</Pressable>
		</View>
	);
}

export type AccessGateProps = BaseProps & {
	allowed?: boolean;
	fallback?: ReactNode;
};

export function AccessGate({ allowed = false, fallback = 'Acceso restringido.', children, style }: AccessGateProps) {
	return <View style={style}>{allowed ? children : <EmptyState title="Acceso denegado" description={fallback} />}</View>;
}

export type AgeVerificationGateProps = BaseProps & {
	minAge?: number;
	currentAge?: number;
};

export function AgeVerificationGate({ minAge = 18, currentAge = 0, children, style }: AgeVerificationGateProps) {
	const allowed = currentAge >= minAge;
	return <View style={style}>{allowed ? children : <EmptyState title="Control de edad" description={`Debes tener al menos ${minAge} años para acceder.`} />}</View>;
}

export type GeoRestrictionGateProps = BaseProps & {
	allowedCountries?: string[];
	country?: string;
};

export function GeoRestrictionGate({ allowedCountries = ['ES'], country = 'ES', children, style }: GeoRestrictionGateProps) {
	const allowed = allowedCountries.includes(country);
	return <View style={style}>{allowed ? children : <EmptyState title="No disponible en tu región" description={`Disponible en: ${allowedCountries.join(', ')}`} />}</View>;
}

export type SubscriptionGateProps = BaseProps & {
	hasSubscription?: boolean;
	onSubscribePress?: () => void;
};

export function SubscriptionGate({ hasSubscription = false, onSubscribePress, children, style }: SubscriptionGateProps) {
	return (
		<View style={style}>
			{hasSubscription ? children : <EmptyState title="Suscripción requerida" description="Necesitas un plan activo para continuar." actionLabel="Ver planes" onActionPress={onSubscribePress} />}
		</View>
	);
}

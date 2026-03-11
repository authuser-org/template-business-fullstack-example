import type { HTMLAttributes, ReactNode } from 'react';
import { useState } from 'react';
import { Button } from '../button';
import { cx } from '../../../index';

type BaseProps = {
	title?: ReactNode;
	subtitle?: ReactNode;
	children?: ReactNode;
	className?: string;
};

// ============================================================================
// CONTENT DETAIL SECTION
// ============================================================================

export type ContentHeaderProps = BaseProps & {
	imageUrl?: string;
	badge?: ReactNode;
};

export function ContentHeader({
	title,
	imageUrl,
	subtitle,
	badge,
	children,
	className,
}: ContentHeaderProps) {
	return (
		<header
			className={cx('rounded-xl border border-surface-border overflow-hidden', className)}
		>
			{imageUrl ? (
				<img
					src={imageUrl}
					alt={typeof title === 'string' ? title : 'Header image'}
					className="h-64 w-full object-cover"
				/>
			) : (
				<div className="h-64 w-full bg-surface-muted" />
			)}
			<div className="relative flex items-start gap-4 border-t border-surface-border bg-surface-background p-4">
				{badge ? (
					<span className="rounded-md bg-brand-600 px-2 py-1 text-xs font-semibold text-white">
						{badge}
					</span>
				) : null}
				<div className="flex-1">
					{title ? <h2 className="text-2xl font-bold text-surface-foreground">{title}</h2> : null}
					{subtitle ? (
						<p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{subtitle}</p>
					) : null}
					{children}
				</div>
			</div>
		</header>
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
	className,
}: ContentMetadataProps) {
	return (
		<div className={cx('rounded-lg border border-surface-border bg-surface-background p-4', className)}>
			<div className="flex flex-wrap items-center gap-4">
				{rating ? (
					<div className="flex items-center gap-2">
						<span className="text-sm font-semibold">★ {rating}</span>
					</div>
				) : null}
				{year ? <span className="text-sm text-zinc-600 dark:text-zinc-400">{year}</span> : null}
				{duration ? <span className="text-sm text-zinc-600 dark:text-zinc-400">{duration}</span> : null}
			</div>
			{genres && genres.length ? (
				<div className="mt-2 flex flex-wrap gap-2">
					{genres.map((genre, idx) => (
						<span
							key={idx}
							className="rounded-full border border-surface-border px-2 py-1 text-xs text-zinc-600 dark:text-zinc-400"
						>
							{genre}
						</span>
					))}
				</div>
			) : null}
			{meta && meta.length ? (
				<div className="mt-3 space-y-1">
					{meta.map((item, idx) => (
						<div key={idx} className="flex justify-between text-sm">
							<span className="text-zinc-600 dark:text-zinc-400">{item.label}:</span>
							<span className="font-medium text-surface-foreground">{item.value}</span>
						</div>
					))}
				</div>
			) : null}
		</div>
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
	className,
}: ContentDescriptionProps) {
	const [isExpanded, setIsExpanded] = useState(expanded ?? false);

	const handleToggle = () => {
		const next = !isExpanded;
		setIsExpanded(next);
		onToggleExpand?.(next);
	};

	return (
		<div className={cx('rounded-lg border border-surface-border bg-surface-background p-4', className)}>
			{title ? <h3 className="mb-2 text-base font-semibold text-surface-foreground">{title}</h3> : null}
			<p className={cx('text-sm text-zinc-600 dark:text-zinc-400', !isExpanded && 'line-clamp-3')}>
				{children}
			</p>
			{children && String(children).length > 150 ? (
				<button
					type="button"
					onClick={handleToggle}
					className="mt-2 text-sm font-medium text-brand-600 hover:underline"
				>
					{isExpanded ? 'Mostrar menos' : 'Mostrar más'}
				</button>
			) : null}
		</div>
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
	className,
}: ContentDetailProps) {
	return (
		<div className={cx('flex flex-col gap-4', className)}>
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
			<div className="flex gap-2">
				{ctaLabel ? (
					<Button onClick={onCtaClick} size="md">
						{ctaLabel}
					</Button>
				) : null}
				<Button variant="secondary" size="md">
					Más opciones
				</Button>
			</div>
			{children}
		</div>
	);
}

export type ContentTagsProps = BaseProps & {
	tags?: string[];
	onTagClick?: (tag: string) => void;
};

export function ContentTags({ tags, onTagClick, className }: ContentTagsProps) {
	return (
		<div className={cx('flex flex-wrap gap-2', className)}>
			{tags?.map((tag) => (
				<button
					key={tag}
					type="button"
					onClick={() => onTagClick?.(tag)}
					className="rounded-full border border-surface-border px-3 py-1 text-xs font-medium hover:bg-surface-muted"
				>
					{tag}
				</button>
			))}
		</div>
	);
}

// Placeholder rápido para el resto
function createBlock(displayName: string) {
	function Component({ title, children, className, ...props }: BaseProps) {
		return (
			<div
				className={cx(
					'rounded-lg border border-surface-border bg-surface-background p-3',
					className,
				)}
				{...props}
			>
				<p className="text-xs font-semibold uppercase text-brand-600">{displayName}</p>
				{title ? (
					<p className="text-sm font-semibold text-surface-foreground">{title}</p>
				) : null}
				{children}
			</div>
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
	onSeek,
	volume = 75,
	onVolumeChange,
	className,
}: VideoControlsProps) {
	return (
		<div
			className={cx(
				'rounded-lg border border-surface-border bg-surface-background p-3',
				className,
			)}
		>
			<div className="flex items-center gap-3">
				<button
					type="button"
					onClick={onPlayPauseClick}
					className="rounded-md bg-brand-600 px-3 py-1 text-sm font-medium text-white hover:opacity-90"
				>
					{isPlaying ? '⏸ Pausa' : '▶ Reproducir'}
				</button>
				<input
					type="range"
					min="0"
					max={duration}
					value={currentTime}
					onChange={(e) => onSeek?.(Number(e.target.value))}
					className="flex-1"
				/>
				<span className="text-xs text-zinc-600 dark:text-zinc-400">
					{Math.floor(currentTime)}s / {Math.floor(duration)}s
				</span>
				<label className="flex items-center gap-1">
					<span className="text-xs">🔊</span>
					<input
						type="range"
						min="0"
						max="100"
						value={volume}
						onChange={(e) => onVolumeChange?.(Number(e.target.value))}
						className="w-16"
					/>
				</label>
			</div>
		</div>
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
	onSeek,
	volume = 75,
	onVolumeChange,
	aspectRatio = '16/9',
	children,
	className,
}: VideoPlayerProps) {
	const [internalPlaying, setInternalPlaying] = useState(isPlaying);

	const handlePlayPause = () => {
		setInternalPlaying(!internalPlaying);
		onPlayPauseClick?.();
	};

	const aspectClass = aspectRatio === '4/3' ? 'aspect-video' : 'aspect-video';

	return (
		<div className={cx('flex flex-col gap-3', className)}>
			<div
				className={cx(
					'flex items-center justify-center overflow-hidden rounded-lg border border-surface-border bg-black',
					aspectClass,
				)}
			>
				<div className="flex flex-col items-center justify-center gap-3">
					<button
						type="button"
						onClick={handlePlayPause}
						className="rounded-full bg-brand-600 p-4 text-3xl text-white hover:opacity-90"
					>
						{internalPlaying ? '⏸' : '▶'}
					</button>
					{title ? (
						<p className="text-sm text-white opacity-75">{title}</p>
					) : null}
				</div>
			</div>
			<VideoControls
				isPlaying={internalPlaying}
				onPlayPauseClick={handlePlayPause}
				currentTime={currentTime}
				duration={duration}
				onSeek={onSeek}
				volume={volume}
				onVolumeChange={onVolumeChange}
			/>
			{children}
		</div>
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

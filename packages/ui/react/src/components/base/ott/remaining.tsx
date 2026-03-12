import type { ReactNode } from 'react';
import { useState } from 'react';
import { cx } from '../../../index';
import { Button } from '../button';

type BaseProps = {
	title?: ReactNode;
	subtitle?: ReactNode;
	children?: ReactNode;
	className?: string;
};

// ============================================================================
// PLACEHOLDER RÁPIDO PARA COMPONENTES (factory inline)
// ============================================================================

function createBlock(displayName: string) {
	function Component({ title, children, className }: BaseProps) {
		return (
			<div
				className={cx(
					'rounded-lg border border-surface-border bg-surface-background p-3',
					className,
				)}
			>
				<p className="text-xs font-semibold uppercase text-brand-600">
					{displayName}
				</p>
				{title ? (
					<p className="text-sm font-semibold text-surface-foreground">
						{title}
					</p>
				) : null}
				{children}
			</div>
		);
	}
	Component.displayName = displayName;
	return Component;
}

// ============================================================================
// USER ACCOUNT SECTION (Fase 4)
// ============================================================================

export type UserAvatarProps = BaseProps & {
	imageUrl?: string;
	initials?: string;
	status?: 'online' | 'offline' | 'idle';
	size?: 'sm' | 'md' | 'lg';
	onClick?: () => void;
};

export function UserAvatar({
	title,
	imageUrl,
	initials = 'U',
	status,
	size = 'md',
	onClick,
	className,
}: UserAvatarProps) {
	const sizeClass = {
		sm: 'w-8 h-8 text-xs',
		md: 'w-10 h-10 text-sm',
		lg: 'w-14 h-14 text-base',
	}[size];

	const statusIndicator = {
		online: 'bg-green-500',
		offline: 'bg-gray-400',
		idle: 'bg-yellow-500',
	}[status || 'offline'];

	return (
		<button
			type="button"
			onClick={onClick}
			className={cx(
				'relative flex flex-col items-center gap-2 rounded-lg border border-surface-border bg-surface-background p-3 hover:opacity-90',
				className,
			)}
		>
			<div className="relative">
				{imageUrl ? (
					<img
						src={imageUrl}
						alt={typeof title === 'string' ? title : 'Avatar'}
						className={cx(sizeClass, 'rounded-full object-cover')}
					/>
				) : (
					<div
						className={cx(
							sizeClass,
							'flex items-center justify-center rounded-full bg-brand-600 font-semibold text-white',
						)}
					>
						{initials}
					</div>
				)}
				{status ? (
					<span
						className={cx(
							'absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white',
							statusIndicator,
						)}
					/>
				) : null}
			</div>
			{title ? (
				<p className="text-xs font-medium text-surface-foreground">{title}</p>
			) : null}
		</button>
	);
}

export type UserProfileCardProps = BaseProps & {
	imageUrl?: string;
	email?: ReactNode;
	tier?: ReactNode;
	joined?: ReactNode;
	onEditClick?: () => void;
};

export function UserProfileCard({
	title,
	imageUrl,
	email,
	tier,
	joined,
	onEditClick,
	className,
}: UserProfileCardProps) {
	return (
		<div
			className={cx(
				'rounded-lg border border-surface-border bg-surface-background p-4 space-y-3',
				className,
			)}
		>
			<div className="flex items-center gap-3">
				{imageUrl ? (
					<img
						src={imageUrl}
						alt={typeof title === 'string' ? title : 'Profile'}
						className="h-12 w-12 rounded-full object-cover"
					/>
				) : (
					<div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
						{title?.toString().charAt(0) || 'U'}
					</div>
				)}
				<div className="flex-1">
					{title ? (
						<p className="font-semibold text-surface-foreground">{title}</p>
					) : null}
					{email ? (
						<p className="text-xs text-zinc-600 dark:text-zinc-400">{email}</p>
					) : null}
				</div>
			</div>
			{tier || joined ? (
				<div className="border-t border-surface-border pt-2 space-y-1 text-sm">
					{tier ? (
						<p>
							<span className="text-zinc-600 dark:text-zinc-400">Nivel:</span>{' '}
							<span className="font-medium text-brand-600">{tier}</span>
						</p>
					) : null}
					{joined ? (
						<p>
							<span className="text-zinc-600 dark:text-zinc-400">
								Miembro desde:
							</span>{' '}
							<span className="font-medium">{joined}</span>
						</p>
					) : null}
				</div>
			) : null}
			{onEditClick ? (
				<Button
					size="sm"
					variant="secondary"
					onClick={onEditClick}
					className="w-full"
				>
					Editar perfil
				</Button>
			) : null}
		</div>
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
	onLikeClick?: () => void;
};

export function LikeButton({
	liked = false,
	count = 0,
	onLikeClick,
	className,
}: LikeButtonProps) {
	const [isLiked, setIsLiked] = useState(liked);
	const [likeCount, setLikeCount] = useState(count);

	const handleLike = () => {
		const next = !isLiked;
		setIsLiked(next);
		setLikeCount((prev) => prev + (next ? 1 : -1));
		onLikeClick?.();
	};

	return (
		<button
			type="button"
			onClick={handleLike}
			className={cx(
				'flex items-center gap-2 rounded-lg border',
				isLiked
					? 'border-brand-600 bg-brand-50 text-brand-600'
					: 'border-surface-border text-zinc-600',
				'px-3 py-2 text-sm font-medium hover:opacity-90',
				className,
			)}
		>
			<span>{isLiked ? '❤️' : '🤍'}</span>
			{likeCount > 0 ? <span className="text-xs">{likeCount}</span> : null}
		</button>
	);
}

export type FavoriteButtonProps = Omit<BaseProps, 'children'> & {
	favorited?: boolean;
	onFavoriteClick?: () => void;
};

export function FavoriteButton({
	favorited = false,
	onFavoriteClick,
	className,
}: FavoriteButtonProps) {
	const [isFavorited, setIsFavorited] = useState(favorited);

	const handleFavorite = () => {
		const next = !isFavorited;
		setIsFavorited(next);
		onFavoriteClick?.();
	};

	return (
		<button
			type="button"
			onClick={handleFavorite}
			className={cx(
				'rounded-lg border px-3 py-2 text-sm font-medium hover:opacity-90',
				isFavorited
					? 'border-yellow-400 bg-yellow-50 text-yellow-600'
					: 'border-surface-border text-zinc-600',
				className,
			)}
		>
			{isFavorited ? '⭐' : '☆'} Favorito
		</button>
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
	onSubmit?: (text: string) => void;
};

export function SearchInput({
	placeholder = 'Buscar contenido...',
	value: valueProp = '',
	onChangeText,
	onSubmit,
	className,
}: SearchInputProps) {
	const [value, setValue] = useState(valueProp);

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const text = e.target.value;
		setValue(text);
		onChangeText?.(text);
	};

	const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === 'Enter') {
			onSubmit?.(value);
		}
	};

	return (
		<div className={cx('relative flex items-center', className)}>
			<input
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
				onKeyPress={handleKeyPress}
				className="w-full rounded-lg border border-surface-border bg-surface-background px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
			/>
			<span className="absolute left-3 text-zinc-400">🔍</span>
		</div>
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
	onClick?: () => void;
};

export function NotificationBell({
	count = 0,
	onClick,
	className,
}: NotificationBellProps) {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen(!isOpen);
		onClick?.();
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className={cx(
				'relative rounded-lg border border-surface-border bg-surface-background p-2 hover:opacity-90',
				className,
			)}
		>
			<span className="text-lg">🔔</span>
			{count > 0 ? (
				<span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
					{count > 99 ? '99+' : count}
				</span>
			) : null}
		</button>
	);
}

export type NotificationItemProps = BaseProps & {
	message?: ReactNode;
	timestamp?: ReactNode;
	read?: boolean;
	onDismiss?: () => void;
};

export function NotificationItem({
	title,
	message,
	timestamp,
	read = false,
	onDismiss,
	className,
}: NotificationItemProps) {
	return (
		<div
			className={cx(
				'rounded-lg border border-surface-border p-3',
				read ? 'bg-surface-background' : 'bg-brand-50',
				className,
			)}
		>
			<div className="flex items-start justify-between gap-2">
				<div className="flex-1">
					{title ? (
						<p className="font-semibold text-surface-foreground">{title}</p>
					) : null}
					{message ? (
						<p className="text-sm text-zinc-600 dark:text-zinc-400">
							{message}
						</p>
					) : null}
					{timestamp ? (
						<p className="mt-1 text-xs text-zinc-500">{timestamp}</p>
					) : null}
				</div>
				{onDismiss ? (
					<button
						type="button"
						onClick={onDismiss}
						className="text-zinc-400 hover:text-zinc-600"
					>
						✕
					</button>
				) : null}
			</div>
		</div>
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
	className,
}: AdPlayerProps) {
	const [timeRemaining, setTimeRemaining] = useState(duration);

	return (
		<div
			className={cx(
				'rounded-lg border border-surface-border bg-surface-background p-4 text-center',
				className,
			)}
		>
			<p className="text-xs font-semibold uppercase text-brand-600 mb-2">
				Anuncio {timeRemaining}s
			</p>
			<div className="aspect-video flex items-center justify-center rounded-lg bg-black mb-2">
				<p className="text-white opacity-75">📢 {title}</p>
			</div>
			{skipable && timeRemaining <= 5 ? (
				<Button size="sm" onClick={onSkip} className="w-full">
					Saltar anuncio
				</Button>
			) : null}
		</div>
	);
}

export const AdOverlay = createBlock('AdOverlay');
export const AdCountdown = createBlock('AdCountdown');
export const AdBanner = createBlock('AdBanner');
export const AdCompanion = createBlock('AdCompanion');

// ============================================================================
// CONTENT DETAIL SECTION (Fase 3 - incluis aquí para compatibilidad)
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
			className={cx(
				'rounded-xl border border-surface-border overflow-hidden',
				className,
			)}
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
					{title ? (
						<h2 className="text-2xl font-bold text-surface-foreground">
							{title}
						</h2>
					) : null}
					{subtitle ? (
						<p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
							{subtitle}
						</p>
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
		<div
			className={cx(
				'rounded-lg border border-surface-border bg-surface-background p-4',
				className,
			)}
		>
			<div className="flex flex-wrap items-center gap-4">
				{rating ? (
					<div className="flex items-center gap-2">
						<span className="text-sm font-semibold">★ {rating}</span>
					</div>
				) : null}
				{year ? (
					<span className="text-sm text-zinc-600 dark:text-zinc-400">
						{year}
					</span>
				) : null}
				{duration ? (
					<span className="text-sm text-zinc-600 dark:text-zinc-400">
						{duration}
					</span>
				) : null}
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
							<span className="text-zinc-600 dark:text-zinc-400">
								{item.label}:
							</span>
							<span className="font-medium text-surface-foreground">
								{item.value}
							</span>
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
		<div
			className={cx(
				'rounded-lg border border-surface-border bg-surface-background p-4',
				className,
			)}
		>
			{title ? (
				<h3 className="mb-2 text-base font-semibold text-surface-foreground">
					{title}
				</h3>
			) : null}
			<p
				className={cx(
					'text-sm text-zinc-600 dark:text-zinc-400',
					!isExpanded && 'line-clamp-3',
				)}
			>
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

export const PlayerOverlay = createBlock('PlayerOverlay');

// ============================================================================
// LOADING & STATES SECTION (Fase 5)
// ============================================================================

export type SkeletonCardProps = BaseProps & {
	lines?: number;
	animated?: boolean;
};

export function SkeletonCard({
	lines = 3,
	animated = true,
	className,
}: SkeletonCardProps) {
	return (
		<div
			className={cx(
				'rounded-lg border border-surface-border bg-surface-background p-4',
				animated && 'animate-pulse',
				className,
			)}
		>
			<div className="mb-3 h-4 w-1/2 rounded bg-surface-muted" />
			<div className="space-y-2">
				{Array.from({ length: lines }).map((_, index) => (
					<div
						key={index}
						className={cx(
							'h-3 rounded bg-surface-muted',
							index === lines - 1 ? 'w-2/3' : 'w-full',
						)}
					/>
				))}
			</div>
		</div>
	);
}

export type SkeletonRowProps = BaseProps & {
	items?: number;
};

export function SkeletonRow({ items = 4, className }: SkeletonRowProps) {
	return (
		<div className={cx('grid grid-cols-2 gap-3 md:grid-cols-4', className)}>
			{Array.from({ length: items }).map((_, index) => (
				<SkeletonCard key={index} lines={2} />
			))}
		</div>
	);
}

export type LoadingSpinnerProps = BaseProps & {
	label?: ReactNode;
	size?: 'sm' | 'md' | 'lg';
};

export function LoadingSpinner({
	label = 'Cargando...',
	size = 'md',
	className,
}: LoadingSpinnerProps) {
	const sizeClass = {
		sm: 'h-4 w-4 border-2',
		md: 'h-6 w-6 border-2',
		lg: 'h-8 w-8 border-3',
	}[size];

	return (
		<div
			className={cx(
				'flex items-center gap-2 rounded-lg border border-surface-border bg-surface-background p-3',
				className,
			)}
		>
			<span
				className={cx(
					'inline-block animate-spin rounded-full border-brand-600 border-t-transparent',
					sizeClass,
				)}
			/>
			<p className="text-sm text-surface-foreground">{label}</p>
		</div>
	);
}

export type EmptyStateProps = BaseProps & {
	description?: ReactNode;
	actionLabel?: ReactNode;
	onActionClick?: () => void;
};

export function EmptyState({
	title = 'Sin resultados',
	description = 'No hay elementos para mostrar en este momento.',
	actionLabel,
	onActionClick,
	className,
}: EmptyStateProps) {
	return (
		<div
			className={cx(
				'rounded-lg border border-dashed border-surface-border bg-surface-background p-4 text-center',
				className,
			)}
		>
			<p className="text-base font-semibold text-surface-foreground">{title}</p>
			<p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
				{description}
			</p>
			{actionLabel ? (
				<Button size="sm" className="mt-3" onClick={onActionClick}>
					{actionLabel}
				</Button>
			) : null}
		</div>
	);
}

export type ErrorStateProps = BaseProps & {
	description?: ReactNode;
	retryLabel?: ReactNode;
	onRetry?: () => void;
};

export function ErrorState({
	title = 'Ha ocurrido un error',
	description = 'Inténtalo de nuevo en unos segundos.',
	retryLabel = 'Reintentar',
	onRetry,
	className,
}: ErrorStateProps) {
	return (
		<div
			className={cx(
				'rounded-lg border border-red-200 bg-red-50 p-4',
				className,
			)}
		>
			<p className="text-base font-semibold text-red-700">{title}</p>
			<p className="mt-1 text-sm text-red-600">{description}</p>
			<Button size="sm" variant="secondary" className="mt-3" onClick={onRetry}>
				{retryLabel}
			</Button>
		</div>
	);
}

export type OfflineStateProps = BaseProps & {
	onReconnect?: () => void;
};

export function OfflineState({
	title = 'Sin conexión',
	subtitle = 'Revisa tu red para continuar.',
	onReconnect,
	className,
}: OfflineStateProps) {
	return (
		<div
			className={cx(
				'rounded-lg border border-amber-200 bg-amber-50 p-4',
				className,
			)}
		>
			<p className="text-base font-semibold text-amber-800">{title}</p>
			{subtitle ? (
				<p className="mt-1 text-sm text-amber-700">{subtitle}</p>
			) : null}
			<Button size="sm" className="mt-3" onClick={onReconnect}>
				Reconectar
			</Button>
		</div>
	);
}

// ============================================================================
// AUTH / ACCESS SECTION (Fase 5)
// ============================================================================

export type LoginFormProps = BaseProps & {
	onSubmit?: (payload: { email: string; password: string }) => void;
	submitLabel?: ReactNode;
};

export function LoginForm({
	title = 'Iniciar sesión',
	onSubmit,
	submitLabel = 'Entrar',
	className,
}: LoginFormProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<form
			className={cx(
				'space-y-3 rounded-lg border border-surface-border bg-surface-background p-4',
				className,
			)}
			onSubmit={(event) => {
				event.preventDefault();
				onSubmit?.({ email, password });
			}}
		>
			<p className="text-base font-semibold text-surface-foreground">{title}</p>
			<input
				value={email}
				onChange={(event) => setEmail(event.currentTarget.value)}
				type="email"
				placeholder="email@dominio.com"
				className="w-full rounded-md border border-surface-border bg-surface-background px-3 py-2 text-sm"
			/>
			<input
				value={password}
				onChange={(event) => setPassword(event.currentTarget.value)}
				type="password"
				placeholder="••••••••"
				className="w-full rounded-md border border-surface-border bg-surface-background px-3 py-2 text-sm"
			/>
			<Button size="sm" type="submit" className="w-full">
				{submitLabel}
			</Button>
		</form>
	);
}

export type RegisterFormProps = BaseProps & {
	onSubmit?: (payload: {
		name: string;
		email: string;
		password: string;
	}) => void;
};

export function RegisterForm({
	title = 'Crear cuenta',
	onSubmit,
	className,
}: RegisterFormProps) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<form
			className={cx(
				'space-y-3 rounded-lg border border-surface-border bg-surface-background p-4',
				className,
			)}
			onSubmit={(event) => {
				event.preventDefault();
				onSubmit?.({ name, email, password });
			}}
		>
			<p className="text-base font-semibold text-surface-foreground">{title}</p>
			<input
				value={name}
				onChange={(event) => setName(event.currentTarget.value)}
				type="text"
				placeholder="Nombre"
				className="w-full rounded-md border border-surface-border bg-surface-background px-3 py-2 text-sm"
			/>
			<input
				value={email}
				onChange={(event) => setEmail(event.currentTarget.value)}
				type="email"
				placeholder="email@dominio.com"
				className="w-full rounded-md border border-surface-border bg-surface-background px-3 py-2 text-sm"
			/>
			<input
				value={password}
				onChange={(event) => setPassword(event.currentTarget.value)}
				type="password"
				placeholder="Contraseña"
				className="w-full rounded-md border border-surface-border bg-surface-background px-3 py-2 text-sm"
			/>
			<Button size="sm" type="submit" className="w-full">
				Registrarme
			</Button>
		</form>
	);
}

export type AuthModalProps = BaseProps & {
	open?: boolean;
	onClose?: () => void;
};

export function AuthModal({
	open = false,
	title = 'Autenticación',
	children,
	onClose,
	className,
}: AuthModalProps) {
	if (!open) return null;

	return (
		<div
			className={cx(
				'fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4',
				className,
			)}
		>
			<div className="w-full max-w-md rounded-lg border border-surface-border bg-surface-background p-4">
				<div className="mb-3 flex items-center justify-between">
					<p className="text-base font-semibold text-surface-foreground">
						{title}
					</p>
					<button
						type="button"
						onClick={onClose}
						className="text-sm text-zinc-500"
					>
						✕
					</button>
				</div>
				{children}
			</div>
		</div>
	);
}

export type ForgotPasswordFormProps = BaseProps & {
	onSubmit?: (email: string) => void;
};

export function ForgotPasswordForm({
	title = 'Recuperar contraseña',
	onSubmit,
	className,
}: ForgotPasswordFormProps) {
	const [email, setEmail] = useState('');

	return (
		<form
			className={cx(
				'space-y-3 rounded-lg border border-surface-border bg-surface-background p-4',
				className,
			)}
			onSubmit={(event) => {
				event.preventDefault();
				onSubmit?.(email);
			}}
		>
			<p className="text-base font-semibold text-surface-foreground">{title}</p>
			<input
				value={email}
				onChange={(event) => setEmail(event.currentTarget.value)}
				type="email"
				placeholder="email@dominio.com"
				className="w-full rounded-md border border-surface-border bg-surface-background px-3 py-2 text-sm"
			/>
			<Button size="sm" type="submit" className="w-full">
				Enviar enlace
			</Button>
		</form>
	);
}

export type AccessGateProps = BaseProps & {
	allowed?: boolean;
	fallback?: ReactNode;
};

export function AccessGate({
	allowed = false,
	fallback = 'Acceso restringido.',
	children,
	className,
}: AccessGateProps) {
	return (
		<div className={className}>
			{allowed ? (
				children
			) : (
				<EmptyState title="Acceso denegado" description={fallback} />
			)}
		</div>
	);
}

export type AgeVerificationGateProps = BaseProps & {
	minAge?: number;
	currentAge?: number;
};

export function AgeVerificationGate({
	minAge = 18,
	currentAge = 0,
	children,
	className,
}: AgeVerificationGateProps) {
	const allowed = currentAge >= minAge;
	return (
		<div className={className}>
			{allowed ? (
				children
			) : (
				<EmptyState
					title="Control de edad"
					description={`Debes tener al menos ${minAge} años para acceder.`}
				/>
			)}
		</div>
	);
}

export type GeoRestrictionGateProps = BaseProps & {
	allowedCountries?: string[];
	country?: string;
};

export function GeoRestrictionGate({
	allowedCountries = ['ES'],
	country = 'ES',
	children,
	className,
}: GeoRestrictionGateProps) {
	const allowed = allowedCountries.includes(country);
	return (
		<div className={className}>
			{allowed ? (
				children
			) : (
				<EmptyState
					title="No disponible en tu región"
					description={`Disponible en: ${allowedCountries.join(', ')}`}
				/>
			)}
		</div>
	);
}

export type SubscriptionGateProps = BaseProps & {
	hasSubscription?: boolean;
	onSubscribeClick?: () => void;
};

export function SubscriptionGate({
	hasSubscription = false,
	onSubscribeClick,
	children,
	className,
}: SubscriptionGateProps) {
	return (
		<div className={className}>
			{hasSubscription ? (
				children
			) : (
				<EmptyState
					title="Suscripción requerida"
					description="Necesitas un plan activo para continuar."
					actionLabel="Ver planes"
					onActionClick={onSubscribeClick}
				/>
			)}
		</div>
	);
}

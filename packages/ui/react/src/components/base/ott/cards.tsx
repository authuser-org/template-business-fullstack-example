import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../../index';

type BaseCardProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
	title?: ReactNode;
	subtitle?: ReactNode;
	meta?: ReactNode;
	imageUrl?: string;
	progress?: number;
	children?: ReactNode;
};

function BaseCard({
	title,
	subtitle,
	meta,
	imageUrl,
	progress,
	children,
	className,
	...props
}: BaseCardProps) {
	return (
		<article
			className={cx('overflow-hidden rounded-lg border border-surface-border bg-surface-background shadow-sm', className)}
			{...props}
		>
			{imageUrl ? (
				<img
					src={imageUrl}
					alt={typeof title === 'string' ? title : 'Content image'}
					className="h-36 w-full object-cover"
				/>
			) : null}
			<div className="flex flex-col gap-1 p-3">
				{title ? <h4 className="text-sm font-semibold text-surface-foreground">{title}</h4> : null}
				{subtitle ? <p className="text-xs text-zinc-600 dark:text-zinc-400">{subtitle}</p> : null}
				{meta ? <p className="text-xs text-brand-600">{meta}</p> : null}
				{typeof progress === 'number' ? (
					<div className="mt-1 h-1.5 w-full rounded-full bg-surface-border">
						<div
							className="h-1.5 rounded-full bg-brand-600"
							style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
						/>
					</div>
				) : null}
				{children}
			</div>
		</article>
	);
}

export type ContentCardProps = BaseCardProps;

export function ContentCard(props: ContentCardProps) {
	return <BaseCard {...props} />;
}

export function ContentPosterCard(props: ContentCardProps) {
	return <BaseCard {...props} className={cx('w-44', props.className)} />;
}

export function ContentLandscapeCard(props: ContentCardProps) {
	return <BaseCard {...props} className={cx('w-72', props.className)} />;
}

export function ContentSquareCard(props: ContentCardProps) {
	return <BaseCard {...props} className={cx('w-44', props.className)} />;
}

export function ContentPreviewCard(props: ContentCardProps) {
	return <BaseCard {...props} className={cx('ring-1 ring-brand-500/40', props.className)} />;
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

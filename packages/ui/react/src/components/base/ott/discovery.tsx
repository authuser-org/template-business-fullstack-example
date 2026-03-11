import type { HTMLAttributes, ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { cx } from '../../../index';

type BaseProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
	title?: ReactNode;
	subtitle?: ReactNode;
	children?: ReactNode;
};

export type HeroBannerProps = BaseProps & {
	tag?: ReactNode;
	backgroundImageUrl?: string;
	ctaLabel?: ReactNode;
	onCtaClick?: () => void;
};

export function HeroBanner({
	tag,
	title,
	subtitle,
	backgroundImageUrl,
	ctaLabel,
	onCtaClick,
	children,
	className,
	...props
}: HeroBannerProps) {
	return (
		<section
			className={cx(
				'relative overflow-hidden rounded-xl border border-surface-border bg-surface-background p-6',
				className,
			)}
			{...props}
		>
			{backgroundImageUrl ? (
				<div
					className="absolute inset-0 opacity-25"
					style={{
						backgroundImage: `url(${backgroundImageUrl})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				/>
			) : null}
			<div className="relative flex flex-col gap-2">
				{tag ? (
					<span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
						{tag}
					</span>
				) : null}
				{title ? (
					<h3 className="text-xl font-semibold text-surface-foreground">{title}</h3>
				) : null}
				{subtitle ? (
					<p className="text-sm text-zinc-600 dark:text-zinc-400">{subtitle}</p>
				) : null}
				{children}
				{ctaLabel ? (
					<div>
						<button
							type="button"
							onClick={onCtaClick}
							className="rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
						>
							{ctaLabel}
						</button>
					</div>
				) : null}
			</div>
		</section>
	);
}

export type HeroSlideProps = BaseProps & {
	imageUrl?: string;
	tag?: ReactNode;
};

export function HeroSlide({
	imageUrl,
	tag,
	title,
	subtitle,
	children,
	className,
	...props
}: HeroSlideProps) {
	return (
		<article
			className={cx(
				'relative overflow-hidden rounded-xl border border-surface-border bg-surface-background p-5',
				className,
			)}
			{...props}
		>
			{imageUrl ? (
				<img
					src={imageUrl}
					alt={typeof title === 'string' ? title : 'Hero'}
					className="absolute inset-0 h-full w-full object-cover opacity-25"
				/>
			) : null}
			<div className="relative flex flex-col gap-2">
				{tag ? (
					<span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
						{tag}
					</span>
				) : null}
				{title ? <h4 className="text-lg font-semibold">{title}</h4> : null}
				{subtitle ? (
					<p className="text-sm text-zinc-600 dark:text-zinc-400">{subtitle}</p>
				) : null}
				{children}
			</div>
		</article>
	);
}

export type HeroCarouselItem = {
	id: string;
	title: ReactNode;
	subtitle?: ReactNode;
	tag?: ReactNode;
	imageUrl?: string;
};

export type HeroCarouselProps = Omit<BaseProps, 'title' | 'subtitle' | 'children'> & {
	items: HeroCarouselItem[];
	initialIndex?: number;
	onIndexChange?: (index: number) => void;
};

export function HeroCarousel({
	items,
	initialIndex = 0,
	onIndexChange,
	className,
	...props
}: HeroCarouselProps) {
	const safeItems = useMemo(() => (items.length ? items : []), [items]);
	const [index, setIndex] = useState(
		Math.min(Math.max(initialIndex, 0), Math.max(safeItems.length - 1, 0)),
	);

	const active = safeItems[index] ?? safeItems[0];
	if (!active) {
		return null;
	}

	const setSafeIndex = (nextIndex: number) => {
		const bounded = Math.min(Math.max(nextIndex, 0), Math.max(safeItems.length - 1, 0));
		setIndex(bounded);
		onIndexChange?.(bounded);
	};

	if (!safeItems.length) {
		return (
			<div
				className={cx('rounded-xl border border-dashed border-surface-border p-4', className)}
				{...props}
			>
				<p className="text-sm text-zinc-600 dark:text-zinc-400">
					No hay slides disponibles.
				</p>
			</div>
		);
	}

	return (
		<div className={cx('flex flex-col gap-3', className)} {...props}>
			<HeroSlide
				title={active.title}
				subtitle={active.subtitle}
				tag={active.tag}
				imageUrl={active.imageUrl}
			/>
			<div className="flex items-center justify-between">
				<div className="flex gap-1">
					{safeItems.map((item, bulletIndex) => (
						<button
							type="button"
							key={item.id}
							onClick={() => setSafeIndex(bulletIndex)}
							className={cx(
								'h-2 w-6 rounded-full transition-colors',
								bulletIndex === index ? 'bg-brand-600' : 'bg-surface-border',
							)}
							aria-label={`Ir al slide ${bulletIndex + 1}`}
						/>
					))}
				</div>
				<div className="flex gap-2">
					<button
						type="button"
						onClick={() => setSafeIndex(index - 1)}
						className="rounded-md border border-surface-border px-2 py-1 text-sm"
						disabled={index === 0}
					>
						Anterior
					</button>
					<button
						type="button"
						onClick={() => setSafeIndex(index + 1)}
						className="rounded-md border border-surface-border px-2 py-1 text-sm"
						disabled={index === safeItems.length - 1}
					>
						Siguiente
					</button>
				</div>
			</div>
		</div>
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
	className,
	...props
}: FeaturedContentProps) {
	return (
		<div
			className={cx('rounded-lg border border-surface-border bg-surface-background p-4', className)}
			{...props}
		>
			{title ? <h4 className="text-base font-semibold">{title}</h4> : null}
			{subtitle ? <p className="text-sm text-zinc-600 dark:text-zinc-400">{subtitle}</p> : null}
			{meta ? <p className="text-xs text-brand-600">{meta}</p> : null}
			{children}
		</div>
	);
}

export type FeaturedCardProps = FeaturedContentProps;

export function FeaturedCard(props: FeaturedCardProps) {
	return <FeaturedContent {...props} className={cx('shadow-sm', props.className)} />;
}

export type FeaturedCarouselProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
	items: Array<{ id: string; title: ReactNode; subtitle?: ReactNode; meta?: ReactNode }>;
};

export function FeaturedCarousel({ items, className, ...props }: FeaturedCarouselProps) {
	return (
		<div className={cx('flex gap-3 overflow-x-auto pb-1', className)} {...props}>
			{items.map((item) => (
				<FeaturedCard
					key={item.id}
					title={item.title}
					subtitle={item.subtitle}
					meta={item.meta}
					className="min-w-56"
				/>
			))}
		</div>
	);
}

export function SpotlightBanner(props: HeroBannerProps) {
	return <HeroBanner tag={props.tag ?? 'Spotlight'} {...props} />;
}

export function PromotionBanner(props: HeroBannerProps) {
	return <HeroBanner tag={props.tag ?? 'Promoción'} {...props} />;
}

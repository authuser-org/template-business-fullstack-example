import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../../index';

type BaseProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
	title?: ReactNode;
	description?: ReactNode;
	children?: ReactNode;
};

export type ContentSectionProps = BaseProps & {
	actionLabel?: ReactNode;
	onActionClick?: () => void;
};

export function ContentSection({
	title,
	description,
	actionLabel,
	onActionClick,
	children,
	className,
	...props
}: ContentSectionProps) {
	return (
		<section
			className={cx('rounded-xl border border-surface-border bg-surface-background p-4', className)}
			{...props}
		>
			{title || actionLabel ? (
				<header className="mb-3 flex items-center justify-between gap-3">
					<div>
						{title ? <h4 className="text-base font-semibold">{title}</h4> : null}
						{description ? (
							<p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
						) : null}
					</div>
					{actionLabel ? (
						<button
							type="button"
							onClick={onActionClick}
							className="rounded-md border border-surface-border px-2 py-1 text-xs font-medium"
						>
							{actionLabel}
						</button>
					) : null}
				</header>
			) : null}
			{children}
		</section>
	);
}

export type ContentRowProps = BaseProps & {
	items?: ReactNode[];
	itemClassName?: string;
};

export function ContentRow({
	title,
	description,
	items,
	itemClassName,
	children,
	className,
	...props
}: ContentRowProps) {
	const content =
		items && items.length
			? items.map((item, index) => (
					<div
						key={index}
						className={cx('min-w-48 rounded-lg border border-surface-border p-3', itemClassName)}
					>
						{item}
					</div>
				))
			: children;

	return (
		<ContentSection title={title} description={description} className={className} {...props}>
			<div className="flex gap-3 overflow-x-auto pb-1">{content}</div>
		</ContentSection>
	);
}

export function ContentCarousel(props: ContentRowProps) {
	return <ContentRow {...props} className={cx('snap-x snap-mandatory', props.className)} />;
}

export type ContentGridProps = BaseProps & {
	minItemWidth?: number;
	columns?: number;
};

export function ContentGrid({
	title,
	description,
	minItemWidth = 180,
	columns,
	children,
	className,
	...props
}: ContentGridProps) {
	return (
		<ContentSection title={title} description={description} className={className} {...props}>
			<div
				className="grid gap-3"
				style={{
					gridTemplateColumns: columns
						? `repeat(${columns}, minmax(0, 1fr))`
						: `repeat(auto-fill, minmax(${minItemWidth}px, 1fr))`,
				}}
			>
				{children}
			</div>
		</ContentSection>
	);
}

export type ContentSliderProps = Omit<BaseProps, 'children'> & {
	value: number;
	min?: number;
	max?: number;
	step?: number;
	onValueChange?: (value: number) => void;
};

export function ContentSlider({
	title,
	description,
	value,
	min = 0,
	max = 100,
	step = 1,
	onValueChange,
	className,
	...props
}: ContentSliderProps) {
	return (
		<ContentSection title={title} description={description} className={className} {...props}>
			<div className="flex items-center gap-3">
				<input
					type="range"
					value={value}
					min={min}
					max={max}
					step={step}
					onChange={(event) => onValueChange?.(Number(event.target.value))}
					className="w-full"
				/>
				<span className="w-10 text-right text-sm text-zinc-600 dark:text-zinc-400">
					{value}
				</span>
			</div>
		</ContentSection>
	);
}

export type ContentListProps = BaseProps & {
	items?: ReactNode[];
};

export function ContentList({
	title,
	description,
	items,
	children,
	className,
	...props
}: ContentListProps) {
	return (
		<ContentSection title={title} description={description} className={className} {...props}>
			<ul className="flex list-none flex-col gap-2 p-0">
				{items?.map((item, index) => (
					<li key={index} className="rounded-md border border-surface-border p-3">
						{item}
					</li>
				))}
				{children}
			</ul>
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

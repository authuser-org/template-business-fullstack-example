'use client';

import { Heart, Info, Play } from 'lucide-react';
import type { MouseEventHandler, ReactNode } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Modal } from '../../modal';

export interface RowHeroCTA {
	label: string;
	href?: string;
	target?: '_self' | '_blank' | '_parent' | '_top';
	rel?: string;
	onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

export interface RowHeroResult {
	team1: string;
	team2: string;
	score: string;
}

export interface RowHeroItem {
	id: string | number;
	title: string;
	image: string;
	subtitle?: string;
	description?: string;
	badge?: string;
	isLive?: boolean;
	currentTime?: string;
	result?: RowHeroResult;
	meta?: string[];
	ctaPrimary?: RowHeroCTA;
	ctaSecondary?: RowHeroCTA;
	video?: string;
}

export interface RowHeroCarouselProps {
	items: RowHeroItem[];
	className?: string;
	title?: string;
	autoPlay?: boolean;
	intervalMs?: number;
	showArrows?: boolean;
	showDots?: boolean;
	onSlideChange?: (index: number) => void;
	renderItem?: (props: {
		item: RowHeroItem;
		index: number;
		isActive: boolean;
		openInfo: () => void;
	}) => ReactNode;
}

function hasExtraInfo(item: RowHeroItem): boolean {
	return Boolean(
		item.description ||
		item.currentTime ||
		(item.meta && item.meta.length > 0) ||
		item.result,
	);
}

function SlideVideo({ src, isActive }: { src: string; isActive: boolean }) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (!isActive) {
			const raf = requestAnimationFrame(() => setVisible(false));
			const el = videoRef.current;
			if (el) {
				el.pause();
				el.currentTime = 0;
			}
			return () => cancelAnimationFrame(raf);
		}

		const timer = setTimeout(() => {
			setVisible(true);
			videoRef.current?.play().catch(() => {
				/* autoplay bloqueado por el navegador: silencioso */
			});
		}, 1000);

		// Detiene el video tras 10 s máximo
		const stopTimer = setTimeout(() => {
			const el = videoRef.current;
			if (el) {
				el.pause();
				el.currentTime = 0;
			}
			setVisible(false);
		}, 1000 + 10_000);

		return () => {
			clearTimeout(timer);
			clearTimeout(stopTimer);
		};
	}, [isActive]);

	return (
		<video
			ref={videoRef}
			src={src}
			muted
			playsInline
			aria-hidden="true"
			className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
				visible ? 'opacity-100' : 'opacity-0'
			}`}
		/>
	);
}

function CTAButton({
	cta,
	variant,
	icon: Icon,
}: {
	cta: RowHeroCTA;
	variant: 'primary' | 'secondary';
	icon?: React.ComponentType<{ size: number; className?: string }>;
}) {
	const className =
		variant === 'primary'
			? 'inline-flex items-center justify-center gap-2 rounded-xl bg-[#f10448] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#c9033b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f10448]'
			: 'inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-800 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400';

	if (cta.href) {
		return (
			<a
				href={cta.href}
				target={cta.target}
				rel={cta.rel}
				onClick={cta.onClick}
				className={className}
			>
				{Icon && <Icon size={18} />}
				{cta.label}
			</a>
		);
	}

	return (
		<button type="button" onClick={cta.onClick} className={className}>
			{Icon && <Icon size={18} />}
			{cta.label}
		</button>
	);
}

export function RowHeroCarousel({
	items,
	className,
	title,
	autoPlay = true,
	intervalMs = 6000,
	showArrows = true,
	showDots = true,
	onSlideChange,
	renderItem,
}: RowHeroCarouselProps) {
	const [modalItem, setModalItem] = useState<RowHeroItem | null>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const [isDesktop, setIsDesktop] = useState(false);
	const hasMultipleItems = items.length > 1;

	useEffect(() => {
		const mediaQuery = window.matchMedia('(min-width: 768px)');
		const updateBreakpoint = () => setIsDesktop(mediaQuery.matches);

		updateBreakpoint();
		mediaQuery.addEventListener('change', updateBreakpoint);

		return () => mediaQuery.removeEventListener('change', updateBreakpoint);
	}, []);

	const modules = useMemo(() => {
		const nextModules = [EffectFade, Pagination, Navigation];
		if (autoPlay && hasMultipleItems) {
			nextModules.push(Autoplay);
		}
		return nextModules;
	}, [autoPlay, hasMultipleItems]);

	if (!items || items.length === 0) {
		return null;
	}

	return (
		<section
			className={[
				'relative w-full overflow-hidden h-[70vh] min-h-162.5',
				className ?? '',
			].join(' ')}
			style={modalItem ? { scrollbarGutter: 'stable' } : undefined}
		>
			<Swiper
				modules={modules}
				slidesPerView={1}
				loop={hasMultipleItems}
				navigation={showArrows && hasMultipleItems && isDesktop}
				pagination={
					showDots && hasMultipleItems
						? {
								clickable: true,
								dynamicBullets: false,
							}
						: false
				}
				autoplay={
					autoPlay && hasMultipleItems
						? {
								delay: intervalMs,
								disableOnInteraction: false,
								pauseOnMouseEnter: true,
							}
						: false
				}
				onSlideChange={(swiper) => {
					setActiveIndex(swiper.realIndex);
					onSlideChange?.(swiper.realIndex);
				}}
				className="h-full w-full [&_.swiper-button-prev]:hidden md:[&_.swiper-button-prev]:inline-flex [&_.swiper-button-next]:hidden md:[&_.swiper-button-next]:inline-flex"
			>
				{items.map((item, index) => (
					<SwiperSlide key={item.id}>
						{renderItem ? (
							renderItem({
								item,
								index,
								isActive: index === activeIndex,
								openInfo: () => setModalItem(item),
							})
						) : (
							<div className="relative h-full w-full min-h-[inherit]">
								<img
									src={item.image}
									alt={item.title}
									className="absolute inset-0 h-full w-full object-cover"
								/>

								{item.video && (
									<SlideVideo
										src={item.video}
										isActive={index === activeIndex}
									/>
								)}

								<div
									aria-hidden="true"
									className="absolute inset-0 bg-linear-to-t from-black/90 via-black/55 to-black/20 md:bg-linear-to-r md:from-black/85 md:via-black/60 md:to-black/10"
								/>

								<div className="absolute inset-0 z-10 flex flex-col items-center justify-end px-6 pb-16 text-center md:items-start md:justify-center md:px-12 md:pb-0 md:text-left lg:px-20">
									{item.isLive && (
										<div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
											<span
												aria-hidden="true"
												className="h-2 w-2 animate-pulse rounded-full bg-white"
											/>
											En directo
										</div>
									)}

									{item.badge && !item.isLive && (
										<div className="mb-4 inline-flex rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
											{item.badge}
										</div>
									)}

									{item.subtitle && (
										<p className="mb-2 text-sm font-semibold uppercase tracking-widest text-red-400">
											{item.subtitle}
										</p>
									)}

									<h3 className="mb-4 max-w-4xl text-4xl font-extrabold text-white md:text-7xl lg:text-8xl">
										{item.title}
									</h3>

									{item.result && (
										<p className="mb-4 flex flex-row justify-center gap-4 text-3xl font-semibold text-white md:justify-start">
											{item.result.team1}
											<span className="text-red-400">{item.result.score}</span>
											{item.result.team2}
										</p>
									)}

									<div className="mb-8 flex max-w-xl flex-col items-center gap-3 text-base text-zinc-200 md:items-start md:text-lg">
										{item.description && (
											<p className="line-clamp-3 text-base text-zinc-300 md:text-lg">
												{item.description}
											</p>
										)}
										{item.currentTime && (
											<p className="text-xs text-zinc-400">
												Tiempo actual: {item.currentTime}
											</p>
										)}
									</div>

									<div className="flex flex-wrap justify-center gap-2 md:justify-start md:gap-3">
										{item.ctaPrimary ? (
											<CTAButton
												cta={item.ctaPrimary}
												variant="primary"
												icon={Play}
											/>
										) : (
											<button
												type="button"
												onClick={() => setModalItem(item)}
												className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f10448] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#c9033b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f10448]"
											>
												<Play size={18} />
												Reproducir
											</button>
										)}
										<button
											type="button"
											onClick={() => setModalItem(item)}
											className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-800 p-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 md:px-4 md:py-2.5"
										>
											<Heart size={18} />
											<span className="hidden md:inline">Favorito</span>
										</button>
										{hasExtraInfo(item) && (
											<button
												type="button"
												onClick={() => setModalItem(item)}
												className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-800 p-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 md:px-4 md:py-2.5"
											>
												<Info size={18} />
												<span className="hidden md:inline">Mas info</span>
											</button>
										)}
									</div>
								</div>
							</div>
						)}
					</SwiperSlide>
				))}
			</Swiper>

			<Modal
				open={!!modalItem}
				onOpenChange={(open: boolean) => !open && setModalItem(null)}
				title={modalItem?.title}
			>
				{modalItem && (
					<div className="flex flex-col gap-4">
						<img
							src={modalItem.image}
							alt={modalItem.title}
							className="h-40 w-full rounded-md object-cover"
						/>

						{modalItem.subtitle && (
							<p className="text-xs font-semibold uppercase tracking-widest text-red-400">
								{modalItem.subtitle}
							</p>
						)}

						{modalItem.result && (
							<div className="flex items-center justify-center gap-3 rounded-xl bg-white/5 py-3 text-xl font-bold text-white">
								<span>{modalItem.result.team1}</span>
								<span className="text-red-400">{modalItem.result.score}</span>
								<span>{modalItem.result.team2}</span>
							</div>
						)}

						{modalItem.description && (
							<p className="text-sm leading-relaxed text-white">
								{modalItem.description}
							</p>
						)}

						{modalItem.meta && modalItem.meta.length > 0 && (
							<div className="flex flex-wrap gap-2">
								{modalItem.meta.map((metaValue) => (
									<span
										key={`${modalItem.id}-${metaValue}`}
										className="rounded-full border border-red-400/40 bg-red-600/15 px-2.5 py-1 text-xs font-semibold text-red-200"
									>
										{metaValue}
									</span>
								))}
							</div>
						)}

						{modalItem.currentTime && (
							<p className="text-xs text-zinc-400">
								Tiempo actual: {modalItem.currentTime}
							</p>
						)}

						{modalItem.ctaPrimary && (
							<CTAButton
								cta={modalItem.ctaPrimary}
								variant="primary"
								icon={Play}
							/>
						)}
					</div>
				)}
			</Modal>
		</section>
	);
}

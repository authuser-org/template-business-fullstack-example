'use client';

import { SafeImage } from '@/src/components/safe/SafeImage';
import type { FilmHeroItem } from '@repo/shared';
import {
	Calendar,
	ChevronLeft,
	ChevronRight,
	Clock,
	Film,
	Flag,
	Heart,
	Info,
	MapPin,
	Play,
	Star,
	Tag,
	Trophy,
	User,
	Users,
	X,
} from 'lucide-react';
import Link from 'next/link';
import {
	type TouchEvent as ReactTouchEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { createPortal } from 'react-dom';

// ---------------------------------------------------------------------------
// Tipos públicos
// ---------------------------------------------------------------------------

/**
 * Tipo base flexible que soporta tanto contenido de películas como eventos deportivos
 * Se puede usar directamente o extender para casos específicos
 */
export type HeroSlide = Partial<FilmHeroItem> & {
	id: string | number;
	title: string;
	/** URL absoluta o path dentro de /public */
	image: string;
	subtitle?: string;
	description?: string;
	video?: string;
	badge?: string;
	currentTime?: string; // Formato "HH:MM" o duración legible
	result?: {
		score: string;
		team1: string;
		team2: string;
	};
	isLive?: boolean;
	ctaPrimary?: { label: string; href: string };
	ctaSecondary?: { label: string; href: string };
	/** Información extra para el modal de Más info */
	info?: {
		competition?: string;
		date?: string;
		time?: string;
		venue?: string;
		extraDetail?: string;
	};
	// Campos adicionales para películas y contenido multimedia
	genre?: string[];
	year?: number;
	duration?: string;
	rating?: string;
	language?: string;
	country?: string;
	director?: string;
	cast?: string[];
	tags?: string[];
};

export interface HeroCarouselProps<T extends HeroSlide = HeroSlide> {
	slides: T[];
	/** Avance automático. Default: true */
	autoPlay?: boolean;
	/** Milisegundos entre slides. Default: 6000 */
	intervalMs?: number;
	/** Índice inicial. Default: 0 */
	initialIndex?: number;
	/** Callback cuando cambia el slide activo */
	onSlideChange?: (index: number) => void;
	className?: string;
}

// ---------------------------------------------------------------------------
// Helpers de animación
// ---------------------------------------------------------------------------

type Direction = 'next' | 'prev';

/**
 * Devuelve las clases Tailwind de transición para cada slide.
 * Estrategia: fade + ligero translateX de entrada para dar sensación de
 * movimiento sin el "jank" de mover todos los slides simultáneamente.
 */
function getSlideClasses(
	isActive: boolean,
	isEntering: boolean,
	direction: Direction,
): string {
	const base =
		'absolute inset-0 transition-all duration-700 ease-in-out will-change-[opacity,transform]';

	if (isActive) {
		return `${base} opacity-100 translate-x-0 z-10`;
	}

	if (isEntering) {
		// El slide que acaba de salir: sale en la dirección opuesta
		const exit = direction === 'next' ? '-translate-x-8' : 'translate-x-8';
		return `${base} opacity-0 ${exit} z-0 pointer-events-none`;
	}

	// Resto de slides: ocultos estáticamente sin transición visible
	return `${base} opacity-0 translate-x-0 z-0 pointer-events-none`;
}

function hasExtraInfo(slide: HeroSlide): boolean {
	return Boolean(
		slide.info ||
		slide.currentTime ||
		slide.genre?.length ||
		slide.year ||
		slide.duration ||
		slide.rating ||
		slide.language ||
		slide.country ||
		slide.director ||
		slide.cast?.length ||
		slide.tags?.length,
	);
}

// ---------------------------------------------------------------------------
// Modal de información del partido
// ---------------------------------------------------------------------------

function SlideInfoModal({
	slide,
	onClose,
}: {
	slide: HeroSlide;
	onClose: () => void;
}) {
	const [visible, setVisible] = useState(false);
	const [mounted, setMounted] = useState(false);
	const DURATION = 300;

	useEffect(() => {
		setMounted(true);
		const raf = requestAnimationFrame(() => setVisible(true));
		return () => cancelAnimationFrame(raf);
	}, []);

	function handleClose() {
		setVisible(false);
		setTimeout(onClose, DURATION);
	}

	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === 'Escape') handleClose();
		}
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!mounted) return null;

	return createPortal(
		<>
			{/* Backdrop */}
			<div
				aria-hidden="true"
				onClick={handleClose}
				className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
					visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
				}`}
			/>

			{/* Modal */}
			<div
				role="dialog"
				aria-modal="true"
				aria-label={`Información: ${slide.title}`}
				className={`fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 px-4 transition-all duration-300 ease-in-out ${
					visible
						? '-translate-y-1/2 opacity-100'
						: '-translate-y-[40%] opacity-0'
				}`}
			>
				<div className="overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl shadow-black/80 ring-1 ring-white/10">
					{/* Imagen de cabecera */}
					<div className="relative h-44 w-full">
						<SafeImage
							src={slide.image}
							alt={slide.title}
							fill
							className="object-cover"
							sizes="512px"
						/>
						<div
							aria-hidden="true"
							className="absolute inset-0 bg-linear-to-t from-zinc-900 via-zinc-900/40 to-transparent"
						/>
						{slide.isLive && (
							<div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-white">
								<span
									aria-hidden="true"
									className="h-1.5 w-1.5 animate-pulse rounded-full bg-white"
								/>
								En directo
							</div>
						)}
						<button
							type="button"
							onClick={handleClose}
							aria-label="Cerrar"
							className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
						>
							<X className="h-4 w-4" aria-hidden="true" />
						</button>
					</div>

					{/* Contenido */}
					<div className="px-6 pb-6 pt-4">
						{slide.subtitle && (
							<p className="mb-1 text-xs font-semibold uppercase tracking-widest text-red-400">
								{slide.subtitle}
							</p>
						)}
						<h3 className="mb-3 text-xl font-extrabold leading-snug text-white">
							{slide.title}
						</h3>

						{/* Resultado */}
						{slide.result && (
							<div className="mb-4 flex items-center justify-center gap-4 rounded-xl bg-white/5 py-3 text-2xl font-bold text-white">
								<span>{slide.result.team1}</span>
								<span className="text-3xl text-red-400">
									{slide.result.score}
								</span>
								<span>{slide.result.team2}</span>
							</div>
						)}

						{/* Descripción */}
						{slide.description && (
							<p className="mb-4 text-sm leading-relaxed text-zinc-300">
								{slide.description}
							</p>
						)}

						{/* Metadatos */}
						{(slide.info ??
							slide.currentTime ??
							slide.genre ??
							slide.year ??
							slide.year ??
							slide.director) && (
							<div className="space-y-4 border-t border-white/10 pt-4">
								{/* Primera fila: Género, Año, Duración, Rating */}
								{(slide.genre ||
									slide.year ||
									slide.duration ||
									slide.rating) && (
									<div className="grid grid-cols-2 gap-3">
										{slide.genre && slide.genre.length > 0 && (
											<div className="flex items-start gap-2">
												<Film
													className="h-4 w-4 shrink-0 text-red-400 mt-0.5"
													aria-hidden="true"
												/>
												<div className="min-w-0">
													<p className="text-xs text-zinc-500">Género</p>
													<p className="text-sm text-zinc-200">
														{slide.genre.join(', ')}
													</p>
												</div>
											</div>
										)}
										{slide.year && (
											<div className="flex items-start gap-2">
												<Calendar
													className="h-4 w-4 shrink-0 text-red-400 mt-0.5"
													aria-hidden="true"
												/>
												<div className="min-w-0">
													<p className="text-xs text-zinc-500">Año</p>
													<p className="text-sm text-zinc-200">{slide.year}</p>
												</div>
											</div>
										)}
										{slide.duration && (
											<div className="flex items-start gap-2">
												<Clock
													className="h-4 w-4 shrink-0 text-red-400 mt-0.5"
													aria-hidden="true"
												/>
												<div className="min-w-0">
													<p className="text-xs text-zinc-500">Duración</p>
													<p className="text-sm text-zinc-200">
														{slide.duration}
													</p>
												</div>
											</div>
										)}
										{slide.rating && (
											<div className="flex items-start gap-2">
												<Star
													className="h-4 w-4 shrink-0 text-red-400 mt-0.5"
													aria-hidden="true"
												/>
												<div className="min-w-0">
													<p className="text-xs text-zinc-500">Clasificación</p>
													<p className="text-sm text-zinc-200">
														{slide.rating}
													</p>
												</div>
											</div>
										)}
									</div>
								)}

								{/* Director y Cast */}
								<div className="space-y-3">
									{slide.director && (
										<div className="flex items-start gap-2">
											<User
												className="h-4 w-4 shrink-0 text-red-400 mt-0.5"
												aria-hidden="true"
											/>
											<div className="min-w-0 flex-1">
												<p className="text-xs text-zinc-500">Director</p>
												<p className="text-sm text-zinc-200">
													{slide.director}
												</p>
											</div>
										</div>
									)}
									{slide.cast && slide.cast.length > 0 && (
										<div className="flex items-start gap-2">
											<Users
												className="h-4 w-4 shrink-0 text-red-400 mt-0.5"
												aria-hidden="true"
											/>
											<div className="min-w-0 flex-1">
												<p className="text-xs text-zinc-500">Reparto</p>
												<p className="text-sm text-zinc-200">
													{slide.cast.join(', ')}
												</p>
											</div>
										</div>
									)}
								</div>

								{/* Idioma y País */}
								{(slide.language || slide.country) && (
									<div className="grid grid-cols-2 gap-3">
										{slide.language && (
											<div className="flex items-start gap-2">
												<span className="text-xs font-semibold text-red-400">
													IDIOMA
												</span>
												<p className="text-sm text-zinc-200">
													{slide.language}
												</p>
											</div>
										)}
										{slide.country && (
											<div className="flex items-start gap-2">
												<Flag
													className="h-4 w-4 shrink-0 text-red-400 mt-0.5"
													aria-hidden="true"
												/>
												<p className="text-sm text-zinc-200">{slide.country}</p>
											</div>
										)}
									</div>
								)}

								{/* Tags */}
								{slide.tags && slide.tags.length > 0 && (
									<div className="flex items-start gap-2">
										<Tag
											className="h-4 w-4 shrink-0 text-red-400 mt-0.5"
											aria-hidden="true"
										/>
										<div className="min-w-0 flex-1">
											<p className="text-xs text-zinc-500 mb-1.5">Etiquetas</p>
											<div className="flex flex-wrap gap-1.5">
												{slide.tags.map((tag, idx) => (
													<span
														key={idx}
														className="inline-block rounded-full bg-red-500/20 px-2.5 py-1 text-xs font-medium text-red-300"
													>
														{tag}
													</span>
												))}
											</div>
										</div>
									</div>
								)}

								{/* Metadatos de deportes (compatibilidad hacia atrás) */}
								{slide.info && (
									<div className="space-y-2">
										{slide.info.competition && (
											<div className="flex items-center gap-2">
												<Trophy
													className="h-4 w-4 shrink-0 text-zinc-500"
													aria-hidden="true"
												/>
												<span className="text-sm text-zinc-400">
													{slide.info.competition}
												</span>
											</div>
										)}
										{slide.info.date && (
											<div className="flex items-center gap-2">
												<Calendar
													className="h-4 w-4 shrink-0 text-zinc-500"
													aria-hidden="true"
												/>
												<span className="text-sm text-zinc-400">
													{slide.info.date}
												</span>
											</div>
										)}
										{slide.info.venue && (
											<div className="flex items-center gap-2">
												<MapPin
													className="h-4 w-4 shrink-0 text-zinc-500"
													aria-hidden="true"
												/>
												<span className="text-sm text-zinc-400">
													{slide.info.venue}
												</span>
											</div>
										)}
									</div>
								)}

								{slide.currentTime && (
									<p className="text-xs text-gray-400">
										Tiempo actual: {slide.currentTime}
									</p>
								)}
							</div>
						)}

						{/* CTA principal */}
						{slide.ctaPrimary && (
							<Link
								href={slide.ctaPrimary.href}
								className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
							>
								<Play className="h-4 w-4 fill-white" aria-hidden="true" />
								{slide.ctaPrimary.label}
							</Link>
						)}
					</div>
				</div>
			</div>
		</>,
		document.body,
	);
}

// ---------------------------------------------------------------------------
// Video por slide — se monta una vez por slide y gestiona play/pause
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

export function HeroCarousel<T extends HeroSlide = HeroSlide>({
	slides,
	autoPlay = true,
	intervalMs = 6000,
	initialIndex = 0,
	onSlideChange,
	className,
}: HeroCarouselProps<T>) {
	const total = slides.length;

	// Índice inicial seguro aunque el valor entrante sea out-of-range
	const safeInitial =
		total > 0 ? Math.min(Math.max(0, initialIndex), total - 1) : 0;

	const [current, setCurrent] = useState(safeInitial);
	const [previous, setPrevious] = useState<number | null>(null);
	const [direction, setDirection] = useState<Direction>('next');

	// Pausa por hover/focus dentro del contenedor
	const [paused, setPaused] = useState(false);
	// Pausa temporal tras interacción manual del usuario
	const [userPaused, setUserPaused] = useState(false);
	// Slide cuyo modal de info está abierto
	const [infoSlide, setInfoSlide] = useState<HeroSlide | null>(null);
	const FAVORITES_STORAGE_KEY = 'web:hero:favorites';
	// Favoritos del hero (persisten en localStorage)
	const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => {
		if (typeof window === 'undefined') return new Set();
		try {
			const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
			if (!raw) return new Set();
			const parsed = JSON.parse(raw) as string[];
			return new Set(parsed);
		} catch {
			return new Set();
		}
	});

	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const userPauseRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const touchStartRef = useRef<{ x: number; y: number } | null>(null);

	useEffect(() => {
		try {
			window.localStorage.setItem(
				FAVORITES_STORAGE_KEY,
				JSON.stringify(Array.from(favoriteIds)),
			);
		} catch {
			// ignore
		}
	}, [favoriteIds]);

	// ---------------------------------------------------------------------------
	// Navegación
	// ---------------------------------------------------------------------------

	const goTo = useCallback(
		(index: number, dir: Direction) => {
			setPrevious((prev) => (prev === index ? null : current));
			setDirection(dir);
			setCurrent(index);
			onSlideChange?.(index);
		},
		[current, onSlideChange],
	);

	/** Pausa el autoplay durante 2× el intervalo tras interacción manual */
	const triggerUserPause = useCallback(() => {
		setUserPaused(true);
		if (userPauseRef.current) clearTimeout(userPauseRef.current);
		userPauseRef.current = setTimeout(
			() => setUserPaused(false),
			intervalMs * 2,
		);
	}, [intervalMs]);

	const goNext = useCallback(() => {
		triggerUserPause();
		goTo((current + 1) % total, 'next');
	}, [current, total, goTo, triggerUserPause]);

	const goPrev = useCallback(() => {
		triggerUserPause();
		goTo((current - 1 + total) % total, 'prev');
	}, [current, total, goTo, triggerUserPause]);

	const handleTouchStart = useCallback((e: ReactTouchEvent<HTMLElement>) => {
		const touch = e.touches[0];
		if (!touch) return;
		touchStartRef.current = { x: touch.clientX, y: touch.clientY };
	}, []);

	const handleTouchEnd = useCallback(
		(e: ReactTouchEvent<HTMLElement>) => {
			if (total <= 1) return;
			const start = touchStartRef.current;
			touchStartRef.current = null;
			if (!start) return;
			const touch = e.changedTouches[0];
			if (!touch) return;
			const deltaX = touch.clientX - start.x;
			const deltaY = touch.clientY - start.y;
			const MIN_SWIPE_DISTANCE = 40;

			// Solo dispara swipe horizontal real para no romper el scroll vertical.
			if (
				Math.abs(deltaX) > Math.abs(deltaY) &&
				Math.abs(deltaX) > MIN_SWIPE_DISTANCE
			) {
				if (deltaX < 0) {
					goNext();
				} else {
					goPrev();
				}
			}
		},
		[goNext, goPrev, total],
	);

	const isFavorite = useCallback(
		(slide: HeroSlide) => favoriteIds.has(String(slide.id)),
		[favoriteIds],
	);

	const toggleFavorite = useCallback((slide: HeroSlide) => {
		const id = String(slide.id);
		setFavoriteIds((prev) => {
			const next = new Set(prev);
			if (next.has(id)) {
				next.delete(id);
			} else {
				next.add(id);
			}
			return next;
		});
	}, []);

	// ---------------------------------------------------------------------------
	// Teclado (Left / Right): solo cuando el foco está dentro del componente.
	// SSR-safe: el addEventListener se registra en un useEffect.
	// ---------------------------------------------------------------------------

	useEffect(() => {
		const el = containerRef.current;
		if (!el || total <= 1) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowRight') {
				e.preventDefault();
				goNext();
			} else if (e.key === 'ArrowLeft') {
				e.preventDefault();
				goPrev();
			}
		};

		el.addEventListener('keydown', handleKeyDown);
		return () => el.removeEventListener('keydown', handleKeyDown);
	}, [goNext, goPrev, total]);

	// ---------------------------------------------------------------------------
	// Autoplay: usa setTimeout (no setInterval) para evitar drift y limpiar
	// correctamente aunque el componente se desmonte antes de que dispare.
	// ---------------------------------------------------------------------------

	const shouldAutoPlay = autoPlay && total > 1 && !paused && !userPaused;

	useEffect(() => {
		if (!shouldAutoPlay) return;

		timerRef.current = setTimeout(() => {
			const next = (current + 1) % total;
			setPrevious(current);
			setDirection('next');
			setCurrent(next);
			onSlideChange?.(next);
		}, intervalMs);

		// Limpieza: crucial para evitar memory leaks cuando el componente se desmonta
		// o cuando el efecto se re-ejecuta antes de que dispare el timer.
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, [shouldAutoPlay, current, intervalMs, total, onSlideChange]);

	// Limpieza del timer de pausa de usuario al desmontar
	useEffect(() => {
		return () => {
			if (userPauseRef.current) clearTimeout(userPauseRef.current);
		};
	}, []);

	// ---------------------------------------------------------------------------
	// Guards de edge cases
	// ---------------------------------------------------------------------------

	if (total === 0) return null;

	const isSingle = total === 1;

	// ---------------------------------------------------------------------------
	// Render
	// ---------------------------------------------------------------------------

	return (
		<section
			ref={containerRef}
			role="region"
			aria-label="Hero carousel"
			aria-roledescription="carousel"
			// tabIndex permite recibir foco para navegación por teclado
			tabIndex={0}
			className={[
				'relative overflow-hidden',
				'h-[90vh]  max-h-1/6',
				'focus:outline-none focus-visible:ring-offset-0',
				className ?? '',
			]
				.filter(Boolean)
				.join(' ')}
			// Pausa autoplay cuando el puntero o el foco entran en el hero
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
			onFocus={() => setPaused(true)}
			onBlur={() => setPaused(false)}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
			onTouchCancel={() => {
				touchStartRef.current = null;
			}}
		>
			{/* ------------------------------------------------------------------ */}
			{/* Slides                                                              */}
			{/* ------------------------------------------------------------------ */}

			{slides.map((slide, index) => {
				const isActive = index === current;
				// `previous` identifica el slide que acaba de ser desplazado
				const isEntering = index === previous;

				return (
					<div
						key={slide.id}
						role="group"
						aria-roledescription="slide"
						aria-label={`${index + 1} de ${total}: ${slide.title}`}
						aria-hidden={!isActive}
						className={getSlideClasses(isActive, isEntering, direction)}
					>
						{/* Imagen de fondo ------------------------------------------- */}
						<SafeImage
							src={slide.image}
							alt={slide.title}
							fill
							// Solo el primer slide se precarga; el resto se carga on-demand
							priority={index === 0}
							className="object-cover"
							sizes="100vw"
						/>

						{/* Video — se superpone sobre la imagen tras 1 s ------------- */}
						{slide.video && (
							<SlideVideo src={slide.video} isActive={isActive} />
						)}

						{/* Overlay degradado ------------------------------------------ */}
						<div
							aria-hidden="true"
							className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/20 md:bg-linear-to-r md:from-black/80 md:via-black/60 md:to-black/10"
						/>

						{/* Contenido --------------------------------------------------- */}
						<div className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-16 text-center md:items-start md:justify-center md:px-16 md:pb-0 md:text-left lg:px-24">
							{/* Badge LIVE ----------------------------------------------- */}
							{slide.isLive && (
								<div
									role="status"
									aria-label="Emisión en directo"
									className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white"
								>
									{/*
									 * Punto pulsante: animación CSS `animate-pulse` de Tailwind.
									 * Sin librerías de animación externas.
									 */}
									<span
										aria-hidden="true"
										className="h-2 w-2 animate-pulse rounded-full bg-white"
									/>
									En directo
								</div>
							)}

							{/* Badge editorial (películas) -------------------------------- */}
							{slide.badge && !slide.isLive && (
								<div className="mb-4 inline-flex w-fit items-center rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
									{slide.badge}
								</div>
							)}

							{/* Subtítulo ------------------------------------------------- */}
							{slide.subtitle && (
								<p className="mb-2 text-sm font-semibold uppercase tracking-widest text-red-400">
									{slide.subtitle}
								</p>
							)}

							{/* Título ---------------------------------------------------- */}
							<h2 className="mb-4 mx-auto max-w-3xl text-4xl font-extrabold  text-white md:mx-0 md:text-8xl text-balance">
								{slide.title}
							</h2>

							{/* Metadata visible en hero ---------------------------------- */}
							{/* {(slide.year ||
								slide.duration ||
								slide.rating ||
								slide.genre) && (
								<div className="mb-4 flex max-w-3xl flex-wrap items-center justify-center gap-2 md:justify-start">
									{slide.year && (
										<span className="rounded-full border border-white/20 bg-black/35 px-2.5 py-1 text-xs font-semibold text-zinc-100 backdrop-blur-sm">
											{slide.year}
										</span>
									)}
									{slide.duration && (
										<span className="rounded-full border border-white/20 bg-black/35 px-2.5 py-1 text-xs font-semibold text-zinc-100 backdrop-blur-sm">
											{slide.duration}
										</span>
									)}
									{slide.rating && (
										<span className="rounded-full border border-white/20 bg-black/35 px-2.5 py-1 text-xs font-semibold text-zinc-100 backdrop-blur-sm">
											{slide.rating}
										</span>
									)}
									{slide.genre?.slice(0, 2).map((genre) => (
										<span
											key={`${slide.id}-${genre}`}
											className="rounded-full border border-red-400/40 bg-red-600/15 px-2.5 py-1 text-xs font-semibold text-red-200"
										>
											{genre}
										</span>
									))}
								</div>
							)} */}

							{/* Resultado (si existe) ----------------------------------------- */}
							{slide.result && (
								<p className="mb-4 flex flex-row justify-center gap-4 text-3xl font-semibold text-white md:justify-start">
									{slide.result.team1}{' '}
									<span className="text-red-400">{slide.result.score}</span>{' '}
									{slide.result.team2}
								</p>
							)}

							{/* Descripción ----------------------------------------------- */}
							<div className="mb-8 mx-auto flex max-w-xl flex-col items-center gap-4 text-base text-gray-200 md:mx-0 md:items-start md:text-lg">
								{slide.description && (
									<p className=" max-w-xl text-base text-gray-300 md:text-lg line-clamp-3">
										{slide.description}
									</p>
								)}

								{slide.currentTime && (
									<p className="text-xs text-gray-400">
										Tiempo actual: {slide.currentTime}
									</p>
								)}
							</div>

							{/* CTAs ------------------------------------------------------- */}
							<div className="flex flex-wrap justify-center gap-2 md:gap-3 md:justify-start">
								{slide.ctaPrimary?.href ? (
									<Link
										href={slide.ctaPrimary.href}
										className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f10448] px-3 py-3 md:px-6 text-sm font-semibold text-white transition-colors hover:bg-[#c9033b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f10448]"
									>
										<Play className="h-4 w-4 fill-white" aria-hidden="true" />
										<span>{slide.ctaPrimary.label ?? 'Reproducir'}</span>
									</Link>
								) : (
									<button
										type="button"
										onClick={() => setInfoSlide(slide)}
										className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f10448] px-3 py-3 md:px-6 text-sm font-semibold text-white transition-colors hover:bg-[#c9033b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f10448]"
									>
										<Play className="h-4 w-4 fill-white" aria-hidden="true" />
										<span>Reproducir</span>
									</button>
								)}

								<button
									type="button"
									aria-pressed={isFavorite(slide)}
									onClick={() => toggleFavorite(slide)}
									className={[
										'inline-flex items-center justify-center gap-2 rounded-xl px-3 py-3 md:px-6 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f10448]',
										isFavorite(slide)
											? 'border border-[#f10448]/50 bg-[#f10448]/15 text-[#f47a9f] hover:bg-[#f10448]/25'
											: 'bg-zinc-800 text-white hover:bg-zinc-700',
									].join(' ')}
								>
									<Heart
										className={`h-4 w-4 ${isFavorite(slide) ? 'fill-[#f10448] text-[#f10448]' : ''}`}
										aria-hidden="true"
									/>
									<span className="hidden md:inline">
										{isFavorite(slide) ? 'En favoritos' : 'Anadir a favoritos'}
									</span>
								</button>

								{hasExtraInfo(slide) && (
									<button
										type="button"
										onClick={() => setInfoSlide(slide)}
										className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-800 px-3 py-3 md:px-6 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
									>
										<Info className="h-4 w-4" aria-hidden="true" />
										<span className="hidden md:inline">
											{slide.ctaSecondary?.label ?? 'Mas info'}
										</span>
									</button>
								)}
							</div>
						</div>
					</div>
				);
			})}

			{/* ------------------------------------------------------------------ */}
			{/* Controles (ocultos cuando hay un único slide)                       */}
			{/* ------------------------------------------------------------------ */}

			{!isSingle && (
				<>
					{/* Flechas ------------------------------------------------------- */}
					{/*
					 * El wrapper usa `pointer-events-none` para no bloquear clicks sobre
					 * el contenido del slide; los botones recuperan `pointer-events-auto`.
					 */}
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 hidden items-center justify-between px-4 md:flex"
					>
						<button
							type="button"
							aria-label="Slide anterior"
							onClick={goPrev}
							className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-white"
						>
							<ChevronLeft className="h-5 w-5" aria-hidden="true" />
						</button>

						<button
							type="button"
							aria-label="Siguiente slide"
							onClick={goNext}
							className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-white"
						>
							<ChevronRight className="h-5 w-5" aria-hidden="true" />
						</button>
					</div>

					{/* Dots ---------------------------------------------------------- */}
					<div
						role="tablist"
						aria-label="Seleccionar slide"
						className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2"
					>
						{slides.map((slide, index) => {
							const isActive = index === current;
							return (
								<button
									key={slide.id}
									role="tab"
									type="button"
									aria-selected={isActive}
									aria-label={`Ir al slide ${index + 1}: ${slide.title}`}
									onClick={() => {
										triggerUserPause();
										goTo(index, index > current ? 'next' : 'prev');
									}}
									className={[
										'h-2 rounded-full transition-all duration-300',
										'focus-visible:outline-2 focus-visible:outline-white',
										isActive
											? 'w-8 bg-red-500'
											: 'w-2 bg-gray-500/50 hover:bg-gray-400/70',
									].join(' ')}
								/>
							);
						})}
					</div>
				</>
			)}
			{/* Modal de información -------------------------------------------- */}
			{infoSlide && (
				<SlideInfoModal slide={infoSlide} onClose={() => setInfoSlide(null)} />
			)}
		</section>
	);
}

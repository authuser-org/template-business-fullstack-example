'use client';

import {
	AVATAR_COLORS,
	Profile,
	useProfiles,
} from '@/src/providers/ProfilesProvider';
import { Button } from '@repo/ui-react';
import {
	Bell,
	Check,
	CheckCheck,
	ChevronRight,
	Menu,
	Search,
	User,
	X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

// ---------------------------------------------------------------------------
// Tipos y datos mock de notificaciones
// ---------------------------------------------------------------------------

type NotifType = 'live' | 'highlight' | 'news' | 'reminder';

type Notification = {
	id: string;
	type: NotifType;
	title: string;
	body: string;
	time: string;
	read: boolean;
};

const INITIAL_NOTIFS: Notification[] = [
	{
		id: 'n1',
		type: 'live',
		title: '🔴 España vs Francia — EN DIRECTO',
		body: 'El partido ha comenzado. Minuto 7: ¡GOL de Lamine Yamal!',
		time: 'Ahora',
		read: false,
	},
	{
		id: 'n2',
		type: 'highlight',
		title: '⚽ Resumen disponible',
		body: 'Ya puedes ver el resumen del España 3-1 Croacia de ayer.',
		time: 'Hace 1 h',
		read: false,
	},
	{
		id: 'n3',
		type: 'reminder',
		title: '⏰ Partido mañana',
		body: 'Portugal vs Alemania — UEFA Nations League — 20:45 h',
		time: 'Hace 3 h',
		read: false,
	},
	{
		id: 'n4',
		type: 'news',
		title: '📰 De la Fuente convoca a Yamal',
		body: 'El seleccionador confirma la lista para la próxima ventana internacional.',
		time: 'Hace 5 h',
		read: true,
	},
	{
		id: 'n5',
		type: 'highlight',
		title: '🎯 Top 5 goles de la jornada',
		body: 'Revive los mejores goles de la última jornada de Liga.',
		time: 'Ayer',
		read: true,
	},
	{
		id: 'n6',
		type: 'live',
		title: '🔴 Fútbol Femenino — EN DIRECTO',
		body: 'España Femenina vs Suecia. Comienza en 10 minutos.',
		time: 'Ayer',
		read: true,
	},
	{
		id: 'n7',
		type: 'news',
		title: '📰 Nuevo documental disponible',
		body: '"La Roja: el camino al Mundial" ya disponible completo.',
		time: 'Hace 2 días',
		read: true,
	},
];

const TYPE_COLORS: Record<NotifType, string> = {
	live: 'bg-red-500',
	highlight: 'bg-yellow-500',
	news: 'bg-blue-500',
	reminder: 'bg-purple-500',
};

// ---------------------------------------------------------------------------
// Panel de notificaciones
// ---------------------------------------------------------------------------

function NotificationsPanel({ onClose }: { onClose: () => void }) {
	const [notifs, setNotifs] = useState<Notification[]>(INITIAL_NOTIFS);
	const [query, setQuery] = useState('');
	const [visible, setVisible] = useState(false);
	const panelRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const DURATION = 300;

	// Entrada: espera un frame para que el navegador pinte el estado
	// inicial (translate-x-full / opacity-0) antes de disparar la transición
	useEffect(() => {
		const raf = requestAnimationFrame(() => setVisible(true));
		return () => cancelAnimationFrame(raf);
	}, []);

	// Focus en el input tras la entrada
	useEffect(() => {
		if (visible) inputRef.current?.focus();
	}, [visible]);

	function handleClose() {
		setVisible(false);
		setTimeout(onClose, DURATION);
	}

	// Cerrar con Escape
	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === 'Escape') handleClose();
		}
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return notifs;
		return notifs.filter(
			(n) =>
				n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q),
		);
	}, [notifs, query]);

	const unreadCount = notifs.filter((n) => !n.read).length;

	function markAllRead() {
		setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
	}

	function markRead(id: string) {
		setNotifs((prev) =>
			prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
		);
	}

	return (
		<>
			{/* Backdrop */}
			<div
				aria-hidden="true"
				onClick={handleClose}
				className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
					visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
				}`}
			/>

			{/* Panel */}
			<div
				ref={panelRef}
				role="dialog"
				aria-modal="true"
				aria-label="Notificaciones"
				className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-zinc-900/95 shadow-2xl shadow-black/60 backdrop-blur-md transition-transform duration-300 ease-in-out sm:border-l sm:border-white/10 ${
					visible ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				{/* Cabecera */}
				<div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
					<div className="flex items-center gap-2.5">
						<Bell className="h-6 w-6 text-white" aria-hidden="true" />
						<h2 className="text-base font-extrabold text-white">
							Notificaciones
						</h2>
						{unreadCount > 0 && (
							<span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-[10px] font-black text-white">
								{unreadCount}
							</span>
						)}
					</div>
					<div className="flex items-center gap-1">
						{unreadCount > 0 && (
							<Button
								type="button"
								variant="ghost"
								size="sm"
								onClick={markAllRead}
								aria-label="Marcar todas como leídas"
								className="border-0 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
							>
								<CheckCheck className="h-4.5 w-4.5" aria-hidden="true" />
								Leídas
							</Button>
						)}
						<Button
							type="button"
							variant="ghost"
							size="sm"
							onClick={handleClose}
							aria-label="Cerrar notificaciones"
							className="border-0 flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
						>
							<X className="h-6 w-6" aria-hidden="true" />
						</Button>
					</div>
				</div>

				{/* Buscador */}
				<div className="border-b border-white/10 px-4 py-3">
					<div className="flex items-center gap-2.5 rounded-xl bg-zinc-800 px-3.5 py-2.5 ring-1 ring-transparent transition-all focus-within:ring-red-500/60">
						<Search
							className="h-5 w-5 shrink-0 text-zinc-500"
							aria-hidden="true"
						/>
						<input
							ref={inputRef}
							type="search"
							placeholder="Buscar notificaciones…"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
						/>
						{query && (
							<Button
								type="button"
								variant="ghost"
								size="sm"
								aria-label="Limpiar búsqueda"
								onClick={() => setQuery('')}
								className="border-0 shrink-0 text-zinc-500 transition-colors hover:text-white"
							>
								<X className="h-4.5 w-4.5" aria-hidden="true" />
							</Button>
						)}
					</div>
				</div>

				{/* Lista */}
				<div className="flex-1 overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
					{filtered.length === 0 ? (
						<div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
							<Bell className="h-10 w-10 text-zinc-700" aria-hidden="true" />
							<p className="text-sm font-semibold text-zinc-500">
								{query
									? 'Sin resultados para tu búsqueda'
									: 'No tienes notificaciones'}
							</p>
						</div>
					) : (
						<ul role="list">
							{filtered.map((notif) => (
								<li key={notif.id}>
									<Button
										type="button"
										variant="ghost"
										size="sm"
										onClick={() => markRead(notif.id)}
										className={`border-0 group flex w-full items-start gap-3.5 px-5 py-4 text-left transition-colors hover:bg-white/5 ${
											notif.read ? 'opacity-60' : ''
										}`}
									>
										{/* Indicador de tipo */}
										<div className="relative mt-0.5 shrink-0">
											<span
												className={`flex h-9 w-9 items-center justify-center rounded-full text-lg ${TYPE_COLORS[notif.type]}/20`}
											>
												{notif.title.charAt(0)}
											</span>
											{!notif.read && (
												<span
													aria-label="No leída"
													className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-zinc-900"
												/>
											)}
										</div>

										{/* Texto */}
										<div className="min-w-0 flex-1">
											<p
												className={`text-sm leading-snug ${notif.read ? 'font-medium text-zinc-300' : 'font-bold text-white'}`}
											>
												{notif.title}
											</p>
											<p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-zinc-500">
												{notif.body}
											</p>
											<p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
												{notif.time}
											</p>
										</div>

										{/* Check al hover si no leída */}
										{!notif.read && (
											<Check
												className="mt-1 h-5 w-5 shrink-0 text-zinc-700 opacity-0 transition-opacity group-hover:opacity-100"
												aria-hidden="true"
											/>
										)}
									</Button>
									<div className="mx-5 h-px bg-white/5" />
								</li>
							))}
						</ul>
					)}
				</div>

				{/* Pie */}
				<div className="border-t border-white/10 px-5 py-3">
					<p className="text-center text-xs text-zinc-600">
						{notifs.length} notificaciones · {unreadCount} sin leer
					</p>
				</div>
			</div>
		</>
	);
}

// ---------------------------------------------------------------------------
// Datos de navegación
// ---------------------------------------------------------------------------

const NAV_LINKS = [
	{ label: 'Partidos', href: '/matches' },
	{ label: 'Highlights', href: '/highlights' },
	{ label: 'Documentales', href: '/documentaries' },
] as const;

// ---------------------------------------------------------------------------
// Drawer menú móvil
// ---------------------------------------------------------------------------

type MobileDrawerProps = {
	onClose: () => void;
	pathname: string;
	activeProfile: Profile | null;
};

function MobileDrawer({ onClose, pathname, activeProfile }: MobileDrawerProps) {
	const [visible, setVisible] = useState(false);
	const DURATION = 300;

	useEffect(() => {
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

	return (
		<>
			{/* Backdrop */}
			<div
				aria-hidden="true"
				onClick={handleClose}
				className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
					visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
				}`}
			/>

			{/* Drawer */}
			<div
				role="dialog"
				aria-modal="true"
				aria-label="Menú de navegación"
				className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-zinc-900/95 shadow-2xl shadow-black/60 backdrop-blur-md transition-transform duration-300 ease-in-out border-r border-white/10 ${
					visible ? 'translate-x-0' : '-translate-x-full'
				}`}
			>
				{/* Cabecera del drawer */}
				<div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
					<Link
						href="/"
						onClick={handleClose}
						aria-label="RFEF+ inicio"
						className="inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500"
					>
						<Image
							src="/images/logo.png"
							alt="Logo OTT"
							width={140}
							height={42}
							className="h-8 w-auto"
							priority
						/>
					</Link>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={handleClose}
						aria-label="Cerrar menú"
						className="border-0 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
					>
						<X className="h-5 w-5" aria-hidden="true" />
					</Button>
				</div>

				{/* Links de navegación */}
				<nav
					aria-label="Menú principal"
					className="flex-1 overflow-y-auto px-3 py-4"
				>
					<ul role="list" className="flex flex-col gap-1">
						{NAV_LINKS.map(({ label, href }) => {
							const isActive =
								pathname === href || pathname.startsWith(href + '/');
							return (
								<li key={href}>
									<Link
										href={href}
										aria-current={isActive ? 'page' : undefined}
										onClick={handleClose}
										className={[
											'flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition-colors',
											'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500',
											isActive
												? 'bg-red-600/15 text-red-400'
												: 'text-gray-300 hover:bg-white/5 hover:text-white',
										].join(' ')}
									>
										{label}
										<ChevronRight
											className={`h-5 w-5 transition-colors ${
												isActive ? 'text-red-400' : 'text-zinc-600'
											}`}
											aria-hidden="true"
										/>
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>

				{/* Perfil activo — pie del drawer */}
				<div className="border-t border-white/10 px-5 py-4">
					<Link
						href="/profiles"
						onClick={handleClose}
						className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
					>
						{activeProfile ? (
							<>
								<span
									className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base ${
										AVATAR_COLORS[activeProfile.avatarColor]?.bg ??
										'bg-zinc-700'
									}`}
								>
									{activeProfile.avatarEmoji ??
										activeProfile.name[0]?.toUpperCase()}
								</span>
								<div className="flex flex-col">
									<span className="text-sm font-semibold text-white">
										{activeProfile.name}
									</span>
									<span className="text-xs text-zinc-400">Cambiar perfil</span>
								</div>
							</>
						) : (
							<>
								<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-700">
									<User className="h-5 w-5 text-zinc-300" aria-hidden="true" />
								</span>
								<span className="text-sm font-semibold text-zinc-300">
									Seleccionar perfil
								</span>
							</>
						)}
					</Link>
				</div>
			</div>
		</>
	);
}

// ---------------------------------------------------------------------------
// Logo
// ---------------------------------------------------------------------------

function Logo() {
	return (
		<Link
			href="/"
			aria-label="RFEF+ inicio"
			className="inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500"
		>
			<Image
				src="/images/logo.png"
				alt="Logo OTT"
				width={160}
				height={48}
				className="h-9 w-auto"
				priority
			/>
		</Link>
	);
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

export function Navbar() {
	const pathname = usePathname();
	const router = useRouter();
	const [mobileOpen, setMobileOpen] = useState(false);
	const [notifOpen, setNotifOpen] = useState(false);
	const { activeProfile } = useProfiles();

	// Aumenta opacidad del fondo al hacer scroll — SSR-safe (dentro de useEffect)
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 10);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<>
			<header
				className={[
					'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
					scrolled
						? 'bg-black/95 shadow-lg shadow-black/50 backdrop-blur-md'
						: 'bg-linear-to-b from-black/80 to-transparent',
				].join(' ')}
			>
				<nav
					aria-label="Navegación principal"
					className="flex items-center justify-between px-4 py-3 md:px-8 lg:px-24"
				>
					{/* Logo ----------------------------------------------------------- */}
					<Logo />

					{/* Links — escritorio -------------------------------------------- */}
					<ul role="list" className="hidden items-center gap-1 md:flex">
						{NAV_LINKS.map(({ label, href }) => {
							const isActive =
								pathname === href || pathname.startsWith(href + '/');
							return (
								<li key={href}>
									<Link
										href={href}
										aria-current={isActive ? 'page' : undefined}
										className={[
											'relative px-4 py-2 text-sm font-semibold transition-colors',
											'rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500',
											isActive
												? 'text-red-500'
												: 'text-gray-300 hover:text-white',
										].join(' ')}
									>
										{label}
										{/* Indicador activo */}
										{isActive && (
											<span
												aria-hidden="true"
												className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-red-500"
											/>
										)}
									</Link>
								</li>
							);
						})}
					</ul>

					{/* Iconos de acción ---------------------------------------------- */}
					<div className="flex items-center gap-1">
						{/* Buscador */}
						<Button
							type="button"
							variant="ghost"
							size="sm"
							aria-label="Buscar"
							onClick={() => router.push('/search')}
							className="border-0 p-0 aspect-square flex h-10 w-10 items-center justify-center rounded-full text-gray-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
						>
							<Search className="h-8 w-8" aria-hidden="true" />
						</Button>

						{/* Notificaciones */}
						<Button
							type="button"
							variant="ghost"
							size="sm"
							aria-label="Notificaciones"
							aria-expanded={notifOpen}
							onClick={() => setNotifOpen(true)}
							className="border-0 p-0 aspect-square relative flex h-10 w-10 items-center justify-center rounded-full text-gray-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
						>
							<Bell className="h-8 w-8" aria-hidden="true" />
							{/* Punto indicador de notificación nueva */}
							<span
								aria-hidden="true"
								className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-black"
							/>
						</Button>

						{/* Usuario — navega a /profiles */}
						<Button
							type="button"
							variant="ghost"
							size="sm"
							aria-label={
								activeProfile
									? `Cambiar perfil (${activeProfile.name})`
									: 'Seleccionar perfil'
							}
							onClick={() => router.push('/profiles')}
							className={`border-0 p-0 aspect-square ml-1 hidden h-10 w-10 items-center justify-center overflow-hidden rounded-full text-white transition-all hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 md:flex ${
								activeProfile
									? `${AVATAR_COLORS[activeProfile.avatarColor].bg} ring-2 ring-white/30`
									: 'bg-red-600 hover:bg-red-700'
							}`}
						>
							{activeProfile ? (
								<span className="text-base leading-none">
									{activeProfile.avatarEmoji ??
										activeProfile.name.charAt(0).toUpperCase()}
								</span>
							) : (
								<User className="h-8 w-8" aria-hidden="true" />
							)}
						</Button>

						{/* Menú hamburguesa — solo móvil */}
						<Button
							type="button"
							variant="ghost"
							size="sm"
							aria-label="Abrir menú"
							aria-expanded={mobileOpen}
							onClick={() => setMobileOpen(true)}
							className="border-0 p-0 aspect-square ml-1 flex h-9 w-9 items-center justify-center rounded-full text-gray-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 md:hidden"
						>
							<Menu className="h-6 w-6" aria-hidden="true" />
						</Button>
					</div>
				</nav>
			</header>

			{/* Panel de notificaciones — fuera del header para el z-index correcto */}
			{notifOpen && <NotificationsPanel onClose={() => setNotifOpen(false)} />}

			{/* Drawer menú móvil — fuera del header para el z-index correcto */}
			{mobileOpen && (
				<MobileDrawer
					onClose={() => setMobileOpen(false)}
					pathname={pathname}
					activeProfile={activeProfile}
				/>
			)}
		</>
	);
}

'use client';

import {
	AdPlayer,
	Alert,
	AppShell,
	AspectRatio,
	BottomSheet,
	Button,
	Card,
	CollectionCard,
	Container,
	ContentCard,
	ContentCarousel,
	ContentDetail,
	ContentRow,
	Divider,
	EpisodeCard,
	FeaturedCard,
	Footer,
	GenreNavigation,
	Grid,
	Header,
	HeroBanner,
	LikeButton,
	LoadingSpinner,
	LoginForm,
	MainLayout,
	Modal,
	NotificationBell,
	PageLayout,
	Pagination,
	PlayerOverlay,
	ProfileMenu,
	Progress,
	PromotionBanner,
	ScrollableArea,
	SearchBar,
	SearchInput,
	SearchResults,
	Section,
	showToast,
	SideNavigation,
	Skeleton,
	Spacer,
	Stack,
	Tabs,
	TextInput,
	ToastNotification,
	TopNavigation,
	TrendingRow,
	useDebouncedState,
	useDebouncedValue,
	useInterval,
	useListState,
	UserAvatar,
	useSetState,
	useThrottledValue,
	useTimeout,
	useToggle,
	VideoPlayer,
} from '@repo/ui-react';
import Image from 'next/image';
import { useState } from 'react';
import { OttDetailSection } from './components/OttDetailSection';
import { OttHomeSection } from './components/OttHomeSection';

export default function Home() {
	const { value, toggle } = useToggle(false);
	const [query, setQuery] = useState('');
	const debouncedQuery = useDebouncedValue(query, 500);
	const throttledQuery = useThrottledValue(query, 500);
	const [delayedName, setDelayedName] = useDebouncedState('', 600);
	const [ticks, setTicks] = useState(0);
	const [timeoutMessage, setTimeoutMessage] = useState('inactivo');
	const progressValue = Math.min(100, ticks * 10);
	const profile = useSetState({ title: 'Perfil OTT', editable: true });
	const quickFilters = useListState<string>(['Acción', 'Drama']);
	const [sheetOpen, setSheetOpen] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [activeTopNav, setActiveTopNav] = useState('home');
	const [activeTab, setActiveTab] = useState('all');
	const [activeGenre, setActiveGenre] = useState('sci-fi');
	const [currentPage, setCurrentPage] = useState(1);

	const interval = useInterval(() => {
		setTicks((previous) => previous + 1);
	}, 1000);

	const timeout = useTimeout(() => {
		setTimeoutMessage('completado');
	}, 2000);

	const layoutDemoItems = [
		'Card A',
		'Card B',
		'Card C',
		'Card D',
		'Card E',
		'Card F',
	];
	const navItems = [
		{ id: 'home', label: 'Inicio' },
		{ id: 'series', label: 'Series' },
		{ id: 'movies', label: 'Películas' },
		{ id: 'kids', label: 'Kids' },
	];
	const tabItems = [
		{ id: 'all', label: 'Todos' },
		{ id: 'continue', label: 'Continuar' },
		{ id: 'trending', label: 'Tendencias' },
	];
	const genreItems = [
		{ id: 'sci-fi', label: 'Sci‑Fi' },
		{ id: 'drama', label: 'Drama' },
		{ id: 'action', label: 'Acción' },
	];
	const searchResultsItems = [
		{
			id: 'r1',
			title: 'The Last Horizon',
			description: 'Serie · 2 temporadas',
		},
		{ id: 'r2', title: 'Nova District', description: 'Película · 2026' },
		{ id: 'r3', title: 'Echoes of Titan', description: 'Serie · 1 temporada' },
	];

	return (
		<AppShell
			header={
				<div className="border-b border-surface-border px-4 py-3 text-sm font-semibold">
					Demo AppShell (Web)
				</div>
			}
			footer={
				<div className="border-t border-surface-border px-4 py-3 text-xs text-zinc-600 dark:text-zinc-400">
					Footer AppShell
				</div>
			}
		>
			<MainLayout>
				<PageLayout
					title="Integración de @repo/ui en Web"
					description="Demo continua de hooks y componentes OTT"
				>
					<Container>
						<Section
							title="Navigation demo"
							description="Prueba de navegación base (web)"
						>
							<Stack gap={12}>
								<Header
									logo={<span className="text-sm font-bold">OTT UI</span>}
									actions={
										<ProfileMenu
											label="Perfil"
											items={[
												{ id: 'account', label: 'Cuenta' },
												{ id: 'settings', label: 'Ajustes' },
											]}
											onSelect={(id) =>
												showToast(`Perfil: ${id}`, { variant: 'info' })
											}
										/>
									}
								>
									<TopNavigation
										items={navItems}
										activeId={activeTopNav}
										onChange={setActiveTopNav}
									/>
								</Header>
								<div className="grid gap-3 lg:grid-cols-[220px_1fr]">
									<SideNavigation
										items={navItems}
										activeId={activeTopNav}
										onChange={setActiveTopNav}
									/>
									<div className="flex flex-col gap-3">
										<SearchBar
											onSearch={(value) =>
												showToast(`Buscar: ${value}`, { variant: 'success' })
											}
										/>
										<Tabs
											items={tabItems}
											activeId={activeTab}
											onChange={setActiveTab}
										/>
										<GenreNavigation
											items={genreItems}
											activeId={activeGenre}
											onChange={setActiveGenre}
										/>
										<SearchResults
											items={searchResultsItems}
											onSelect={(id) =>
												showToast(`Resultado ${id}`, { variant: 'default' })
											}
										/>
										<Pagination
											page={currentPage}
											totalPages={5}
											onPageChange={setCurrentPage}
										/>
									</div>
								</div>
								<Footer>Footer de navegación</Footer>
							</Stack>
						</Section>

						<Section
							title="Layout demo"
							description="Prueba rápida de nuevos componentes de layout"
						>
							<Stack gap={12}>
								<Grid minItemWidth={180} gap={12}>
									{layoutDemoItems.map((item) => (
										<Card key={item} className="p-3">
											{item}
										</Card>
									))}
								</Grid>
								<Divider />
								<AspectRatio
									ratio={16 / 5}
									className="border border-surface-border bg-surface-muted p-2"
								>
									<div className="flex h-full items-center justify-center text-sm text-zinc-600 dark:text-zinc-400">
										AspectRatio 16:5
									</div>
								</AspectRatio>
								<ScrollableArea maxHeight={120} className="p-2">
									<Stack gap={8}>
										{Array.from({ length: 8 }, (_, index) => (
											<div
												key={index}
												className="rounded-md border border-surface-border p-2 text-sm"
											>
												Scrollable item {index + 1}
											</div>
										))}
									</Stack>
								</ScrollableArea>
								<Spacer size={4} />
							</Stack>
						</Section>

						<Section
							title="OTT blocks demo"
							description="Discovery, browsing y cards base"
						>
							<Grid minItemWidth={220} gap={12}>
								<HeroBanner
									tag="Estreno"
									title="Hero principal"
									subtitle="Contenido promocionado de portada"
									ctaLabel="Ver ahora"
									onCtaClick={() => showToast('Reproducir hero', { variant: 'success' })}
								/>
								<FeaturedCard
									title="Destacado"
									subtitle="Título recomendado por perfil"
									meta="4.8 ★"
								/>
								<PromotionBanner
									title="Promoción"
									subtitle="50% primer mes"
									ctaLabel="Activar"
								/>
								<ContentRow
									title="Fila de contenidos"
									items={[
										'Mini card A',
										'Mini card B',
										'Mini card C',
									]}
								/>
								<ContentCarousel
									title="Carrusel"
									items={['Slide 1', 'Slide 2', 'Slide 3']}
								/>
								<TrendingRow
									title="Tendencias"
									items={['Top 1', 'Top 2', 'Top 3']}
								/>
								<ContentCard
									title="ContentCard"
									subtitle="Card estándar"
									meta="Película"
									progress={45}
								/>
								<EpisodeCard
									title="EpisodeCard"
									subtitle="Episodio S1E1"
									progress={70}
								/>
								<CollectionCard
									title="CollectionCard"
									subtitle="Colección editorial"
								/>
							</Grid>
						</Section>

						<Section
							title="OTT advanced demo"
							description="Detail, player, account, ads, auth y estados"
						>
							<Grid minItemWidth={220} gap={12}>
								<ContentDetail
									title="Inception"
									subtitle="Director: Christopher Nolan"
									imageUrl="https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&h=300&fit=crop"
									rating="8.8"
									year="2010"
									duration="148 min"
									genres={['Sci-Fi', 'Thriller', 'Action']}
									description="A skilled thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea."
									meta={[
										{ label: 'Áudio', value: 'Español, English' },
										{ label: 'Subtítulos', value: '8 idiomas' },
										{ label: 'Clasificación', value: 'PG-13' },
									]}
									ctaLabel="▶ Reproducir ahora"
									onCtaClick={() => showToast({ message: 'Reproduciendo Inception', type: 'success' })}
								/>
								<VideoPlayer
									title="Inception PG-13 • 2h 28m"
									isPlaying={false}
									currentTime={0}
									duration={8880}
									volume={75}
									onPlayPauseClick={() => showToast({ message: 'Toggle play', type: 'success' })}
									onSeek={(time) => showToast({ message: `Seek to ${time}s`, type: 'info' })}
									onVolumeChange={(vol) => showToast({ message: `Volume: ${vol}%`, type: 'info' })}
								/>
								<PlayerOverlay title="PlayerOverlay">
									Controles superpuestos
								</PlayerOverlay>
								<UserAvatar title="UserAvatar">Perfil activo</UserAvatar>
								<LikeButton title="LikeButton">Interacción social</LikeButton>
								<SearchInput title="SearchInput">
									Entrada de búsqueda avanzada
								</SearchInput>
								<NotificationBell title="NotificationBell">
									Centro de notificaciones
								</NotificationBell>
								<AdPlayer title="AdPlayer">Bloque de publicidad</AdPlayer>
								<LoadingSpinner title="LoadingSpinner">
									Estado de carga
								</LoadingSpinner>
								<LoginForm title="LoginForm">Acceso de usuario</LoginForm>
							</Grid>
						</Section>
					</Container>

					<div className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between bg-white px-16 py-32 dark:bg-black sm:items-start">
						<Image
							className="dark:invert"
							src="/next.svg"
							alt="Next.js logo"
							width={100}
							height={20}
							priority
						/>
						<div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
							<h1 className="max-w-xs text-3xl leading-10 font-semibold tracking-tight text-black dark:text-zinc-50">
								Integración de @repo/ui en Web
							</h1>
							<p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
								Estado actual de useToggle:{' '}
								<strong>{value ? 'activo' : 'inactivo'}</strong>
							</p>
						</div>
						<div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
							<Button onClick={toggle} variant="primary" size="md">
								Toggle estado
							</Button>
							<Button variant="secondary" size="md">
								Botón secundario
							</Button>
						</div>

						<Card className="w-full max-w-xl">
							<div className="flex flex-col gap-4">
								<h2 className="text-lg font-semibold text-surface-foreground">
									Paso continuo: hooks + componentes
								</h2>

								<div className="flex flex-col gap-2">
									<label
										htmlFor="search"
										className="text-sm font-medium text-surface-foreground"
									>
										useDebouncedValue (500ms)
									</label>
									<input
										id="search"
										value={query}
										onChange={(event) => setQuery(event.currentTarget.value)}
										placeholder="Escribe para debouncing..."
										className="rounded-md border border-surface-border bg-surface-background px-3 py-2 text-sm text-surface-foreground"
									/>
									<p className="text-sm text-zinc-600 dark:text-zinc-400">
										valor inmediato: <strong>{query || '—'}</strong> | valor
										debounced: <strong>{debouncedQuery || '—'}</strong> | valor
										throttled: <strong>{throttledQuery || '—'}</strong>
									</p>
								</div>

								<TextInput
									label="useDebouncedState (600ms)"
									placeholder="Escribe un nombre de perfil"
									onChange={(event) =>
										setDelayedName(event.currentTarget.value)
									}
								/>
								<p className="text-sm text-surface-foreground">
									resultado debounced state:{' '}
									<strong>{delayedName || '—'}</strong>
								</p>

								<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
									<p className="text-sm text-surface-foreground">
										useInterval: <strong>{ticks}</strong> segundos
									</p>
									<div className="w-full sm:w-56">
										<Progress value={progressValue} />
									</div>
									<div className="flex gap-2">
										<Button onClick={interval.start} size="sm">
											Iniciar
										</Button>
										<Button
											onClick={interval.stop}
											variant="secondary"
											size="sm"
										>
											Parar
										</Button>
									</div>
								</div>

								<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
									<p className="text-sm text-surface-foreground">
										useTimeout: <strong>{timeoutMessage}</strong>
									</p>
									<div className="flex gap-2">
										<Button
											onClick={() => {
												setTimeoutMessage('esperando...');
												timeout.start();
											}}
											size="sm"
										>
											Lanzar timeout
										</Button>
										<Button onClick={timeout.clear} variant="ghost" size="sm">
											Cancelar
										</Button>
									</div>
								</div>

								<Alert
									title="Estado de perfil"
									variant={profile.state.editable ? 'success' : 'warning'}
								>
									{profile.state.title} · editable:{' '}
									{profile.state.editable ? 'sí' : 'no'}
								</Alert>

								<div className="flex flex-wrap gap-2">
									<Button
										size="sm"
										onClick={() =>
											profile.setState((current) => ({
												editable: !current.editable,
											}))
										}
									>
										Toggle editable
									</Button>
									<Button
										size="sm"
										variant="secondary"
										onClick={() => profile.setState({ title: 'Perfil Kids' })}
									>
										Cambiar título
									</Button>
									<Button size="sm" variant="ghost" onClick={profile.reset}>
										Reset perfil
									</Button>
								</div>

								<div className="flex flex-col gap-2">
									<p className="text-sm text-surface-foreground">
										Filtros (useListState): {quickFilters.values.join(', ')}
									</p>
									<div className="flex flex-wrap gap-2">
										<Button
											size="sm"
											onClick={() => quickFilters.append('Comedia')}
										>
											Añadir
										</Button>
										<Button
											size="sm"
											variant="secondary"
											onClick={() => quickFilters.remove(0)}
										>
											Quitar primero
										</Button>
										<Button
											size="sm"
											variant="ghost"
											onClick={() =>
												quickFilters.reorder(
													0,
													Math.max(quickFilters.values.length - 1, 0),
												)
											}
										>
											Mover primero al final
										</Button>
									</div>
								</div>

								<div className="flex flex-col gap-2">
									<p className="text-sm text-surface-foreground">
										Skeleton demo
									</p>
									<Skeleton height={12} width="80%" />
									<Skeleton height={12} width="60%" />
								</div>
							</div>
						</Card>

						<OttDetailSection onOpenOptions={() => setSheetOpen(true)} />
						<OttHomeSection />

						<div className="w-full max-w-xl">
							<div className="flex flex-wrap gap-2">
								<Button onClick={() => setSheetOpen(true)} size="md">
									Abrir BottomSheet (web)
								</Button>
								<Button
									onClick={() => setModalOpen(true)}
									variant="secondary"
									size="md"
								>
									Abrir Modal (web)
								</Button>
								<Button
									onClick={() =>
										showToast('Toast lanzado', {
											description: 'Notificación de ejemplo con sonner',
											variant: 'success',
										})
									}
									variant="ghost"
									size="md"
								>
									Lanzar Toast (web)
								</Button>
							</div>
						</div>

						<BottomSheet
							open={sheetOpen}
							onOpenChange={setSheetOpen}
							title="BottomSheet con contenido web"
							defaultSnap={({ maxHeight }) => Math.min(420, maxHeight * 0.7)}
						>
							<p className="text-sm text-surface-foreground">
								Cada framework puede tener contenido distinto. En web puedes
								poner filtros, acciones rápidas o detalles de un contenido OTT.
							</p>
							<div className="flex flex-wrap gap-2">
								<Button size="sm" onClick={() => setSheetOpen(false)}>
									Cerrar
								</Button>
								<Button size="sm" variant="secondary">
									Acción primaria
								</Button>
							</div>
						</BottomSheet>

						<Modal
							open={modalOpen}
							onOpenChange={setModalOpen}
							title="Modal OTT (web)"
						>
							<p className="text-sm text-surface-foreground">
								Úsalo para consentimientos, promociones, advertencias de
								contenido o autenticación antes de reproducir.
							</p>
							<div className="flex flex-wrap gap-2">
								<Button size="sm" onClick={() => setModalOpen(false)}>
									Continuar
								</Button>
								<Button
									size="sm"
									variant="ghost"
									onClick={() => setModalOpen(false)}
								>
									Cancelar
								</Button>
							</div>
						</Modal>

						<ToastNotification position="bottom-right" />
					</div>
				</PageLayout>
			</MainLayout>
		</AppShell>
	);
}

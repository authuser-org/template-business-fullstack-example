// ---------------------------------------------------------------------------
// Tipos de dominio OTT
// ---------------------------------------------------------------------------

export type ContentBadge = 'live' | 'new' | 'upcoming';

export type ContentItem = {
	id: string;
	title: string;
	/** Categoría o competición */
	label: string;
	/** HH:MM o duración legible */
	duration?: string;
	thumbnail: string;
	href: string;
	badge?: ContentBadge;
};

export type OttRowConfig = {
	id: string;
	title: string;
	items: ContentItem[];
};

// ---------------------------------------------------------------------------
// Helper para URLs de placeholder (placehold.co)
// ---------------------------------------------------------------------------

function thumb(
	w: number,
	h: number,
	bg: string = '18181b',
	text: string = 'ffffff',
): string {
	return `https://placehold.co/${w}x${h}/${bg}/${text}`;
}

// ---------------------------------------------------------------------------
// Hero slides
// ---------------------------------------------------------------------------

export const HERO_SLIDES: any[] = [
	{
		id: 'hero-1',
		title: 'España vs Francia',
		result: {
			score: '2 - 1',
			team1: 'España',
			team2: 'Francia',
		},
		currentTime: '30:45',
		subtitle: 'UEFA Nations League · Semifinal',
		description:
			'El combinado nacional se enfrenta a los Bleus en una noche histórica. No te pierdas ni un segundo.',
		image: '/images/dos.jpeg',
		isLive: true,
		ctaPrimary: { label: 'Ver en directo', href: '/video' },
		ctaSecondary: { label: 'Más info', href: '/partidos/esp-fra' },
		video:
			'https://rfef-ondemand.flumotion.com/outgoing/video/mp4/med/resumen-espa-a-francia-nations-league-68421627.mp4',
	},
	{
		id: 'hero-2',
		title: 'La Roja tiene nuevo entrenador',
		subtitle: 'Documental exclusivo',
		description:
			'Accede al documental que muestra los primeros 90 días del nuevo cuerpo técnico de la Selección.',
		image: '/images/uno.jpeg',
		ctaPrimary: {
			label: 'Ver ahora',
			href: '/video',
		},
	},
	{
		id: 'hero-3',
		title: 'Selección Femenina · Eurocopa 2025',
		subtitle: 'Vuelta a cuartos de final',
		description:
			'Las campeonas del mundo buscan su pase a semifinales. Aquí el reparto del encuentro completo.',
		image: '/images/tres.jpeg',
		ctaPrimary: { label: 'Ver partido', href: '/video' },
		ctaSecondary: {
			label: 'Todos los partidos',
			href: '/video',
		},
	},
];

// ---------------------------------------------------------------------------
// Rows OTT
// ---------------------------------------------------------------------------

const LIVE_ITEMS: ContentItem[] = [
	{
		id: 'live-1',
		title: 'España vs Polonia',
		label: 'Clasificación Mundial',
		thumbnail: thumb(400, 225, '1c1c1e'),
		href: '/video',
		badge: 'live',
	},
	{
		id: 'live-2',
		title: 'Sub-21: Portugal vs España',
		label: 'Eurocopa Sub-21',
		thumbnail: thumb(400, 225, '1c1c1e'),
		href: '/video',
		badge: 'live',
	},
	{
		id: 'live-3',
		title: 'Fútbol Sala: España vs Italia',
		label: 'Élite Round UEFA',
		thumbnail: thumb(400, 225, '1c1c1e'),
		href: '/video',
		badge: 'live',
	},
	{
		id: 'live-4',
		title: 'Selección Femenina vs Suecia',
		label: 'Amistoso internacional',
		thumbnail: thumb(400, 225, '1c1c1e'),
		href: '/video',
		badge: 'live',
	},
	{
		id: 'live-5',
		title: 'España Sub-19 vs Países Bajos',
		label: 'Campeonato de Europa Sub-19',
		thumbnail: thumb(400, 225, '1c1c1e'),
		href: '/video',
		badge: 'live',
	},
	{
		id: 'live-6',
		title: 'LNFS: Barça vs Movistar Inter',
		label: 'Liga Nacional Fútbol Sala · Final',
		thumbnail: thumb(400, 225, '1c1c1e'),
		href: '/video',
		badge: 'live',
	},
];

const RECENT_ITEMS: ContentItem[] = [
	{
		id: 'rec-1',
		title: 'España vs Croacia',
		label: 'UEFA Nations League',
		duration: '95:12',
		thumbnail: thumb(400, 225, '27272a'),
		href: '/video',
	},
	{
		id: 'rec-2',
		title: 'Alemania vs España',
		label: 'Amistoso internacional',
		duration: '91:40',
		thumbnail: thumb(400, 225, '27272a'),
		href: '/video',
	},
	{
		id: 'rec-3',
		title: 'España vs Brasil',
		label: 'Amistoso internacional',
		duration: '90:00',
		thumbnail: thumb(400, 225, '27272a'),
		href: '/video',
	},
	{
		id: 'rec-4',
		title: 'España vs Argentina',
		label: 'Amistoso Finidi XI',
		duration: '93:05',
		thumbnail: thumb(400, 225, '27272a'),
		href: '/video',
	},
	{
		id: 'rec-5',
		title: 'España vs Colombia',
		label: 'Amistoso de preparación',
		duration: '90:00',
		thumbnail: thumb(400, 225, '27272a'),
		href: '/video',
	},
	{
		id: 'rec-6',
		title: 'Italia vs España',
		label: 'UEFA Nations League · Cuartos',
		duration: '120:00',
		thumbnail: thumb(400, 225, '27272a'),
		href: '/video',
	},
	{
		id: 'rec-7',
		title: 'España vs Suiza',
		label: 'Clasificación Eurocopa 2028',
		duration: '92:30',
		thumbnail: thumb(400, 225, '27272a'),
		href: '/video',
	},
	{
		id: 'rec-8',
		title: 'Dinamarca vs España',
		label: 'Clasificación Eurocopa 2028',
		duration: '90:00',
		thumbnail: thumb(400, 225, '27272a'),
		href: '/video',
	},
];

const SELECCION_ITEMS: ContentItem[] = [
	{
		id: 'sel-1',
		title: 'La convocatoria más esperada',
		label: 'Documental · Capítulo 1',
		duration: '28:34',
		thumbnail: thumb(400, 225, '1a1a2e'),
		href: '/video',
		badge: 'new',
	},
	{
		id: 'sel-2',
		title: 'Spain at the Euros: Behind the Scenes',
		label: 'Documental · Capítulo 2',
		duration: '31:12',
		thumbnail: thumb(400, 225, '16213e'),
		href: '/video',
	},
	{
		id: 'sel-3',
		title: 'Sesión de entrenamiento abierta · Marzo 2025',
		label: 'Training session',
		duration: '18:00',
		thumbnail: thumb(400, 225, '0f3460'),
		href: '/video',
	},
	{
		id: 'sel-4',
		title: '50 años de La Roja: Historia',
		label: 'Archivo histórico',
		duration: '44:20',
		thumbnail: thumb(400, 225, '1a1a2e'),
		href: '/video',
	},
	{
		id: 'sel-5',
		title: 'Rueda de prensa: previa al Mundial',
		label: 'Conferencia de prensa',
		duration: '22:10',
		thumbnail: thumb(400, 225, '16213e'),
		href: '/video',
		badge: 'new',
	},
	{
		id: 'sel-6',
		title: 'Goles históricos de La Roja',
		label: 'Archivo · Top 50',
		duration: '38:00',
		thumbnail: thumb(400, 225, '0f3460'),
		href: '/video',
	},
	{
		id: 'sel-7',
		title: 'El camino a la Nations League',
		label: 'Resumen de temporada',
		duration: '25:55',
		thumbnail: thumb(400, 225, '1a1a2e'),
		href: '/video',
	},
];

const FEMENINA_ITEMS: ContentItem[] = [
	{
		id: 'sfem-1',
		title: 'Eurocopa 2025 · Cuartos de Final',
		label: 'España vs Noruega',
		duration: '93:14',
		thumbnail: thumb(400, 225, '2d1b69'),
		href: '/video',
		badge: 'new',
	},
	{
		id: 'sfem-2',
		title: 'Liga F: Barça vs Real Madrid',
		label: 'Liga F · Jornada 22',
		duration: '90:00',
		thumbnail: thumb(400, 225, '1e1b4b'),
		href: '/video',
	},
	{
		id: 'sfem-3',
		title: 'Amistoso: España vs EE.UU.',
		label: 'Amistoso internacional',
		duration: '92:00',
		thumbnail: thumb(400, 225, '312e81'),
		href: '/video',
	},
	{
		id: 'sfem-4',
		title: 'La Roja Femenina: Camino al oro',
		label: 'Serie documental',
		duration: '38:50',
		thumbnail: thumb(400, 225, '2d1b69'),
		href: '/video',
	},
	{
		id: 'sfem-5',
		title: 'España vs Alemania · Semifinal Eurocopa',
		label: 'Eurocopa Femenina 2025',
		duration: '95:00',
		thumbnail: thumb(400, 225, '1e1b4b'),
		href: '/video',
		badge: 'new',
	},
	{
		id: 'sfem-6',
		title: 'Top Jugadoras de La Roja 2025',
		label: 'Especial temporada',
		duration: '19:30',
		thumbnail: thumb(400, 225, '312e81'),
		href: '/video',
	},
	{
		id: 'sfem-7',
		title: 'Liga F: Atlético vs Levante',
		label: 'Liga F · Play-off',
		duration: '90:00',
		thumbnail: thumb(400, 225, '2d1b69'),
		href: '/video',
	},
];

const SALA_ITEMS: ContentItem[] = [
	{
		id: 'sala-1',
		title: 'España vs Kazajistán',
		label: 'Clasificación Copa del Mundo',
		duration: '80:00',
		thumbnail: thumb(400, 225, '14532d'),
		href: '/video',
		badge: 'new',
	},
	{
		id: 'sala-2',
		title: 'LNFS: ElPozo vs Barça',
		label: 'Liga Nacional · Semifinal',
		duration: '80:00',
		thumbnail: thumb(400, 225, '166534'),
		href: '/video',
	},
	{
		id: 'sala-3',
		title: 'España Sub-20 vs Portugal',
		label: 'Copa Ibérica',
		duration: '80:00',
		thumbnail: thumb(400, 225, '14532d'),
		href: '/video',
	},
	{
		id: 'sala-4',
		title: 'Mejor Futsal del Año 2024',
		label: 'Momentazos',
		duration: '12:30',
		thumbnail: thumb(400, 225, '052e16'),
		href: '/video',
	},
	{
		id: 'sala-5',
		title: 'España vs Rusia · Final Copa del Mundo Sala',
		label: 'Copa del Mundo Fútbol Sala 2025',
		duration: '80:00',
		thumbnail: thumb(400, 225, '14532d'),
		href: '/video',
		badge: 'new',
	},
	{
		id: 'sala-6',
		title: 'LNFS: Movistar Inter vs Industrias Santa Coloma',
		label: 'Liga Nacional · Final',
		duration: '80:00',
		thumbnail: thumb(400, 225, '166534'),
		href: '/video',
	},
	{
		id: 'sala-7',
		title: 'Top 10 Goles Fútbol Sala 2024',
		label: 'Momentazos RFEF',
		duration: '08:45',
		thumbnail: thumb(400, 225, '052e16'),
		href: '/video',
	},
];

const DOC_ITEMS: ContentItem[] = [
	{
		id: 'doc-1',
		title: 'Una vida de rojo',
		label: 'Serie documental · 6 episodios',
		duration: '45:00',
		thumbnail: thumb(400, 225, '431407'),
		href: '/video',
		badge: 'new',
	},
	{
		id: 'doc-2',
		title: 'El camino al Mundial 2030',
		label: 'Documental',
		duration: '52:14',
		thumbnail: thumb(400, 225, '431407'),
		href: '/video',
	},
	{
		id: 'doc-3',
		title: 'Iker Casillas: El último partido',
		label: 'Documental biográfico',
		duration: '68:00',
		thumbnail: thumb(400, 225, '3b0764'),
		href: '/video',
	},
	{
		id: 'doc-4',
		title: 'Xavi entrenador: Año 1',
		label: 'Serie documental',
		duration: '35:00',
		thumbnail: thumb(400, 225, '1e1b4b'),
		href: '/video',
	},
	{
		id: 'doc-5',
		title: 'Campeones del Mundo: Euro 2024',
		label: 'Documental oficial',
		duration: '74:00',
		thumbnail: thumb(400, 225, '431407'),
		href: '/video',
	},
	{
		id: 'doc-6',
		title: 'Andrés Iniesta: El artista invisible',
		label: 'Documental biográfico',
		duration: '82:00',
		thumbnail: thumb(400, 225, '3b0764'),
		href: '/video',
		badge: 'new',
	},
	{
		id: 'doc-7',
		title: 'La generación dorada 2008–2012',
		label: 'Documental histórico',
		duration: '95:00',
		thumbnail: thumb(400, 225, '431407'),
		href: '/video',
	},
	{
		id: 'doc-8',
		title: 'David Villa: El Guaje',
		label: 'Documental biográfico',
		duration: '71:00',
		thumbnail: thumb(400, 225, '1e1b4b'),
		href: '/video',
	},
];

// ---------------------------------------------------------------------------
// Highlights
// ---------------------------------------------------------------------------

const HIGHLIGHTS_ITEMS: ContentItem[] = [
	{
		id: 'hl-1',
		title: 'Resumen: España vs Francia 2-1',
		label: 'UEFA Nations League · Semifinal',
		duration: '08:22',
		thumbnail: thumb(400, 225, '1c1917'),
		href: '/video',
		badge: 'new',
	},
	{
		id: 'hl-2',
		title: 'Los 5 mejores goles de Yamal en 2025',
		label: 'Especial Yamal',
		duration: '04:55',
		thumbnail: thumb(400, 225, '1c1917'),
		href: '/video',
	},
	{
		id: 'hl-3',
		title: 'Resumen: Alemania vs España 0-3',
		label: 'Amistoso internacional',
		duration: '07:10',
		thumbnail: thumb(400, 225, '1c1917'),
		href: '/video',
	},
	{
		id: 'hl-4',
		title: 'Top 10 paradas de Unai Simón',
		label: 'Especial porteros',
		duration: '05:30',
		thumbnail: thumb(400, 225, '1c1917'),
		href: '/video',
	},
	{
		id: 'hl-5',
		title: 'Hat-trick de Morata ante Brasil',
		label: 'Amistoso internacional',
		duration: '03:45',
		thumbnail: thumb(400, 225, '1c1917'),
		href: '/video',
	},
	{
		id: 'hl-6',
		title: 'Resumen: España Sub-21 vs Italia',
		label: 'Eurocopa Sub-21 · Semifinal',
		duration: '06:50',
		thumbnail: thumb(400, 225, '1c1917'),
		href: '/video',
	},
	{
		id: 'hl-7',
		title: 'Los mejores momentos del Euro 2024',
		label: 'Archivo',
		duration: '12:00',
		thumbnail: thumb(400, 225, '1c1917'),
		href: '/video',
	},
];

// ---------------------------------------------------------------------------
// Próximos partidos
// ---------------------------------------------------------------------------

const UPCOMING_ITEMS: ContentItem[] = [
	{
		id: 'up-1',
		title: 'España vs Países Bajos',
		label: 'UEFA Nations League · Final',
		thumbnail: thumb(400, 225, '0c0a09'),
		href: '/video',
		badge: 'upcoming',
	},
	{
		id: 'up-2',
		title: 'España vs Portugal',
		label: 'Clasificación Mundial 2030',
		thumbnail: thumb(400, 225, '0c0a09'),
		href: '/video',
		badge: 'upcoming',
	},
	{
		id: 'up-3',
		title: 'Selección Femenina vs Inglaterra',
		label: 'Eurocopa Femenina 2025 · Final',
		thumbnail: thumb(400, 225, '0c0a09'),
		href: '/video',
		badge: 'upcoming',
	},
	{
		id: 'up-4',
		title: 'España Sub-21 vs Francia Sub-21',
		label: 'Eurocopa Sub-21 · Final',
		thumbnail: thumb(400, 225, '0c0a09'),
		href: '/video',
		badge: 'upcoming',
	},
	{
		id: 'up-5',
		title: 'España vs Bélgica',
		label: 'Clasificación Mundial 2030',
		thumbnail: thumb(400, 225, '0c0a09'),
		href: '/video',
		badge: 'upcoming',
	},
	{
		id: 'up-6',
		title: 'España Sala vs Brasil Sala',
		label: 'Copa del Mundo Fútbol Sala · Semifinal',
		thumbnail: thumb(400, 225, '0c0a09'),
		href: '/video',
		badge: 'upcoming',
	},
];

// ---------------------------------------------------------------------------
// Banner destacado
// ---------------------------------------------------------------------------

export const FEATURED_BANNER_DATA = {
	title: 'Final del Mundial 2026 · España vs Argentina',
	label: 'Copa del Mundo FIFA 2026',
	description:
		'La Roja busca su cuarta estrella ante la campeona vigente en el MetLife Stadium de Nueva York. Una final histórica, solo en RFEF+.',
	image: '/images/dos.jpeg',
	href: '/video',
	tag: 'Exclusivo',
} as const;

export const OTT_ROWS: OttRowConfig[] = [
	{ id: 'live', title: 'Partidos en directo', items: LIVE_ITEMS },
	{ id: 'upcoming', title: 'Próximos partidos', items: UPCOMING_ITEMS },
	{ id: 'recent', title: 'Últimos partidos', items: RECENT_ITEMS },
	{ id: 'highlights', title: 'Highlights', items: HIGHLIGHTS_ITEMS },
	{ id: 'seleccion', title: 'Selección Española', items: SELECCION_ITEMS },
	{ id: 'femenina', title: 'Fútbol Femenino', items: FEMENINA_ITEMS },
	{ id: 'sala', title: 'Fútbol Sala', items: SALA_ITEMS },
	{ id: 'docs', title: 'Documentales', items: DOC_ITEMS },
];

export type FilmHeroItem = {
	id: number;
	title: string;
	subtitle: string;
	description: string;
	image: string;
	video?: string;
	badge?: string;
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

export const FILM_HERO_ITEMS: FilmHeroItem[] = [
	{
		id: 1,
		title: 'Navidad Bajo Ataque',
		subtitle: 'Comedia · Familiar · 2025',
		description:
			'Cuando dos ladrones descubren que una casa aparentemente está vacía durante Nochebuena, deciden que es el momento perfecto para robar. Pero no saben que dentro se ha quedado un niño travieso y muy creativo que convierte la casa en un campo de batalla lleno de trampas absurdas, caos y risas. Lo que parecía un robo fácil se transforma en la peor noche de sus vidas.',
		image: '/images/film/hero/1.jpg',
		video: '/video/film/preview/1.mp4',
		badge: 'New',

		// Metadata adicional típica en plataformas OTT
		genre: ['Comedia', 'Familiar', 'Navidad'],
		year: 2025,
		duration: '1h 42m',
		rating: 'PG',
		language: 'Español',
		country: 'España',
		director: 'Carlos Ramírez',
		cast: ['Lucas Martín', 'Javier Ortega', 'Pablo Serrano'],
		tags: ['Navidad', 'Niño travieso', 'Robo fallido', 'Comedia familiar'],
	},
	{
		id: 2,
		title: 'La Sombra de Karadûn',
		subtitle: 'Fantasía · Aventura · 2026',
		description:
			'En las profundidades de un antiguo reino subterráneo, un enano guerrero, un arquero elfo y un valiente humano se ven obligados a unir fuerzas cuando una horda interminable de trasgos despierta en las cavernas olvidadas. Mientras luchan por sobrevivir en la oscuridad, descubrirán que la amenaza que emerge desde las profundidades podría arrasar todo el mundo conocido.',
		image: '/images/film/hero/2.jpg',
		video: '/video/film/preview/2.mp4',
		badge: 'Epic',

		// Metadata adicional típica en plataformas OTT
		genre: ['Fantasía', 'Aventura', 'Acción'],
		year: 2026,
		duration: '2h 18m',
		rating: 'PG-13',
		language: 'Inglés',
		country: 'Reino Unido',
		director: 'Edward Halberg',
		cast: ['Thorin Albrecht', 'Elandir Vaelor', 'Marcus Draven'],
		tags: [
			'Fantasía épica',
			'Héroes legendarios',
			'Cavernas',
			'Batallas',
			'Trasgos',
			'Aventura medieval',
		],
	},
	{
		id: 3,
		title: 'Hijos de Kryptara',
		subtitle: 'Acción · Superhéroes · 2026',
		description:
			'Criado en la Tierra tras llegar desde un planeta lejano, Kael descubre que posee poderes extraordinarios destinados a proteger a la humanidad. Pero cuando su propio hermano llega desde su mundo natal con un plan para conquistar la Tierra y convertirla en el nuevo imperio de su especie, ambos deberán enfrentarse en una batalla que decidirá el destino del planeta.',
		image: '/images/film/hero/3.jpg',
		video: '/video/film/preview/3.mp4',
		badge: 'Trending',

		// Metadata adicional típica en plataformas OTT
		genre: ['Acción', 'Ciencia ficción', 'Superhéroes'],
		year: 2026,
		duration: '2h 05m',
		rating: 'PG-13',
		language: 'Inglés',
		country: 'Estados Unidos',
		director: 'Michael Torres',
		cast: ['Daniel Cross', 'Victor Hale', 'Sophia Grant'],
		tags: [
			'Superhéroe',
			'Extraterrestres',
			'Hermanos rivales',
			'Batalla épica',
			'Salvar el mundo',
		],
	},
];

export type PodcastSquareItem = {
	id: number;
	title: string;
	subtitle: string;
	image: string;
	badge?: string;
};

export const PODCAST_SQUARE_ITEMS: PodcastSquareItem[] = [
	{
		id: 1,
		title: 'La Pausa Deportiva',
		subtitle: 'Episodio 01',
		image: '/images/podcast/square/1.jpg',
		badge: 'New',
	},
	{
		id: 2,
		title: 'Historias de Vestuario',
		subtitle: 'Episodio 07',
		image: '/images/podcast/square/2.jpg',
	},
	{
		id: 3,
		title: 'Tercer Tiempo',
		subtitle: 'Episodio 12',
		image: '/images/podcast/square/3.jpg',
		badge: 'New',
	},
	{
		id: 4,
		title: 'Charlas de Banquillo',
		subtitle: 'Episodio 19',
		image: '/images/podcast/square/4.jpg',
	},
	{
		id: 5,
		title: 'En Clave Tactica',
		subtitle: 'Episodio 24',
		image: '/images/podcast/square/5.jpg',
	},
	{
		id: 6,
		title: 'Fuera de Juego',
		subtitle: 'Episodio 31',
		image: '/images/podcast/square/6.jpg',
	},
	{
		id: 7,
		title: 'Tiempo Extra',
		subtitle: 'Episodio 40',
		image: '/images/podcast/square/7.jpg',
	},
];

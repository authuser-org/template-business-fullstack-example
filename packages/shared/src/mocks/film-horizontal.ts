export type FilmHorizontalItem = {
	id: number;
	title: string;
	subtitle: string;
	image: string;
	badge?: string;
};

export const FILM_HORIZONTAL_ITEMS: FilmHorizontalItem[] = [
	{
		id: 1,
		title: 'Interestelar',
		subtitle: 'Ciencia ficción · 2014',
		image: '/images/film/horizontal/1.jpg',
		badge: 'New',
	},
	{
		id: 2,
		title: 'El origen',
		subtitle: 'Thriller · 2010',
		image: '/images/film/horizontal/2.jpg',
	},
	{
		id: 3,
		title: 'Tenet',
		subtitle: 'Acción · 2020',
		image: '/images/film/horizontal/3.jpg',
	},
	{
		id: 4,
		title: 'Oppenheimer',
		subtitle: 'Drama · 2023',
		image: '/images/film/horizontal/4.jpg',
		badge: 'New',
	},
	{
		id: 5,
		title: 'Dunkerque',
		subtitle: 'Histórico · 2017',
		image: '/images/film/horizontal/5.jpg',
	},
];

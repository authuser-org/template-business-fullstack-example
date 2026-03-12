export type FilmVerticalItem = {
	id: number;
	title: string;
	subtitle: string;
	image: string;
	badge?: string;
};

export const FILM_VERTICAL_ITEMS: FilmVerticalItem[] = [
	{
		id: 1,
		title: 'Blade Runner 2049',
		subtitle: 'Ciencia ficcion · 2017',
		image: '/images/film/vertical/1.jpg',
		badge: 'New',
	},
	{
		id: 2,
		title: 'El Caballero Oscuro',
		subtitle: 'Accion · 2008',
		image: '/images/film/vertical/2.jpg',
	},
	{
		id: 3,
		title: 'Mad Max: Fury Road',
		subtitle: 'Aventura · 2015',
		image: '/images/film/vertical/3.jpg',
	},
	{
		id: 4,
		title: 'La Llegada',
		subtitle: 'Drama · 2016',
		image: '/images/film/vertical/4.jpg',
		badge: 'New',
	},
	{
		id: 5,
		title: 'Parasitos',
		subtitle: 'Thriller · 2019',
		image: '/images/film/vertical/5.jpg',
	},
	{
		id: 6,
		title: 'Whiplash',
		subtitle: 'Drama · 2014',
		image: '/images/film/vertical/6.jpg',
	},
];

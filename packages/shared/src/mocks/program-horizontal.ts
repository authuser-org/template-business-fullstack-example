export type ProgramHorizontalItem = {
	id: number;
	title: string;
	subtitle: string;
	image: string;
	badge?: string;
};

export const PROGRAM_HORIZONTAL_ITEMS: ProgramHorizontalItem[] = [
	{
		id: 1,
		title: 'Breaking Bad',
		subtitle: 'Drama · 2008',
		image: '/images/program/horizontal/1.jpg',
		badge: 'New',
	},
	{
		id: 2,
		title: 'Chernobyl',
		subtitle: 'Miniserie · 2019',
		image: '/images/program/horizontal/2.jpg',
	},
	{
		id: 3,
		title: 'The Last of Us',
		subtitle: 'Acción · 2023',
		image: '/images/program/horizontal/3.jpg',
		badge: 'New',
	},
	{
		id: 4,
		title: 'Succession',
		subtitle: 'Drama · 2018',
		image: '/images/program/horizontal/4.jpg',
	},
	{
		id: 5,
		title: 'The Wire',
		subtitle: 'Drama · 2002',
		image: '/images/program/horizontal/5.jpg',
	},
	{
		id: 6,
		title: 'House of the Dragon',
		subtitle: 'Fantasía · 2022',
		image: '/images/program/horizontal/6.jpg',
	},
];

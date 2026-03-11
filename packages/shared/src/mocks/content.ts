import type { PosterAsset } from '../types/assets/poster';
import type { ThumbnailAsset } from '../types/assets/thumbnail';
import type { TrailerAsset } from '../types/assets/trailer';
import type { ContentPage, HomePageResponseDto } from '../types/content/page';
import type {
	Program,
	ProgramCard,
	ProgramQueryDto,
} from '../types/content/program';
import type { ContentRow } from '../types/content/rows';
import type { Season } from '../types/content/season';

export const posterAssetMock: PosterAsset = {
	id: 'poster-1',
	programId: 'program-1',
	url: 'https://cdn.ott.local/posters/program-1-en.jpg',
	width: 1080,
	height: 1600,
	locale: 'en-US',
	altText: 'Program 1 Poster',
};

export const thumbnailAssetMock: ThumbnailAsset = {
	id: 'thumb-1',
	programId: 'program-1',
	url: 'https://cdn.ott.local/thumbs/program-1-001.jpg',
	width: 1280,
	height: 720,
	timestampSeconds: 120,
};

export const trailerAssetMock: TrailerAsset = {
	id: 'trailer-1',
	programId: 'program-1',
	title: 'Official Trailer',
	url: 'https://cdn.ott.local/trailers/program-1.m3u8',
	durationSeconds: 95,
	locale: 'en-US',
};

export const seasonMock: Season = {
	id: 'season-1',
	programId: 'program-1',
	seasonNumber: 1,
	title: 'Season 1',
	synopsis: 'First season',
	episodes: [
		{
			id: 'episode-1',
			programId: 'program-1',
			seasonId: 'season-1',
			episodeNumber: 1,
			title: 'Pilot',
			synopsis: 'The story begins',
			durationSeconds: 3200,
			availability: { startsAt: '2026-01-01T00:00:00.000Z' },
		},
	],
};

export const programCardMock: ProgramCard = {
	id: 'program-1',
	slug: 'the-last-signal',
	title: 'The Last Signal',
	synopsis: 'A sci-fi thriller about deep space anomalies.',
	type: 'series',
	poster: posterAssetMock,
	thumbnail: thumbnailAssetMock,
	matchScore: 0.91,
};

export const programMock: Program = {
	id: 'program-1',
	slug: 'the-last-signal',
	type: 'series',
	status: 'published',
	title: 'The Last Signal',
	subtitle: 'Season 1 available',
	synopsis: 'A sci-fi thriller about deep space anomalies.',
	genres: [{ id: 'genre-sci-fi', slug: 'sci-fi', label: 'Sci-Fi' }],
	tags: [{ key: 'space', label: 'Space' }],
	metadata: {
		originalLanguage: 'en',
		availableLocales: ['en-US', 'es-ES'],
		localizedText: [
			{
				locale: 'en-US',
				title: 'The Last Signal',
				shortDescription: 'A sci-fi thriller',
			},
			{
				locale: 'es-ES',
				title: 'La Última Señal',
				shortDescription: 'Un thriller de ciencia ficción',
			},
		],
		productionYear: 2026,
		runtimeMinutes: 53,
		ageRating: 'TV-14',
	},
	posters: [posterAssetMock],
	thumbnails: [thumbnailAssetMock],
	trailers: [trailerAssetMock],
	availability: {
		startsAt: '2026-01-01T00:00:00.000Z',
		countriesAllowed: ['US', 'ES', 'MX'],
	},
	seasons: [seasonMock],
};

export const contentRowMock: ContentRow = {
	id: 'row-1',
	slug: 'trending-now',
	title: 'Trending Now',
	titleI18n: {
		'en-US': 'Trending Now',
		'es-ES': 'Tendencias',
	},
	type: 'trending',
	layout: 'rail',
	programs: [programCardMock],
	order: 1,
};

export const contentPageMock: ContentPage = {
	id: 'home-en',
	slug: 'home',
	title: 'Home',
	locale: 'en-US',
	rows: [contentRowMock],
};

export const homePageResponseMock: HomePageResponseDto = {
	page: contentPageMock,
	generatedAt: '2026-03-11T10:00:00.000Z',
};

export const programQueryMock: ProgramQueryDto = {
	text: 'signal',
	genreSlugs: ['sci-fi'],
	types: ['series'],
	countryCode: 'US',
	locale: 'en-US',
	page: 1,
	pageSize: 20,
};

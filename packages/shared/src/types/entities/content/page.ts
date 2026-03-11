import type { Collection } from './collection';
import type { ContentRow } from './rows';

export interface ContentPage {
	id: string;
	slug: string;
	title: string;
	locale: string;
	rows: ContentRow[];
	collections?: Collection[];
}

export interface HomePageResponseDto {
	page: ContentPage;
	generatedAt: string;
}

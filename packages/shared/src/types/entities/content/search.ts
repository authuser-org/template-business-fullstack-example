import type { ContentType } from './type';

export interface SearchFacet {
	key: string;
	values: string[];
}

export interface SearchDocument {
	programId: string;
	title: string;
	synopsis?: string;
	genres: string[];
	tags: string[];
	type: ContentType;
	locale: string;
	popularityScore?: number;
}

export interface SearchQueryDto {
	query: string;
	locale?: string;
	facets?: SearchFacet[];
	page?: number;
	pageSize?: number;
}

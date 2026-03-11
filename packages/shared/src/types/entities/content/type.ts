export type ContentType =
	| 'movie'
	| 'series'
	| 'season'
	| 'episode'
	| 'live'
	| 'event'
	| 'clip'
	| 'trailer';

export type ContentRating =
	| 'G'
	| 'PG'
	| 'PG-13'
	| 'R'
	| 'NC-17'
	| 'TV-14'
	| 'TV-MA';

export type ProgramStatus = 'draft' | 'scheduled' | 'published' | 'archived';

export interface AvailabilityWindow {
	startsAt: string;
	endsAt?: string;
	countriesAllowed?: string[];
	countriesBlocked?: string[];
}

import type { PosterAsset } from '../assets/poster';
import type { ThumbnailAsset } from '../assets/thumbnail';
import type { TrailerAsset } from '../assets/trailer';
import type { GenreRef } from './genre';
import type { ProgramMetadata } from './metadata';
import type { Season } from './season';
import type { TagRef } from './tag';
import type { AvailabilityWindow, ContentType, ProgramStatus } from './type';

export interface Program {
	id: string;
	slug: string;
	type: ContentType;
	status: ProgramStatus;
	title: string;
	subtitle?: string;
	synopsis: string;
	genres: GenreRef[];
	tags: TagRef[];
	metadata: ProgramMetadata;
	posters: PosterAsset[];
	thumbnails: ThumbnailAsset[];
	trailers?: TrailerAsset[];
	availability: AvailabilityWindow;
	seasons?: Season[];
}

export interface ProgramCard {
	id: string;
	slug: string;
	title: string;
	synopsis: string;
	type: ContentType;
	poster?: PosterAsset;
	thumbnail?: ThumbnailAsset;
	matchScore?: number;
}

export interface ProgramQueryDto {
	text?: string;
	genreSlugs?: string[];
	tagKeys?: string[];
	types?: ContentType[];
	countryCode?: string;
	locale?: string;
	page?: number;
	pageSize?: number;
}

import type { AvailabilityWindow } from './type';

export interface Episode {
	id: string;
	programId: string;
	seasonId: string;
	episodeNumber: number;
	title: string;
	synopsis?: string;
	durationSeconds: number;
	availability: AvailabilityWindow;
}

export interface Season {
	id: string;
	programId: string;
	seasonNumber: number;
	title: string;
	synopsis?: string;
	episodes: Episode[];
}

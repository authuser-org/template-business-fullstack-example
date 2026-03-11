export enum UserRole {
	Owner = 'owner',
	Adult = 'adult',
	Kid = 'kid',
}

export interface User {
	id: string;
	email: string;
	displayName: string;
	countryCode: string;
	createdAt: string;
}

export interface CreateUserDto {
	email: string;
	password: string;
	displayName: string;
	countryCode: string;
}

export interface UserProfile {
	id: string;
	userId: string;
	name: string;
	role: UserRole;
	avatarUrl?: string;
	language: string;
	preferredLocale?: string;
	fallbackLocale?: string;
	maturityRating: 'kids' | 'teen' | 'adult';
	autoplayNextEpisode: boolean;
}

export interface WatchProgress {
	profileId: string;
	programId: string;
	seasonId?: string;
	episodeId?: string;
	positionSeconds: number;
	durationSeconds: number;
	updatedAt: string;
}

export interface WatchlistItem {
	profileId: string;
	programId: string;
	addedAt: string;
}

export interface PaginatedResult<T> {
	items: T[];
	page: number;
	pageSize: number;
	total: number;
}

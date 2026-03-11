import type { ActiveSession, RegisteredDevice } from '../types/user/device';
import {
	UserRole,
	type User,
	type UserProfile,
	type WatchProgress,
	type WatchlistItem,
} from '../types/user/index';
import type { ProfileParentalControl } from '../types/user/parental';

export const userMock: User = {
	id: 'user-1',
	email: 'user1@ott.local',
	displayName: 'User One',
	countryCode: 'ES',
	createdAt: '2026-01-10T08:00:00.000Z',
};

export const userProfileMock: UserProfile = {
	id: 'profile-1',
	userId: 'user-1',
	name: 'Alex',
	role: UserRole.Adult,
	avatarUrl: 'https://cdn.ott.local/avatars/profile-1.png',
	language: 'es',
	preferredLocale: 'es-ES',
	fallbackLocale: 'en-US',
	maturityRating: 'adult',
	autoplayNextEpisode: true,
};

export const watchProgressMock: WatchProgress = {
	profileId: 'profile-1',
	programId: 'program-1',
	seasonId: 'season-1',
	episodeId: 'episode-1',
	positionSeconds: 132,
	durationSeconds: 3200,
	updatedAt: '2026-03-11T10:07:15.000Z',
};

export const watchlistItemMock: WatchlistItem = {
	profileId: 'profile-1',
	programId: 'program-1',
	addedAt: '2026-03-10T20:00:00.000Z',
};

export const registeredDeviceMock: RegisteredDevice = {
	id: 'device-1',
	userId: 'user-1',
	profileId: 'profile-1',
	name: 'Samsung Smart TV Living Room',
	platform: 'tv',
	model: 'QN90',
	appVersion: '1.4.2',
	registeredAt: '2026-02-20T12:00:00.000Z',
	lastSeenAt: '2026-03-11T10:20:00.000Z',
};

export const activeSessionMock: ActiveSession = {
	id: 'active-session-1',
	userId: 'user-1',
	profileId: 'profile-1',
	deviceId: 'device-1',
	startedAt: '2026-03-11T10:05:00.000Z',
	lastSeenAt: '2026-03-11T10:20:00.000Z',
	ipAddress: '203.0.113.10',
};

export const parentalControlMock: ProfileParentalControl = {
	profileId: 'profile-1',
	maturityRating: 'adult',
	pinEnabled: true,
	pinHash: 'mocked-hash',
	blockedProgramIds: ['program-kids-blocked-1'],
};

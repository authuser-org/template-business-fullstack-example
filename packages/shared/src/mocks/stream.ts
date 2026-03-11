import type {
	DownloadEntitlement,
	DownloadItem,
	OfflineLicense,
} from '../types/stream/download';
import type { DrmConfig } from '../types/stream/drm';
import type { DrmLicenseToken } from '../types/stream/license';
import type { LiveStream } from '../types/stream/live';
import type { StreamManifest } from '../types/stream/manifest';
import type {
	PlaybackHeartbeat,
	PlaybackSession,
} from '../types/stream/playback';
import type { StreamQualityProfile } from '../types/stream/quality';
import type { PlaybackSessionDto, StreamSource } from '../types/stream/source';

export const streamManifestMock: StreamManifest = {
	id: 'manifest-hls-1',
	protocol: 'hls',
	url: 'https://cdn.ott.local/hls/program-1/master.m3u8',
	expiresAt: '2026-03-11T12:00:00.000Z',
};

export const drmConfigMock: DrmConfig = {
	system: 'widevine',
	licenseUrl: 'https://license.ott.local/widevine',
	headers: { 'x-tenant': 'ott-demo' },
};

export const streamQualityProfileMock: StreamQualityProfile = {
	id: 'q-1080p',
	label: '1080p',
	width: 1920,
	height: 1080,
	bitrateKbps: 5000,
	fps: 24,
	dynamicRange: 'sdr',
};

export const streamSourceMock: StreamSource = {
	id: 'source-1',
	programId: 'program-1',
	manifests: [streamManifestMock],
	drm: [drmConfigMock],
	qualityProfiles: [streamQualityProfileMock],
};

export const playbackSessionDtoMock: PlaybackSessionDto = {
	sessionId: 'sess-1',
	source: streamSourceMock,
	startedAt: '2026-03-11T10:05:00.000Z',
	heartbeatIntervalSeconds: 15,
};

export const playbackSessionMock: PlaybackSession = {
	sessionId: 'sess-1',
	userId: 'user-1',
	profileId: 'profile-1',
	programId: 'program-1',
	streamSourceId: 'source-1',
	startedAt: '2026-03-11T10:05:00.000Z',
	lastHeartbeatAt: '2026-03-11T10:07:15.000Z',
	state: 'playing',
};

export const playbackHeartbeatMock: PlaybackHeartbeat = {
	sessionId: 'sess-1',
	positionSeconds: 132,
	bufferHealthSeconds: 25,
	throughputKbps: 6400,
	droppedFrames: 1,
	sentAt: '2026-03-11T10:07:15.000Z',
};

export const liveStreamMock: LiveStream = {
	id: 'live-1',
	channelId: 'ch-101',
	title: 'Live Sports Night',
	startsAt: '2026-03-11T19:00:00.000Z',
	endsAt: '2026-03-11T21:00:00.000Z',
	isDvrEnabled: true,
	latencySeconds: 12,
	source: streamSourceMock,
};

export const drmLicenseTokenMock: DrmLicenseToken = {
	token: 'mock-license-token',
	system: 'widevine',
	expiresAt: '2026-03-11T11:00:00.000Z',
	keyRotationSeconds: 120,
};

export const downloadEntitlementMock: DownloadEntitlement = {
	programId: 'program-1',
	profileId: 'profile-1',
	allowed: true,
	expiresAt: '2026-03-18T10:00:00.000Z',
	maxDevices: 3,
};

export const offlineLicenseMock: OfflineLicense = {
	sessionId: 'offline-sess-1',
	programId: 'program-1',
	profileId: 'profile-1',
	issuedAt: '2026-03-11T10:30:00.000Z',
	expiresAt: '2026-03-18T10:30:00.000Z',
};

export const downloadItemMock: DownloadItem = {
	id: 'download-1',
	programId: 'program-1',
	profileId: 'profile-1',
	state: 'downloading',
	progressPercent: 42,
	createdAt: '2026-03-11T10:31:00.000Z',
	updatedAt: '2026-03-11T10:35:00.000Z',
};

import type { DrmConfig } from './drm';
import type { StreamManifest } from './manifest';
import type { StreamQualityProfile } from './quality';

export interface StreamSource {
	id: string;
	programId: string;
	manifests: StreamManifest[];
	drm?: DrmConfig[];
	qualityProfiles: StreamQualityProfile[];
}

export interface PlaybackSessionDto {
	sessionId: string;
	source: StreamSource;
	startedAt: string;
	heartbeatIntervalSeconds: number;
}

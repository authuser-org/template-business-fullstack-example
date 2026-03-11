import type { DrmSystem } from './drm';

export interface DrmLicenseToken {
	token: string;
	system: DrmSystem;
	expiresAt: string;
	keyRotationSeconds?: number;
}

export interface DrmLicenseRequestDto {
	sessionId: string;
	programId: string;
	system: DrmSystem;
}

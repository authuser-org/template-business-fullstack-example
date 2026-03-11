export type DownloadState =
	| 'queued'
	| 'downloading'
	| 'completed'
	| 'failed'
	| 'expired';

export interface DownloadEntitlement {
	programId: string;
	profileId: string;
	allowed: boolean;
	expiresAt?: string;
	maxDevices?: number;
}

export interface OfflineLicense {
	sessionId: string;
	programId: string;
	profileId: string;
	issuedAt: string;
	expiresAt: string;
}

export interface DownloadItem {
	id: string;
	programId: string;
	profileId: string;
	state: DownloadState;
	progressPercent: number;
	createdAt: string;
	updatedAt: string;
}

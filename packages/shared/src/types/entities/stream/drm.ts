export type DrmSystem = 'widevine' | 'playready' | 'fairplay';

export interface DrmConfig {
	system: DrmSystem;
	licenseUrl: string;
	certificateUrl?: string;
	headers?: Record<string, string>;
}

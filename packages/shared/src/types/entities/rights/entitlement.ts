export type EntitlementSource = 'svod' | 'tvod' | 'promo' | 'admin';

export interface EntitlementWindow {
	startsAt: string;
	endsAt?: string;
}

export interface GeoRestriction {
	countriesAllowed?: string[];
	countriesBlocked?: string[];
}

export interface DeviceRestriction {
	maxRegisteredDevices?: number;
	maxConcurrentStreams?: number;
	allowOfflineDownload: boolean;
}

export interface ContentEntitlement {
	id: string;
	userId: string;
	profileId?: string;
	programId: string;
	source: EntitlementSource;
	window: EntitlementWindow;
	geoRestriction?: GeoRestriction;
	deviceRestriction?: DeviceRestriction;
}

export interface EntitlementDecision {
	allowed: boolean;
	reasonCode?:
		| 'not-entitled'
		| 'geo-blocked'
		| 'window-closed'
		| 'concurrency-limit';
	entitlementId?: string;
}

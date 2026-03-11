export interface RegisteredDevice {
	id: string;
	userId: string;
	profileId?: string;
	name: string;
	platform: 'web' | 'ios' | 'android' | 'tv' | 'console';
	model?: string;
	appVersion?: string;
	registeredAt: string;
	lastSeenAt?: string;
}

export interface ActiveSession {
	id: string;
	userId: string;
	profileId?: string;
	deviceId: string;
	startedAt: string;
	lastSeenAt: string;
	ipAddress?: string;
}

import type {
	ContentEntitlement,
	EntitlementDecision,
} from '../types/rights/entitlement';

export const contentEntitlementMock: ContentEntitlement = {
	id: 'ent-1',
	userId: 'user-1',
	profileId: 'profile-1',
	programId: 'program-1',
	source: 'svod',
	window: {
		startsAt: '2026-01-01T00:00:00.000Z',
		endsAt: '2027-01-01T00:00:00.000Z',
	},
	geoRestriction: {
		countriesAllowed: ['ES', 'US', 'MX'],
	},
	deviceRestriction: {
		maxRegisteredDevices: 5,
		maxConcurrentStreams: 2,
		allowOfflineDownload: true,
	},
};

export const entitlementDecisionAllowedMock: EntitlementDecision = {
	allowed: true,
	entitlementId: 'ent-1',
};

export const entitlementDecisionBlockedMock: EntitlementDecision = {
	allowed: false,
	reasonCode: 'geo-blocked',
};

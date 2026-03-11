import type { VersionedPayload } from '../types/contract/version';
import type { AnalyticsEvent } from '../types/entities/analytics/event';
import type { QoeSummary } from '../types/entities/analytics/qoe';
import type { DomainError } from '../types/errors/error';
import type { GeoDecision, GeoFenceRule } from '../types/geolocation/geofence';
import type {
	LocaleResolutionInput,
	RequestLocaleContext,
	RequestLocaleHeaders,
	ResolvedLocale,
} from '../types/i18n/localization';
import type { GeoLocation } from '../types/location/location';
import type { UserNotification } from '../types/notification/notification';

export const analyticsEventMock: AnalyticsEvent = {
	id: 'evt-1',
	userId: 'user-1',
	profileId: 'profile-1',
	type: 'play_started',
	programId: 'program-1',
	occurredAt: '2026-03-11T10:05:00.000Z',
	metadata: { app: 'tv', version: '1.4.2' },
};

export const qoeSummaryMock: QoeSummary = {
	sessionId: 'sess-1',
	watchTimeSeconds: 1800,
	completionRate: 0.56,
	avgBitrateKbps: 4800,
	startup: {
		sessionId: 'sess-1',
		startupTimeMs: 1250,
		firstFrameTimeMs: 1680,
	},
	rebuffer: {
		sessionId: 'sess-1',
		rebufferCount: 1,
		rebufferDurationMs: 1800,
	},
};

export const userNotificationMock: UserNotification = {
	id: 'notif-1',
	userId: 'user-1',
	channel: 'in-app',
	title: 'New episode available',
	titleI18n: {
		'en-US': 'New episode available',
		'es-ES': 'Nuevo episodio disponible',
	},
	body: 'Episode 2 is now live.',
	bodyI18n: {
		'en-US': 'Episode 2 is now live.',
		'es-ES': 'El episodio 2 ya está disponible.',
	},
	locale: 'es-ES',
	templateKey: 'episode.new',
	templateParams: { episode: 2 },
	sentAt: '2026-03-11T11:00:00.000Z',
	deeplink: 'ott://program/program-1',
};

export const geoFenceRuleMock: GeoFenceRule = {
	id: 'geo-1',
	name: 'EU whitelist',
	countriesAllowed: ['ES', 'FR', 'DE'],
};

export const geoDecisionMock: GeoDecision = {
	countryCode: 'ES',
	allowed: true,
};

export const geoLocationMock: GeoLocation = {
	countryCode: 'ES',
	regionCode: 'MD',
	city: 'Madrid',
	latitude: 40.4168,
	longitude: -3.7038,
	timezone: 'Europe/Madrid',
};

export const domainErrorMock: DomainError = {
	code: 'ENT-403',
	domain: 'entitlement',
	message: 'Content not available in your country',
	messageI18n: {
		'en-US': 'Content not available in your country',
		'es-ES': 'Contenido no disponible en tu país',
	},
	userMessageKey: 'error.entitlement.geoBlocked',
	retryable: false,
	severity: 'warning',
};

export const localeResolutionInputMock: LocaleResolutionInput = {
	headers: {
		'accept-language': 'es-MX,es;q=0.9,en-US;q=0.8',
		'x-locale': 'es-ES',
		'x-fallback-locale': 'en-US',
	},
	requestedLocale: 'es-MX',
	preferredLocale: 'es-ES',
	fallbackLocale: 'en-US',
	supportedLocales: ['en-US', 'es-ES'],
	defaultLocale: 'en-US',
};

export const requestLocaleHeadersMock: RequestLocaleHeaders = {
	'accept-language': 'es-MX,es;q=0.9,en-US;q=0.8',
	'x-locale': 'es-ES',
	'x-fallback-locale': 'en-US',
};

export const resolvedLocaleMock: ResolvedLocale = {
	locale: 'es-ES',
	source: 'preferred',
};

export const requestLocaleContextMock: RequestLocaleContext = {
	headers: requestLocaleHeadersMock,
	resolved: resolvedLocaleMock,
};

export const versionedPayloadMock: VersionedPayload<{ ok: boolean }> = {
	contract: {
		schema: 'ott.shared.mock',
		version: '1.0.0',
	},
	data: { ok: true },
};

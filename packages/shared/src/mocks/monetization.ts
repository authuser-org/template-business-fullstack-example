import type {
	MonetizationPolicy,
	MonetizationProfile,
} from '../types/monetization';
import type {
	AdBreak,
	AdDecision,
	AdTrackingEvent,
} from '../types/monetization/avod/ad';
import type {
	BillingMethod,
	Invoice,
	Promotion,
} from '../types/monetization/billing';
import type { SvodPlan } from '../types/monetization/svod/plan';
import type { UserSubscription } from '../types/monetization/svod/subscription';
import type {
	TvodOffer,
	TvodPurchase,
} from '../types/monetization/tvod/purchase';

export const svodPlanMock: SvodPlan = {
	id: 'plan-premium-monthly',
	code: 'PREMIUM_M',
	name: 'Premium Monthly',
	description: '4K streaming and 4 concurrent devices',
	maxProfiles: 5,
	maxConcurrentStreams: 4,
	maxQuality: 'uhd',
	billingPeriod: 'monthly',
	currency: 'EUR',
	price: 15.99,
};

export const userSubscriptionMock: UserSubscription = {
	id: 'sub-1',
	userId: 'user-1',
	planId: 'plan-premium-monthly',
	status: 'active',
	startedAt: '2026-02-01T00:00:00.000Z',
	renewsAt: '2026-04-01T00:00:00.000Z',
};

export const tvodOfferMock: TvodOffer = {
	id: 'offer-rent-1',
	programId: 'program-1',
	type: 'rent',
	currency: 'EUR',
	price: 4.99,
	rentalHours: 48,
};

export const tvodPurchaseMock: TvodPurchase = {
	id: 'purchase-1',
	userId: 'user-1',
	profileId: 'profile-1',
	offerId: 'offer-rent-1',
	programId: 'program-1',
	purchasedAt: '2026-03-11T09:55:00.000Z',
	expiresAt: '2026-03-13T09:55:00.000Z',
};

export const adBreakMock: AdBreak = {
	id: 'ad-break-1',
	programId: 'program-1',
	position: 'mid-roll',
	offsetSeconds: 900,
	durationSeconds: 90,
};

export const adDecisionMock: AdDecision = {
	id: 'ad-decision-1',
	breakId: 'ad-break-1',
	adTagUrl: 'https://ads.ott.local/vast?slot=mid1',
	expiresAt: '2026-03-11T10:20:00.000Z',
};

export const adTrackingEventMock: AdTrackingEvent = {
	id: 'ad-track-1',
	decisionId: 'ad-decision-1',
	sessionId: 'sess-1',
	type: 'impression',
	occurredAt: '2026-03-11T10:15:00.000Z',
};

export const billingMethodMock: BillingMethod = {
	id: 'bill-method-1',
	userId: 'user-1',
	provider: 'stripe',
	maskedAccount: '**** 4242',
	isDefault: true,
};

export const invoiceMock: Invoice = {
	id: 'invoice-1',
	userId: 'user-1',
	provider: 'stripe',
	amount: 15.99,
	currency: 'EUR',
	status: 'paid',
	issuedAt: '2026-03-01T00:00:00.000Z',
	paidAt: '2026-03-01T00:00:05.000Z',
};

export const promotionMock: Promotion = {
	id: 'promo-1',
	code: 'WELCOME20',
	description: '20% off first month',
	discountPercent: 20,
	validFrom: '2026-01-01T00:00:00.000Z',
	validTo: '2026-12-31T23:59:59.000Z',
};

export const monetizationProfileMock: MonetizationProfile = {
	userId: 'user-1',
	subscription: userSubscriptionMock,
	activePlan: svodPlanMock,
	tvodPurchases: [tvodPurchaseMock],
};

export const monetizationPolicyMock: MonetizationPolicy = {
	mode: 'svod',
	requiredPlanCodes: ['PREMIUM_M', 'PREMIUM_Y'],
};

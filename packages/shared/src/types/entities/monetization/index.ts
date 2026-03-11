import type { AdBreak, AdDecision } from './avod/ad';
import type { SvodPlan } from './svod/plan';
import type { UserSubscription } from './svod/subscription';
import type { TvodOffer, TvodPurchase } from './tvod/purchase';

export interface MonetizationProfile {
	userId: string;
	subscription?: UserSubscription;
	activePlan?: SvodPlan;
	tvodPurchases?: TvodPurchase[];
}

export type CheckoutItem =
	| { kind: 'svod'; plan: SvodPlan }
	| { kind: 'tvod'; offer: TvodOffer };

export type MonetizationPolicy =
	| { mode: 'svod'; requiredPlanCodes?: string[] }
	| { mode: 'tvod'; requiredOfferType: 'rent' | 'buy' }
	| { mode: 'avod'; adBreaks: AdBreak[] }
	| { mode: 'free' };

export type AdTechPayload = {
	decision: AdDecision;
};

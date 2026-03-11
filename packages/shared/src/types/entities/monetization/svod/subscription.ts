export type SubscriptionStatus =
	| 'trialing'
	| 'active'
	| 'past-due'
	| 'paused'
	| 'canceled';

export interface UserSubscription {
	id: string;
	userId: string;
	planId: string;
	status: SubscriptionStatus;
	startedAt: string;
	renewsAt?: string;
	canceledAt?: string;
}

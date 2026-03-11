export type AnalyticsEventType =
	| 'play_started'
	| 'play_paused'
	| 'play_completed'
	| 'search_performed'
	| 'recommendation_clicked'
	| 'subscription_started';

export interface AnalyticsEvent {
	id: string;
	userId?: string;
	profileId?: string;
	type: AnalyticsEventType;
	programId?: string;
	occurredAt: string;
	metadata?: Record<string, string | number | boolean>;
}

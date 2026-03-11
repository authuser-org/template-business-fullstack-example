export type AdBreakPosition = 'pre-roll' | 'mid-roll' | 'post-roll';

export interface AdBreak {
	id: string;
	programId: string;
	position: AdBreakPosition;
	offsetSeconds?: number;
	durationSeconds: number;
}

export interface AdDecision {
	id: string;
	breakId: string;
	adTagUrl: string;
	expiresAt: string;
}

export type AdTrackingEventType =
	| 'impression'
	| 'start'
	| 'first-quartile'
	| 'midpoint'
	| 'third-quartile'
	| 'complete'
	| 'click';

export interface AdTrackingEvent {
	id: string;
	decisionId: string;
	sessionId: string;
	type: AdTrackingEventType;
	occurredAt: string;
}

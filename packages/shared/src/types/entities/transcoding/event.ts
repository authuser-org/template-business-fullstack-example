export type TranscodeEventType =
	| 'job_created'
	| 'job_started'
	| 'job_progress'
	| 'job_completed'
	| 'job_failed'
	| 'job_canceled';

export interface TranscodeEvent {
	id: string;
	jobId: string;
	type: TranscodeEventType;
	occurredAt: string;
	payload?: Record<string, string | number | boolean>;
}

export interface CreateTranscodeJobDto {
	programId: string;
	sourceUrl: string;
	profileIds: string[];
	priority?: 'low' | 'normal' | 'high';
}

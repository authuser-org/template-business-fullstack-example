export type PlayerState =
	| 'idle'
	| 'buffering'
	| 'playing'
	| 'paused'
	| 'ended'
	| 'error';

export interface PlaybackSession {
	sessionId: string;
	userId: string;
	profileId: string;
	programId: string;
	streamSourceId: string;
	startedAt: string;
	lastHeartbeatAt?: string;
	state: PlayerState;
}

export interface PlaybackHeartbeat {
	sessionId: string;
	positionSeconds: number;
	bufferHealthSeconds?: number;
	throughputKbps?: number;
	droppedFrames?: number;
	sentAt: string;
}

export interface PlaybackError {
	sessionId: string;
	code: string;
	message: string;
	fatal: boolean;
	atPositionSeconds?: number;
	occurredAt: string;
}

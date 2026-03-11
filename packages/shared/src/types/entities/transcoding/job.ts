import type { TranscodeProfile } from './profile';

export type TranscodeStatus =
	| 'queued'
	| 'processing'
	| 'completed'
	| 'failed'
	| 'canceled';

export interface TranscodeInput {
	assetId: string;
	sourceUrl: string;
	durationSeconds?: number;
	drmRequired?: boolean;
	subtitlesInBand?: boolean;
}

export interface TranscodeOutputRendition {
	profileId: string;
	outputUrl: string;
	playlistUrl?: string;
	bitrateKbps: number;
	width?: number;
	height?: number;
	sizeBytes?: number;
}

export interface TranscodeOutput {
	manifestHlsUrl?: string;
	manifestDashUrl?: string;
	renditions: TranscodeOutputRendition[];
	thumbnailSpriteUrl?: string;
}

export interface TranscodeProgress {
	percent: number;
	stage: 'ingest' | 'analyze' | 'encode' | 'package' | 'publish';
	etaSeconds?: number;
	updatedAt: string;
}

export interface TranscodeError {
	code: string;
	message: string;
	retryable: boolean;
	provider?: string;
	details?: Record<string, string | number | boolean>;
}

export interface TranscodeJob {
	id: string;
	programId: string;
	requestedBy: string;
	status: TranscodeStatus;
	priority: 'low' | 'normal' | 'high';
	input: TranscodeInput;
	profiles: TranscodeProfile[];
	output?: TranscodeOutput;
	progress?: TranscodeProgress;
	error?: TranscodeError;
	createdAt: string;
	startedAt?: string;
	completedAt?: string;
}

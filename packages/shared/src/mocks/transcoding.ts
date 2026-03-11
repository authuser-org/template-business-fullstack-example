import type {
	CreateTranscodeJobDto,
	TranscodeEvent,
} from '../types/transcoding/event';
import type { TranscodeJob } from '../types/transcoding/job';
import type { TranscodeProfile } from '../types/transcoding/profile';

export const transcodeProfile1080pMock: TranscodeProfile = {
	id: 'tr-profile-1080p',
	name: '1080p AVC',
	container: 'fmp4',
	video: {
		codec: 'h264',
		width: 1920,
		height: 1080,
		bitrateKbps: 5000,
		fps: 24,
		gopSeconds: 2,
		profile: 'high',
	},
	audio: {
		codec: 'aac',
		bitrateKbps: 192,
		channels: '2.0',
		sampleRateHz: 48000,
	},
};

export const createTranscodeJobDtoMock: CreateTranscodeJobDto = {
	programId: 'program-1',
	sourceUrl: 's3://ott-ingest/program-1/source.mov',
	profileIds: ['tr-profile-1080p'],
	priority: 'normal',
};

export const transcodeJobMock: TranscodeJob = {
	id: 'tr-job-1',
	programId: 'program-1',
	requestedBy: 'cms-editor-1',
	status: 'processing',
	priority: 'normal',
	input: {
		assetId: 'asset-master-1',
		sourceUrl: 's3://ott-ingest/program-1/source.mov',
		durationSeconds: 3200,
		drmRequired: true,
		subtitlesInBand: false,
	},
	profiles: [transcodeProfile1080pMock],
	progress: {
		percent: 72,
		stage: 'encode',
		etaSeconds: 210,
		updatedAt: '2026-03-11T10:42:00.000Z',
	},
	createdAt: '2026-03-11T10:30:00.000Z',
	startedAt: '2026-03-11T10:31:00.000Z',
};

export const transcodeCompletedJobMock: TranscodeJob = {
	...transcodeJobMock,
	status: 'completed',
	progress: {
		percent: 100,
		stage: 'publish',
		updatedAt: '2026-03-11T10:50:00.000Z',
	},
	output: {
		manifestHlsUrl: 'https://cdn.ott.local/hls/program-1/master.m3u8',
		manifestDashUrl: 'https://cdn.ott.local/dash/program-1/manifest.mpd',
		renditions: [
			{
				profileId: 'tr-profile-1080p',
				outputUrl: 'https://cdn.ott.local/video/program-1/1080p.mp4',
				playlistUrl: 'https://cdn.ott.local/hls/program-1/1080p.m3u8',
				bitrateKbps: 5000,
				width: 1920,
				height: 1080,
			},
		],
		thumbnailSpriteUrl: 'https://cdn.ott.local/thumbs/program-1/sprite.jpg',
	},
	completedAt: '2026-03-11T10:50:00.000Z',
};

export const transcodeEventMock: TranscodeEvent = {
	id: 'tr-evt-1',
	jobId: 'tr-job-1',
	type: 'job_progress',
	occurredAt: '2026-03-11T10:42:00.000Z',
	payload: { percent: 72, stage: 'encode' },
};

export type TranscodeContainer = 'mp4' | 'fmp4' | 'ts' | 'webm';

export interface TranscodeAudioProfile {
	codec: 'aac' | 'eac3' | 'opus';
	bitrateKbps: number;
	channels: '2.0' | '5.1' | '7.1';
	sampleRateHz?: number;
}

export interface TranscodeVideoProfile {
	codec: 'h264' | 'h265' | 'vp9' | 'av1';
	width: number;
	height: number;
	bitrateKbps: number;
	fps: number;
	gopSeconds?: number;
	profile?: string;
}

export interface TranscodeProfile {
	id: string;
	name: string;
	container: TranscodeContainer;
	video: TranscodeVideoProfile;
	audio?: TranscodeAudioProfile;
	isHdr?: boolean;
}

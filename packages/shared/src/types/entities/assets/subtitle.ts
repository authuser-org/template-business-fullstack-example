export type SubtitleFormat = 'webvtt' | 'ttml' | 'srt';

export interface SubtitleAsset {
	id: string;
	programId: string;
	locale: string;
	format: SubtitleFormat;
	label: string;
	isForced?: boolean;
	url: string;
}

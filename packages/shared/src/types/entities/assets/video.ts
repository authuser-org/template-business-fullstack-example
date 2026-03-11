export type VideoCodec = 'h264' | 'h265' | 'vp9' | 'av1';

export interface VideoRendition {
	id: string;
	width: number;
	height: number;
	bitrateKbps: number;
	fps: number;
	codec: VideoCodec;
}

export interface VideoAsset {
	id: string;
	programId: string;
	durationSeconds: number;
	renditions: VideoRendition[];
}

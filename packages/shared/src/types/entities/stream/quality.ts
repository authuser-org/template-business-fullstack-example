export type DynamicRange = 'sdr' | 'hdr10' | 'hdr10+' | 'dolby-vision';

export interface StreamQualityProfile {
	id: string;
	label: string;
	width: number;
	height: number;
	bitrateKbps: number;
	fps: number;
	dynamicRange: DynamicRange;
}

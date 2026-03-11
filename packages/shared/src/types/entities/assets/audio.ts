export type AudioCodec = 'aac' | 'eac3' | 'opus';

export interface AudioAsset {
	id: string;
	programId: string;
	locale: string;
	codec: AudioCodec;
	channels: '2.0' | '5.1' | '7.1';
	bitrateKbps: number;
	label?: string;
	isDefault?: boolean;
}

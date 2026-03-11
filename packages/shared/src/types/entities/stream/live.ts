import type { StreamSource } from './source';

export interface LiveStream {
	id: string;
	channelId: string;
	title: string;
	startsAt: string;
	endsAt?: string;
	isDvrEnabled: boolean;
	latencySeconds?: number;
	source: StreamSource;
}

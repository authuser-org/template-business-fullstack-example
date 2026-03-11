import type { EpgSchedule } from './schedule';

export interface EpgQueryDto {
	channelIds?: string[];
	from: string;
	to: string;
	timezone?: string;
}

export interface EpgResponseDto {
	schedules: EpgSchedule[];
	generatedAt: string;
}

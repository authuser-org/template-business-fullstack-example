import type { EpgChannel } from './channel';
import type { EpgSlot } from './slot';

export interface EpgSchedule {
	date: string;
	channels: EpgChannel[];
	slots: EpgSlot[];
}

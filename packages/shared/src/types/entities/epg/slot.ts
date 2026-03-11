import type { LocalizedStringMap } from '../i18n/localization';

export interface EpgSlot {
	id: string;
	channelId: string;
	programId: string;
	title: string;
	titleI18n?: LocalizedStringMap;
	startsAt: string;
	endsAt: string;
	isLive: boolean;
}

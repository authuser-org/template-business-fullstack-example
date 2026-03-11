import type { LocalizedStringMap } from '../i18n/localization';

export interface EpgChannel {
	id: string;
	number: string;
	slug: string;
	name: string;
	nameI18n?: LocalizedStringMap;
	logoUrl?: string;
	language?: string;
}

import type { LocalizedStringMap } from '../i18n/localization';

export interface Tag {
	id: string;
	key: string;
	label: string;
	labelI18n?: LocalizedStringMap;
}

export interface TagRef {
	key: string;
	label: string;
	labelI18n?: LocalizedStringMap;
}

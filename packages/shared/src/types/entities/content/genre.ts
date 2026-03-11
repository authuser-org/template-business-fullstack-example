import type { LocalizedStringMap } from '../i18n/localization';

export interface Genre {
	id: string;
	slug: string;
	label: string;
	labelI18n?: LocalizedStringMap;
	parentGenreId?: string;
	order?: number;
}

export interface GenreRef {
	id: string;
	slug: string;
	label?: string;
	labelI18n?: LocalizedStringMap;
}

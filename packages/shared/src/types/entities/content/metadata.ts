import type { LocalizedStringMap } from '../i18n/localization';
import type { ContentRating } from './type';

export interface LocalizedText {
	locale: string;
	title: string;
	shortDescription?: string;
	longDescription?: string;
}

export interface LocalizedProgramFields {
	title?: LocalizedStringMap;
	shortDescription?: LocalizedStringMap;
	longDescription?: LocalizedStringMap;
}

export interface ProgramMetadata {
	originalLanguage: string;
	availableLocales: string[];
	localizedText: LocalizedText[];
	localizedFields?: LocalizedProgramFields;
	productionYear: number;
	runtimeMinutes?: number;
	ageRating?: ContentRating;
	cast?: string[];
	directors?: string[];
	studios?: string[];
}

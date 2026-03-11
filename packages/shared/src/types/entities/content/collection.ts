import type { LocalizedStringMap } from '../i18n/localization';
import type { ProgramCard } from './program';

export type CollectionLayout = 'hero' | 'rail' | 'grid' | 'carousel';

export interface Collection {
	id: string;
	slug: string;
	title: string;
	titleI18n?: LocalizedStringMap;
	subtitle?: string;
	subtitleI18n?: LocalizedStringMap;
	layout: CollectionLayout;
	programs: ProgramCard[];
	order: number;
}

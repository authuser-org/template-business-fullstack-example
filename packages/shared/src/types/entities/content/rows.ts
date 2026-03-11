import type { LocalizedStringMap } from '../i18n/localization';
import type { CollectionLayout } from './collection';
import type { ProgramCard } from './program';

export type ContentRowType =
	| 'hero'
	| 'continue-watching'
	| 'trending'
	| 'top-10'
	| 'because-you-watched'
	| 'genre'
	| 'editorial';

export interface ContentRow {
	id: string;
	slug: string;
	title: string;
	titleI18n?: LocalizedStringMap;
	subtitle?: string;
	subtitleI18n?: LocalizedStringMap;
	type: ContentRowType;
	layout: CollectionLayout;
	programs: ProgramCard[];
	order: number;
}

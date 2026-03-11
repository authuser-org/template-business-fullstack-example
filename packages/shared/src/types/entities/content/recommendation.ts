import type { ProgramCard } from './program';

export interface RecommendationItem {
	program: ProgramCard;
	score: number;
	reasonCode:
		| 'because-you-watched'
		| 'trending'
		| 'similar-genre'
		| 'new-release'
		| 'editorial-pick';
}

export interface RecommendationShelf {
	id: string;
	title: string;
	items: RecommendationItem[];
}

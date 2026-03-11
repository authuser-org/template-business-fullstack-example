export type DiscoveryCategoryType =
	| 'continue-watching'
	| 'trending'
	| 'top-10'
	| 'new-releases'
	| 'because-you-watched'
	| 'genre'
	| 'editorial';

export interface DiscoveryCategory {
	id: string;
	slug: string;
	title: string;
	type: DiscoveryCategoryType;
	order: number;
}

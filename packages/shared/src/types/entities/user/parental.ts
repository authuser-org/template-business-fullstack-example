export interface ProfileParentalControl {
	profileId: string;
	maturityRating: 'kids' | 'teen' | 'adult';
	pinEnabled: boolean;
	pinHash?: string;
	blockedProgramIds?: string[];
}

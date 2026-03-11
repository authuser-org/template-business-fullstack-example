export interface TvodOffer {
	id: string;
	programId: string;
	type: 'rent' | 'buy';
	currency: string;
	price: number;
	rentalHours?: number;
}

export interface TvodPurchase {
	id: string;
	userId: string;
	profileId?: string;
	offerId: string;
	programId: string;
	purchasedAt: string;
	expiresAt?: string;
}

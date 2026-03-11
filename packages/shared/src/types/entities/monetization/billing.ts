export type BillingProvider =
	| 'stripe'
	| 'apple-iap'
	| 'google-play'
	| 'paypal'
	| 'other';

export interface BillingMethod {
	id: string;
	userId: string;
	provider: BillingProvider;
	maskedAccount: string;
	isDefault: boolean;
}

export interface Invoice {
	id: string;
	userId: string;
	provider: BillingProvider;
	amount: number;
	currency: string;
	status: 'pending' | 'paid' | 'failed' | 'refunded';
	issuedAt: string;
	paidAt?: string;
}

export interface Promotion {
	id: string;
	code: string;
	description?: string;
	discountPercent?: number;
	discountAmount?: number;
	currency?: string;
	validFrom: string;
	validTo?: string;
}

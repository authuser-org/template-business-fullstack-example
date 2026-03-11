export type BillingPeriod = 'monthly' | 'yearly';

export interface SvodPlan {
	id: string;
	code: string;
	name: string;
	description?: string;
	maxProfiles: number;
	maxConcurrentStreams: number;
	maxQuality: 'sd' | 'hd' | 'uhd';
	billingPeriod: BillingPeriod;
	currency: string;
	price: number;
}

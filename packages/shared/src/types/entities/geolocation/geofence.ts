export interface GeoFenceRule {
	id: string;
	name: string;
	countriesAllowed?: string[];
	countriesBlocked?: string[];
}

export interface GeoDecision {
	countryCode: string;
	allowed: boolean;
	reason?: string;
}

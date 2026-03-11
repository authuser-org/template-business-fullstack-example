export interface ContractVersion {
	schema: string;
	version: string;
	deprecated?: boolean;
	sunsetAt?: string;
}

export interface VersionedPayload<T> {
	contract: ContractVersion;
	data: T;
}

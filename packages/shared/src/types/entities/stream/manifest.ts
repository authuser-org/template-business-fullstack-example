export type ManifestProtocol = 'hls' | 'dash';

export interface StreamManifest {
	id: string;
	protocol: ManifestProtocol;
	url: string;
	expiresAt?: string;
}

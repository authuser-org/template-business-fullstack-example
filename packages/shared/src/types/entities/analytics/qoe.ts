export interface QoeStartupMetric {
	sessionId: string;
	startupTimeMs: number;
	firstFrameTimeMs?: number;
}

export interface QoeRebufferMetric {
	sessionId: string;
	rebufferCount: number;
	rebufferDurationMs: number;
}

export interface QoeSummary {
	sessionId: string;
	watchTimeSeconds: number;
	completionRate: number;
	avgBitrateKbps?: number;
	startup: QoeStartupMetric;
	rebuffer: QoeRebufferMetric;
}

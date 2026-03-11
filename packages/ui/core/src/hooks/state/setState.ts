export function mergeState<T extends Record<string, unknown>>(
	current: T,
	patch: Partial<T>,
): T {
	return { ...current, ...patch };
}

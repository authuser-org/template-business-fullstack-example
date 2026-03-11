export type CounterLimits = {
	min?: number;
	max?: number;
};

export function clampCounterValue(value: number, limits: CounterLimits = {}) {
	const { min, max } = limits;

	if (typeof min === 'number' && value < min) {
		return min;
	}

	if (typeof max === 'number' && value > max) {
		return max;
	}

	return value;
}

export function getIncrementedValue(
	current: number,
	step = 1,
	limits: CounterLimits = {},
) {
	return clampCounterValue(current + step, limits);
}

export function getDecrementedValue(
	current: number,
	step = 1,
	limits: CounterLimits = {},
) {
	return clampCounterValue(current - step, limits);
}

export function getCounterResetValue(
	initialValue: number,
	limits: CounterLimits = {},
) {
	return clampCounterValue(initialValue, limits);
}

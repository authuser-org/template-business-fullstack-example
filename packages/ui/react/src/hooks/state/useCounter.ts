import {
	clampCounterValue,
	getCounterResetValue,
	getDecrementedValue,
	getIncrementedValue,
	type CounterLimits,
} from '@repo/ui-core';
import { useCallback, useState } from 'react';

type UseCounterOptions = {
	step?: number;
} & CounterLimits;

export function useCounter(initialValue = 0, options: UseCounterOptions = {}) {
	const { step = 1, min, max } = options;
	const limits = { min, max };
	const [value, setValue] = useState(clampCounterValue(initialValue, limits));

	const increment = useCallback(() => {
		setValue((current) => getIncrementedValue(current, step, limits));
	}, [step, min, max]);

	const decrement = useCallback(() => {
		setValue((current) => getDecrementedValue(current, step, limits));
	}, [step, min, max]);

	const reset = useCallback(() => {
		setValue(getCounterResetValue(initialValue, limits));
	}, [initialValue, min, max]);

	const set = useCallback(
		(nextValue: number) => {
			setValue(clampCounterValue(nextValue, limits));
		},
		[min, max],
	);

	return { value, increment, decrement, reset, set };
}

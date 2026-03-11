import { useCallback, useEffect, useRef, useState } from 'react';

export function useDebouncedState<T>(initialValue: T, delay = 300) {
	const [value, setValue] = useState(initialValue);
	const timeoutRef = useRef<number | null>(null);

	const setDebouncedValue = useCallback(
		(nextValue: T) => {
			if (timeoutRef.current !== null) {
				window.clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = window.setTimeout(() => {
				setValue(nextValue);
			}, delay);
		},
		[delay],
	);

	useEffect(
		() => () => {
			if (timeoutRef.current !== null) {
				window.clearTimeout(timeoutRef.current);
			}
		},
		[],
	);

	return [value, setDebouncedValue] as const;
}

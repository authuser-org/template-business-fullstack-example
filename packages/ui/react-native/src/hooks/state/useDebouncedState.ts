import { useCallback, useEffect, useRef, useState } from 'react';

export function useDebouncedState<T>(initialValue: T, delay = 300) {
	const [value, setValue] = useState(initialValue);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const setDebouncedValue = useCallback(
		(nextValue: T) => {
			if (timeoutRef.current !== null) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				setValue(nextValue);
			}, delay);
		},
		[delay],
	);

	useEffect(
		() => () => {
			if (timeoutRef.current !== null) {
				clearTimeout(timeoutRef.current);
			}
		},
		[],
	);

	return [value, setDebouncedValue] as const;
}

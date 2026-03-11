import { useEffect, useRef, useState } from 'react';

export function useThrottledValue<T>(value: T, delay = 300) {
	const [throttledValue, setThrottledValue] = useState(value);
	const lastExecutedRef = useRef(0);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		const now = Date.now();
		const elapsed = now - lastExecutedRef.current;

		if (elapsed >= delay) {
			lastExecutedRef.current = now;
			setThrottledValue(value);
			return;
		}

		if (timeoutRef.current !== null) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			lastExecutedRef.current = Date.now();
			setThrottledValue(value);
		}, delay - elapsed);

		return () => {
			if (timeoutRef.current !== null) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [value, delay]);

	return throttledValue;
}

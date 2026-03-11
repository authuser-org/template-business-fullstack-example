import { useCallback, useEffect, useRef, useState } from 'react';

export function useInterval(callback: () => void, delay = 1000) {
	const intervalRef = useRef<number | null>(null);
	const callbackRef = useRef(callback);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	const stop = useCallback(() => {
		if (intervalRef.current !== null) {
			window.clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
		setIsActive(false);
	}, []);

	const start = useCallback(() => {
		stop();
		setIsActive(true);
		intervalRef.current = window.setInterval(() => {
			callbackRef.current();
		}, delay);
	}, [delay, stop]);

	useEffect(() => stop, [stop]);

	return { start, stop, isActive };
}

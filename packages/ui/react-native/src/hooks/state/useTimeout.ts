import { useCallback, useEffect, useRef, useState } from 'react';

export function useTimeout(callback: () => void, delay = 0) {
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const callbackRef = useRef(callback);
	const [isPending, setIsPending] = useState(false);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	const clear = useCallback(() => {
		if (timeoutRef.current !== null) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
		setIsPending(false);
	}, []);

	const start = useCallback(() => {
		clear();
		setIsPending(true);
		timeoutRef.current = setTimeout(() => {
			setIsPending(false);
			callbackRef.current();
		}, delay);
	}, [clear, delay]);

	useEffect(() => clear, [clear]);

	return { start, clear, isPending };
}

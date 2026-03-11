import { mergeState } from '@repo/ui-core';
import { useCallback, useState } from 'react';

export function useSetState<T extends Record<string, unknown>>(
	initialState: T,
) {
	const [state, setStateValue] = useState(initialState);

	const setState = useCallback(
		(patch: Partial<T> | ((current: T) => Partial<T>)) => {
			setStateValue((current) => {
				const resolvedPatch =
					typeof patch === 'function' ? patch(current) : patch;
				return mergeState(current, resolvedPatch);
			});
		},
		[],
	);

	const reset = useCallback(() => {
		setStateValue(initialState);
	}, [initialState]);

	return { state, setState, reset };
}

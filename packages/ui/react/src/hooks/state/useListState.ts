import {
	appendListItem,
	prependListItem,
	removeListItem,
	reorderListItem,
	replaceListItem,
} from '@repo/ui-core';
import { useCallback, useState } from 'react';

export function useListState<T>(initialValues: T[] = []) {
	const [values, setValues] = useState(initialValues);

	const append = useCallback((item: T) => {
		setValues((current) => appendListItem(current, item));
	}, []);

	const prepend = useCallback((item: T) => {
		setValues((current) => prependListItem(current, item));
	}, []);

	const remove = useCallback((index: number) => {
		setValues((current) => removeListItem(current, index));
	}, []);

	const setItem = useCallback((index: number, item: T) => {
		setValues((current) => replaceListItem(current, index, item));
	}, []);

	const reorder = useCallback((fromIndex: number, toIndex: number) => {
		setValues((current) => reorderListItem(current, fromIndex, toIndex));
	}, []);

	const reset = useCallback(() => {
		setValues(initialValues);
	}, [initialValues]);

	return {
		values,
		setValues,
		append,
		prepend,
		remove,
		setItem,
		reorder,
		reset,
	};
}

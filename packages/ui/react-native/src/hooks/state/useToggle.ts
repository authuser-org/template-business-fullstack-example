import { useCallback, useState } from 'react';
import {
	getDisabledValue,
	getEnabledValue,
	getToggledValue,
} from '@repo/ui-core';

export function useToggle(initialValue = false) {
	const [value, setValue] = useState(initialValue);

	const toggle = useCallback(() => {
		setValue((previous) => getToggledValue(previous));
	}, []);

	const setTrue = useCallback(() => {
		setValue(getEnabledValue());
	}, []);

	const setFalse = useCallback(() => {
		setValue(getDisabledValue());
	}, []);

	return { value, toggle, setTrue, setFalse };
}

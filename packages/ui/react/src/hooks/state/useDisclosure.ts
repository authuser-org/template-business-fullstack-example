import {
	getClosedValue,
	getDisclosureToggledValue,
	getOpenedValue,
} from '@repo/ui-core';
import { useCallback, useState } from 'react';

export function useDisclosure(initialValue = false) {
	const [opened, setOpened] = useState(initialValue);

	const open = useCallback(() => {
		setOpened(getOpenedValue());
	}, []);

	const close = useCallback(() => {
		setOpened(getClosedValue());
	}, []);

	const toggle = useCallback(() => {
		setOpened((current) => getDisclosureToggledValue(current));
	}, []);

	return { opened, open, close, toggle };
}

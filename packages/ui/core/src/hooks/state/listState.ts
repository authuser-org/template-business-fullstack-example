export function appendListItem<T>(list: T[], item: T): T[] {
	return [...list, item];
}

export function prependListItem<T>(list: T[], item: T): T[] {
	return [item, ...list];
}

export function removeListItem<T>(list: T[], index: number): T[] {
	return list.filter((_, currentIndex) => currentIndex !== index);
}

export function replaceListItem<T>(list: T[], index: number, item: T): T[] {
	return list.map((currentItem, currentIndex) =>
		currentIndex === index ? item : currentItem,
	);
}

export function reorderListItem<T>(
	list: T[],
	fromIndex: number,
	toIndex: number,
): T[] {
	if (
		fromIndex < 0 ||
		toIndex < 0 ||
		fromIndex >= list.length ||
		toIndex >= list.length ||
		fromIndex === toIndex
	) {
		return list;
	}

	const copied = [...list];
	const [moved] = copied.splice(fromIndex, 1);

	if (typeof moved === 'undefined') {
		return list;
	}

	copied.splice(toIndex, 0, moved);
	return copied;
}

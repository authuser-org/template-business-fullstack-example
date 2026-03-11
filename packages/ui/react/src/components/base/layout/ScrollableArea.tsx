import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../../index';

export interface ScrollableAreaProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	maxHeight?: number;
}

export function ScrollableArea({
	children,
	maxHeight = 320,
	className,
	style,
	...props
}: ScrollableAreaProps) {
	return (
		<div
			className={cx(
				'overflow-auto rounded-md border border-surface-border',
				className,
			)}
			style={{ maxHeight, ...style }}
			{...props}
		>
			{children}
		</div>
	);
}

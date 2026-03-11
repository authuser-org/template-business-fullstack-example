import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../../index';

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	columns?: number;
	minItemWidth?: number;
	gap?: number;
}

export function Grid({
	children,
	columns,
	minItemWidth,
	gap = 12,
	className,
	style,
	...props
}: GridProps) {
	const gridTemplateColumns = columns
		? `repeat(${columns}, minmax(0, 1fr))`
		: minItemWidth
			? `repeat(auto-fit, minmax(${minItemWidth}px, 1fr))`
			: undefined;

	return (
		<div
			className={cx('grid', className)}
			style={{
				gap,
				gridTemplateColumns,
				...(style as CSSProperties),
			}}
			{...props}
		>
			{children}
		</div>
	);
}

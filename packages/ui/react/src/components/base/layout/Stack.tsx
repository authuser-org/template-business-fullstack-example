import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../../index';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	gap?: number;
	direction?: 'row' | 'column';
	align?: CSSProperties['alignItems'];
	justify?: CSSProperties['justifyContent'];
	wrap?: CSSProperties['flexWrap'];
}

export function Stack({
	children,
	gap = 12,
	direction = 'column',
	align,
	justify,
	wrap,
	className,
	style,
	...props
}: StackProps) {
	return (
		<div
			className={cx('flex', className)}
			style={{
				gap,
				flexDirection: direction,
				alignItems: align,
				justifyContent: justify,
				flexWrap: wrap,
				...(style as CSSProperties),
			}}
			{...props}
		>
			{children}
		</div>
	);
}

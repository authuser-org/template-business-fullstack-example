import type { HTMLAttributes } from 'react';
import { cx } from '../../../index';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
	height?: number;
	width?: number | string;
	circle?: boolean;
}

export function Skeleton({
	height = 16,
	width = '100%',
	circle,
	className,
	style,
	...props
}: SkeletonProps) {
	return (
		<div
			className={cx(
				'animate-pulse bg-surface-muted',
				circle ? 'rounded-full' : 'rounded-md',
				className,
			)}
			style={{
				height,
				width,
				...style,
			}}
			{...props}
		/>
	);
}

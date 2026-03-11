import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../../index';

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	ratio?: number;
}

export function AspectRatio({
	children,
	ratio = 16 / 9,
	className,
	style,
	...props
}: AspectRatioProps) {
	return (
		<div
			className={cx('relative w-full overflow-hidden rounded-md', className)}
			style={{ aspectRatio: `${ratio}`, ...(style as CSSProperties) }}
			{...props}
		>
			<div className="absolute inset-0">{children}</div>
		</div>
	);
}

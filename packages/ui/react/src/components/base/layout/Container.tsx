import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../../index';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

export function Container({ children, className, ...props }: ContainerProps) {
	return (
		<div
			className={cx('mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8', className)}
			{...props}
		>
			{children}
		</div>
	);
}

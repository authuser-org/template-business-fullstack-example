import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../../index';

export interface MainLayoutProps extends HTMLAttributes<HTMLElement> {
	children: ReactNode;
}

export function MainLayout({ children, className, ...props }: MainLayoutProps) {
	return (
		<main
			className={cx(
				'mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 lg:px-8',
				className,
			)}
			{...props}
		>
			{children}
		</main>
	);
}

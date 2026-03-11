import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../../index';

export interface PageLayoutProps extends Omit<
	HTMLAttributes<HTMLDivElement>,
	'title'
> {
	title?: ReactNode;
	description?: ReactNode;
	children: ReactNode;
}

export function PageLayout({
	title,
	description,
	children,
	className,
	...props
}: PageLayoutProps) {
	return (
		<div className={cx('flex flex-col gap-4', className)} {...props}>
			{title || description ? (
				<div className="flex flex-col gap-1">
					{title ? <h1 className="text-2xl font-bold">{title}</h1> : null}
					{description ? (
						<p className="text-sm text-zinc-600 dark:text-zinc-400">
							{description}
						</p>
					) : null}
				</div>
			) : null}
			{children}
		</div>
	);
}

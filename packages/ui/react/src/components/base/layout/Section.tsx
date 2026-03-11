import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../../index';

export interface SectionProps extends Omit<
	HTMLAttributes<HTMLElement>,
	'title'
> {
	title?: ReactNode;
	description?: ReactNode;
	children: ReactNode;
}

export function Section({
	title,
	description,
	children,
	className,
	...props
}: SectionProps) {
	return (
		<section className={cx('flex flex-col gap-3', className)} {...props}>
			{title || description ? (
				<div className="flex flex-col gap-1">
					{title ? <h2 className="text-lg font-semibold">{title}</h2> : null}
					{description ? (
						<p className="text-sm text-zinc-600 dark:text-zinc-400">
							{description}
						</p>
					) : null}
				</div>
			) : null}
			{children}
		</section>
	);
}

import type { HTMLAttributes } from 'react';
import { cx } from '../../../index';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
	value: number;
}

function clampProgress(value: number) {
	return Math.max(0, Math.min(100, value));
}

export function Progress({ value, className, ...props }: ProgressProps) {
	const safeValue = clampProgress(value);

	return (
		<div
			className={cx(
				'h-2 w-full overflow-hidden rounded-full bg-surface-muted',
				className,
			)}
			{...props}
		>
			<div
				className="h-full rounded-full bg-brand-500 transition-all"
				style={{ width: `${safeValue}%` }}
			/>
		</div>
	);
}

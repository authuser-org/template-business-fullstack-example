import type { HTMLAttributes } from 'react';
import { cx } from '../../../index';
import { Button } from '../button';

export interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
	page: number;
	totalPages: number;
	onPageChange?: (page: number) => void;
}

export function Pagination({
	page,
	totalPages,
	onPageChange,
	className,
	...props
}: PaginationProps) {
	const safePage = Math.max(1, Math.min(totalPages, page));

	return (
		<div className={cx('flex items-center gap-2', className)} {...props}>
			<Button
				size="sm"
				variant="secondary"
				onClick={() => onPageChange?.(safePage - 1)}
				disabled={safePage <= 1}
			>
				Anterior
			</Button>
			<span className="text-sm">
				{safePage} / {totalPages}
			</span>
			<Button
				size="sm"
				variant="secondary"
				onClick={() => onPageChange?.(safePage + 1)}
				disabled={safePage >= totalPages}
			>
				Siguiente
			</Button>
		</div>
	);
}

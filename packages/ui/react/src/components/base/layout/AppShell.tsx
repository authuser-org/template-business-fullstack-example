import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../../index';

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
	header?: ReactNode;
	navigation?: ReactNode;
	footer?: ReactNode;
	children: ReactNode;
}

export function AppShell({
	header,
	navigation,
	footer,
	children,
	className,
	...props
}: AppShellProps) {
	return (
		<div
			className={cx(
				'min-h-screen bg-surface-background text-surface-foreground',
				className,
			)}
			{...props}
		>
			{header ? <header>{header}</header> : null}
			<div className="mx-auto flex w-full max-w-7xl gap-4 px-4 py-4 sm:px-6 lg:px-8">
				{navigation ? (
					<aside className="hidden w-64 shrink-0 lg:block">{navigation}</aside>
				) : null}
				<main className="min-w-0 flex-1">{children}</main>
			</div>
			{footer ? <footer>{footer}</footer> : null}
		</div>
	);
}

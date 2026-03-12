import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

const BOTTOM_SHEET_ANIMATION_MS = 280;
const BOTTOM_SHEET_ENTER_DELAY_MS = 16;

export type BottomSheetProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: ReactNode;
	title?: ReactNode;
	defaultSnap?: number | ((params: { maxHeight: number }) => number);
	blocking?: boolean;
};

export function BottomSheet({
	open,
	onOpenChange,
	children,
	title,
	defaultSnap,
}: BottomSheetProps) {
	const [mounted, setMounted] = useState(false);
	const [rendered, setRendered] = useState(open);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!mounted) {
			return;
		}

		if (open) {
			setVisible(false);
			setRendered(true);
			const frame = window.requestAnimationFrame(() => {
				setVisible(true);
			});
			const timeout = window.setTimeout(() => {
				setVisible(true);
			}, BOTTOM_SHEET_ENTER_DELAY_MS);

			return () => {
				window.cancelAnimationFrame(frame);
				window.clearTimeout(timeout);
			};
		}

		if (!rendered) {
			return;
		}

		setVisible(false);
		const timeout = window.setTimeout(() => {
			setRendered(false);
		}, BOTTOM_SHEET_ANIMATION_MS);

		return () => window.clearTimeout(timeout);
	}, [open, mounted, rendered]);

	useEffect(() => {
		if (!open) {
			return;
		}

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onOpenChange(false);
			}
		};

		window.addEventListener('keydown', handleEscape);
		return () => window.removeEventListener('keydown', handleEscape);
	}, [open, onOpenChange]);

	const maxHeight = useMemo(() => {
		if (!mounted) {
			return 0;
		}

		if (typeof defaultSnap === 'function') {
			return defaultSnap({ maxHeight: window.innerHeight });
		}

		if (typeof defaultSnap === 'number') {
			return defaultSnap;
		}

		return Math.min(420, window.innerHeight * 0.7);
	}, [defaultSnap, mounted]);

	if (!mounted || !rendered) {
		return null;
	}

	return createPortal(
		<div
			className="ui-bottom-sheet-root"
			data-state={visible ? 'open' : 'closed'}
			role="dialog"
			aria-modal="true"
		>
			<button
				type="button"
				aria-label="Cerrar bottom sheet"
				className="ui-bottom-sheet-backdrop"
				onClick={() => onOpenChange(false)}
			/>
			<div className="ui-bottom-sheet-panel" style={{ maxHeight }}>
				<div className="ui-bottom-sheet-handle" />
				<div className="flex flex-col gap-3 p-3">
					{title ? (
						<h3 className="text-base font-semibold text-surface-foreground">
							{title}
						</h3>
					) : null}
					{children}
				</div>
			</div>
		</div>,
		document.body,
	);
}

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../button';

const MODAL_ANIMATION_MS = 200;
const MODAL_ENTER_DELAY_MS = 16;

export type ModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: ReactNode;
	title?: ReactNode;
};

export function Modal({ open, onOpenChange, children, title }: ModalProps) {
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
			}, MODAL_ENTER_DELAY_MS);

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
		}, MODAL_ANIMATION_MS);

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

	if (!mounted || !rendered) {
		return null;
	}

	return createPortal(
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4"
			style={{ pointerEvents: visible ? 'auto' : 'none' }}
			role="dialog"
			aria-modal="true"
		>
			<button
				type="button"
				aria-label="Cerrar modal"
				className={`absolute inset-0 border-0 bg-black/50 p-0 transition-opacity duration-200 ${
					visible ? 'opacity-100' : 'opacity-0'
				}`}
				onClick={() => onOpenChange(false)}
			/>
			<div
				className={`relative w-full max-w-lg rounded-lg border border-surface-border bg-surface-background p-4 shadow-lg transition-all duration-200 ease-out will-change-transform will-change-opacity ${
					visible
						? 'translate-y-0 scale-100 opacity-100'
						: 'translate-y-6 scale-95 opacity-0'
				}`}
			>
				<div className="mb-3 flex items-start justify-between gap-3">
					{title ? (
						<h3 className="text-base font-semibold text-surface-foreground">
							{title}
						</h3>
					) : (
						<span />
					)}
					<Button size="sm" variant="ghost" onClick={() => onOpenChange(false)}>
						Cerrar
					</Button>
				</div>
				<div className="flex flex-col gap-3">{children}</div>
			</div>
		</div>,
		document.body,
	);
}

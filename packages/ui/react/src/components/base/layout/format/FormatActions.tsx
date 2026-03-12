'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CarouselItem } from '.';
import { Modal } from '../../modal';

const FAVORITES_STORAGE_KEY = 'ui-react:favorites';

function readFavorites(): Set<number> {
	if (typeof window === 'undefined') {
		return new Set();
	}

	try {
		const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
		if (!raw) {
			return new Set();
		}
		const parsed = JSON.parse(raw) as number[];
		return new Set(parsed);
	} catch {
		return new Set();
	}
}

function writeFavorites(favorites: Set<number>) {
	if (typeof window === 'undefined') {
		return;
	}
	window.localStorage.setItem(
		FAVORITES_STORAGE_KEY,
		JSON.stringify(Array.from(favorites)),
	);
}

type FormatActionsProps = {
	item: CarouselItem;
};

export function FormatActions({ item }: FormatActionsProps) {
	const [open, setOpen] = useState(false);
	const [favorites, setFavorites] = useState<Set<number>>(new Set());

	useEffect(() => {
		setFavorites(readFavorites());
	}, []);

	const isFavorite = useMemo(
		() => favorites.has(item.id),
		[favorites, item.id],
	);

	const toggleFavorite = () => {
		setFavorites((prev) => {
			const next = new Set(prev);
			if (next.has(item.id)) {
				next.delete(item.id);
			} else {
				next.add(item.id);
			}
			writeFavorites(next);
			return next;
		});
	};

	return (
		<>
			<button
				type="button"
				aria-label="Abrir opciones"
				onClick={() => setOpen(true)}
				className="absolute left-2 top-2 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition-opacity duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
			>
				<span className="text-lg leading-none">⋯</span>
			</button>

			<Modal open={open} onOpenChange={setOpen} title={item.title}>
				<div className="flex flex-col gap-2">
					<p className="text-sm text-surface-muted-foreground">
						{item.subtitle}
					</p>
					<img
						src={item.image}
						alt={item.title}
						className="h-40 w-full rounded-md object-cover"
					/>
					{item.badge && (
						<p className="text-xs font-medium text-surface-foreground">
							Etiqueta: {item.badge}
						</p>
					)}
				</div>

				<div className="mt-2 flex gap-2">
					<button
						type="button"
						onClick={toggleFavorite}
						className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground"
					>
						{isFavorite ? 'Quitar de favoritos' : 'Anadir a favoritos'}
					</button>
					<button
						type="button"
						onClick={() => setOpen(false)}
						className="rounded-md border border-surface-border px-3 py-2 text-sm font-medium text-surface-foreground"
					>
						Cerrar
					</button>
				</div>
			</Modal>
		</>
	);
}

'use client';

import { FILM_HERO_ITEMS } from '@repo/shared';
import { RowHeroCarousel } from '@repo/ui-react';

export function RowHeroCarouselClient() {
	const heroItems = FILM_HERO_ITEMS.map((item) => ({
		id: item.id,
		title: item.title,
		subtitle: item.subtitle,
		description: item.description,
		image: item.image,
		badge: item.badge,
		meta: [
			...(item.genre?.slice(0, 2) ?? []),
			...(item.year ? [String(item.year)] : []),
			...(item.duration ? [item.duration] : []),
		],
		ctaSecondary: {
			label: 'Mas info',
		},
	}));

	return (
		<RowHeroCarousel
			items={heroItems}
			autoPlay
			intervalMs={6000}
			showArrows
			showDots
		/>
	);
}

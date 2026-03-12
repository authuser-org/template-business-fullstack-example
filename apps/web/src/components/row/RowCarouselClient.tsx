'use client';

import {
	FILM_HORIZONTAL_ITEMS,
	FILM_VERTICAL_ITEMS,
	PODCAST_SQUARE_ITEMS,
	PROGRAM_HORIZONTAL_ITEMS,
} from '@repo/shared';
import { RowCarousel } from '@repo/ui-react';

export function RowCarouselClient() {
	return (
		<section aria-label="Partidos destacados" className="flex-col flex gap-20">
			<RowCarousel
				title="Últimos realities"
				format={{ type: 'landscape', size: 'xl' }}
				//formatComponents={{ landscape: LandscapeLive }}
				items={PROGRAM_HORIZONTAL_ITEMS}
			/>
			<RowCarousel
				title="Películas recomendadas"
				format={{ type: 'landscape', size: 'xl' }}
				items={FILM_HORIZONTAL_ITEMS}
			/>
			<RowCarousel
				title="Sigue todos los podcasts"
				format={{ type: 'square', size: 'xl' }}
				items={PODCAST_SQUARE_ITEMS}
			/>
			<RowCarousel
				title="Sábado de acción"
				format={{ type: 'portrait', size: '2xl' }}
				items={FILM_VERTICAL_ITEMS}
			/>
			<RowCarousel title="Canales en directo" format={{ type: 'round' }} />
		</section>
	);
}

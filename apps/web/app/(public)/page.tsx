import { RowHeroCarouselClient } from '@/src/components/hero/RowHeroCarouselClient';
import { RowCarouselClient } from '@/src/components/row/RowCarouselClient';

export default function HomePage() {
	return (
		<main className="min-h-screen bg-black text-white pb-20 flex flex-col gap-12">
			<section aria-label="Highlights">
				<RowHeroCarouselClient />
			</section>
			<RowCarouselClient />
		</main>
	);
}

import { Button, Card, Progress, Skeleton } from '@repo/ui-react';

export function OttHomeSection() {
	const featured = {
		title: 'The Last Horizon',
		description: 'Sci‑fi · 2026 · 2 temporadas',
		match: 96,
	};

	const rails = [
		{ title: 'Continuar viendo', progress: 35 },
		{ title: 'Tendencias', progress: 0 },
		{ title: 'Nuevos lanzamientos', progress: 0 },
	];

	return (
		<Card className="w-full max-w-xl">
			<div className="flex flex-col gap-4">
				<h2 className="text-lg font-semibold text-surface-foreground">
					Ejemplo UI OTT (Home)
				</h2>

				<div className="rounded-lg border border-surface-border bg-brand-500 p-4 text-white">
					<p className="text-xs font-semibold uppercase opacity-90">
						Destacado
					</p>
					<h3 className="mt-1 text-xl font-bold">{featured.title}</h3>
					<p className="text-sm opacity-90">{featured.description}</p>
					<p className="mt-2 text-sm">{featured.match}% de match</p>
					<div className="mt-3 flex flex-wrap gap-2">
						<Button size="sm">Reproducir</Button>
						<Button size="sm" variant="secondary">
							Más info
						</Button>
					</div>
				</div>

				<div className="grid gap-3 sm:grid-cols-3">
					{rails.map((item) => (
						<Card key={item.title} className="p-3">
							<p className="text-sm font-semibold text-surface-foreground">
								{item.title}
							</p>
							{item.progress > 0 ? (
								<div className="mt-2">
									<Progress value={item.progress} />
								</div>
							) : (
								<div className="mt-2 flex flex-col gap-2">
									<Skeleton height={8} width="90%" />
									<Skeleton height={8} width="70%" />
								</div>
							)}
						</Card>
					))}
				</div>
			</div>
		</Card>
	);
}

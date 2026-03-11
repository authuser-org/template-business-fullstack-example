import { Button, Card, Progress } from '@repo/ui-react';

type OttDetailSectionProps = {
	onOpenOptions: () => void;
};

export function OttDetailSection({ onOpenOptions }: OttDetailSectionProps) {
	const episodes = [
		{
			id: 's1e1',
			title: 'E1 · El primer salto',
			duration: '48 min',
			progress: 100,
		},
		{
			id: 's1e2',
			title: 'E2 · Zona prohibida',
			duration: '52 min',
			progress: 65,
		},
		{
			id: 's1e3',
			title: 'E3 · Punto de no retorno',
			duration: '50 min',
			progress: 0,
		},
	];

	return (
		<Card className="w-full max-w-xl">
			<div className="flex flex-col gap-4">
				<h2 className="text-lg font-semibold text-surface-foreground">
					Ejemplo UI OTT (Detalle)
				</h2>

				<div className="flex flex-col gap-2 rounded-md border border-surface-border bg-surface-background p-3">
					<p className="text-xs font-semibold uppercase text-brand-600">
						Serie original
					</p>
					<h3 className="text-xl font-bold text-surface-foreground">
						The Last Horizon
					</h3>
					<p className="text-sm text-zinc-600 dark:text-zinc-400">
						Sci‑fi · 2026 · 16+ · 2 temporadas
					</p>
					<p className="text-sm text-surface-foreground">
						Una misión interestelar que redefine el destino de la humanidad
						cuando una señal desconocida cruza el sistema solar.
					</p>
					<div className="flex flex-wrap gap-2">
						<Button size="sm">Reproducir</Button>
						<Button size="sm" variant="secondary">
							Añadir a mi lista
						</Button>
						<Button size="sm" variant="ghost" onClick={onOpenOptions}>
							Más opciones
						</Button>
					</div>
				</div>

				<div className="flex flex-col gap-3">
					<p className="text-sm font-semibold text-surface-foreground">
						Episodios
					</p>
					{episodes.map((episode) => (
						<Card key={episode.id} className="p-3">
							<div className="flex flex-col gap-2">
								<div className="flex items-center justify-between gap-2">
									<p className="text-sm font-semibold text-surface-foreground">
										{episode.title}
									</p>
									<p className="text-xs text-zinc-600 dark:text-zinc-400">
										{episode.duration}
									</p>
								</div>
								<Progress value={episode.progress} />
							</div>
						</Card>
					))}
				</div>
			</div>
		</Card>
	);
}

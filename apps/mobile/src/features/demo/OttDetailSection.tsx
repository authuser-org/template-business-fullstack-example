import {
	Alert,
	Button,
	Card,
	nativeTheme,
	Progress,
} from '@repo/ui-react-native';
import { StyleSheet, Text, View } from 'react-native';

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
		<Card>
			<View style={styles.sectionHeader}>
				<Text style={styles.sectionTitle}>Ejemplo UI OTT (Detalle)</Text>
			</View>
			<Text style={styles.metaText}>
				Serie original · 2026 · 16+ · 2 temporadas
			</Text>
			<Text style={styles.descriptionText}>
				Una misión interestelar redefine el destino de la humanidad cuando una
				señal desconocida cruza el sistema solar.
			</Text>

			<View style={styles.buttonsRow}>
				<Button size="sm">Reproducir</Button>
				<Button size="sm" variant="secondary">
					Añadir a mi lista
				</Button>
				<Button size="sm" variant="ghost" onPress={onOpenOptions}>
					Más opciones
				</Button>
			</View>

			<View style={styles.episodesList}>
				<Text style={styles.sectionSubtitle}>Episodios</Text>
				{episodes.map(episode => (
					<Card key={episode.id} style={styles.episodeCard}>
						<View style={styles.episodeRow}>
							<Text style={styles.episodeTitle}>{episode.title}</Text>
							<Text style={styles.episodeDuration}>{episode.duration}</Text>
						</View>
						<Progress value={episode.progress} />
					</Card>
				))}
			</View>

			<Alert title="Estado de reproducción" variant="info">
				Tu progreso se sincroniza entre dispositivos.
			</Alert>
		</Card>
	);
}

const styles = StyleSheet.create({
	buttonsRow: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 12,
	},
	sectionHeader: {
		marginBottom: 4,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: '700',
		color: nativeTheme.colors.foreground,
	},
	sectionSubtitle: {
		fontSize: 14,
		fontWeight: '700',
		color: nativeTheme.colors.foreground,
	},
	metaText: {
		fontSize: 13,
		color: nativeTheme.colors.muted,
	},
	descriptionText: {
		fontSize: 14,
		lineHeight: 20,
		color: nativeTheme.colors.foreground,
	},
	episodesList: {
		gap: 10,
	},
	episodeCard: {
		padding: 12,
	},
	episodeRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 8,
		gap: 8,
	},
	episodeTitle: {
		flex: 1,
		fontSize: 14,
		fontWeight: '600',
		color: nativeTheme.colors.foreground,
	},
	episodeDuration: {
		fontSize: 12,
		color: nativeTheme.colors.muted,
	},
});

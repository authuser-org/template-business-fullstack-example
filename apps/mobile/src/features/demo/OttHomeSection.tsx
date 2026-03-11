import {
	Button,
	Card,
	nativeTheme,
	Progress,
	Skeleton,
} from '@repo/ui-react-native';
import { StyleSheet, Text, View } from 'react-native';

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
		<Card>
			<View style={styles.sectionHeader}>
				<Text style={styles.sectionTitle}>Ejemplo UI OTT (Home)</Text>
			</View>

			<View style={styles.featuredBlock}>
				<Text style={styles.featuredLabel}>Destacado</Text>
				<Text style={styles.featuredTitle}>{featured.title}</Text>
				<Text style={styles.featuredDescription}>{featured.description}</Text>
				<Text style={styles.featuredDescription}>
					{featured.match}% de match
				</Text>
				<View style={styles.buttonsRow}>
					<Button size="sm">Reproducir</Button>
					<Button size="sm" variant="secondary">
						Más info
					</Button>
				</View>
			</View>

			<View style={styles.railsList}>
				{rails.map(item => (
					<Card key={item.title} style={styles.episodeCard}>
						<Text style={styles.episodeTitle}>{item.title}</Text>
						{item.progress > 0 ? (
							<Progress value={item.progress} />
						) : (
							<View style={styles.skeletonGroup}>
								<Skeleton height={8} width="92%" />
								<Skeleton height={8} width="70%" />
							</View>
						)}
					</Card>
				))}
			</View>
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
	featuredBlock: {
		gap: 8,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: nativeTheme.colors.border,
		backgroundColor: nativeTheme.colors.brand,
		padding: 12,
	},
	featuredLabel: {
		fontSize: 11,
		fontWeight: '700',
		textTransform: 'uppercase',
		color: '#ffffffcc',
	},
	featuredTitle: {
		fontSize: 20,
		fontWeight: '700',
		color: '#fff',
	},
	featuredDescription: {
		fontSize: 13,
		color: '#ffffffe6',
	},
	railsList: {
		gap: 10,
	},
	skeletonGroup: {
		gap: 8,
		marginTop: 8,
	},
	episodeCard: {
		padding: 12,
	},
	episodeTitle: {
		flex: 1,
		fontSize: 14,
		fontWeight: '600',
		color: nativeTheme.colors.foreground,
	},
});

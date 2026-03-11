import {
	BottomSheet,
	Button,
	Modal,
	nativeTheme,
	useToggle,
} from '@repo/ui-react-native';
import {
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from 'react-native';
import {
	SafeAreaProvider,
	useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { OttDetailSection } from './src/features/demo/OttDetailSection';
import { OttHomeSection } from './src/features/demo/OttHomeSection';

function App() {
	const isDarkMode = useColorScheme() === 'dark';

	return (
		<SafeAreaProvider>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
			<AppContent />
		</SafeAreaProvider>
	);
}

function AppContent() {
	const safeAreaInsets = useSafeAreaInsets();
	const { value, toggle } = useToggle(false);
	const sheetOpen = useToggle(false);
	const modalOpen = useToggle(false);

	return (
		<ScrollView
			style={[
				styles.container,
				{
					paddingTop: safeAreaInsets.top + 24,
					paddingBottom: safeAreaInsets.bottom + 24,
					paddingLeft: 24,
					paddingRight: 24,
				},
			]}
			contentContainerStyle={styles.contentContainer}
		>
			<Text style={styles.title}>Integración de @repo/ui en Mobile</Text>
			<Text style={styles.subtitle}>
				Estado actual de useToggle: {value ? 'activo' : 'inactivo'}
			</Text>

			<View style={styles.buttonsRow}>
				<Button onPress={toggle} variant="primary" size="md">
					Toggle estado
				</Button>
				<Button variant="secondary" size="md">
					Botón secundario
				</Button>
			</View>

			<OttHomeSection />
			<OttDetailSection onOpenOptions={sheetOpen.setTrue} />

			<View style={styles.buttonsRow}>
				<Button size="md" variant="secondary" onPress={modalOpen.setTrue}>
					Abrir Modal (mobile)
				</Button>
			</View>

			<BottomSheet
				open={sheetOpen.value}
				onOpenChange={open =>
					open ? sheetOpen.setTrue() : sheetOpen.setFalse()
				}
				title="Acciones rápidas"
			>
				<Button size="sm" onPress={sheetOpen.setFalse}>
					Cerrar
				</Button>
				<Button size="sm" variant="secondary">
					Compartir
				</Button>
			</BottomSheet>

			<Modal
				open={modalOpen.value}
				onOpenChange={open =>
					open ? modalOpen.setTrue() : modalOpen.setFalse()
				}
				title="Modal OTT (mobile)"
			>
				<Text style={styles.modalText}>
					Úsalo para promociones, control parental o confirmaciones antes de una
					reproducción.
				</Text>
				<View style={styles.buttonsRow}>
					<Button size="sm" onPress={modalOpen.setFalse}>
						Continuar
					</Button>
					<Button size="sm" variant="ghost" onPress={modalOpen.setFalse}>
						Cancelar
					</Button>
				</View>
			</Modal>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		gap: 16,
		justifyContent: 'center',
		backgroundColor: nativeTheme.colors.background,
		paddingBottom: 24,
	},
	title: {
		fontSize: nativeTheme.fontSize.xl,
		fontWeight: '700',
		color: nativeTheme.colors.foreground,
	},
	subtitle: {
		fontSize: nativeTheme.fontSize.base,
		color: nativeTheme.colors.foreground,
	},
	buttonsRow: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: nativeTheme.spacing.md,
	},
	modalText: {
		fontSize: nativeTheme.fontSize.base,
		lineHeight: 22,
		color: nativeTheme.colors.foreground,
	},
});

export default App;

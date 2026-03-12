'use client';

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

export type AvatarColor =
	| 'red'
	| 'blue'
	| 'green'
	| 'yellow'
	| 'purple'
	| 'orange'
	| 'pink'
	| 'cyan';

export type Profile = {
	id: string;
	name: string;
	avatarColor: AvatarColor;
	/** Emoji o inicial usada como avatar */
	avatarEmoji?: string;
	isKid: boolean;
	createdAt: number;
};

type ProfilesState = {
	profiles: Profile[];
	activeProfileId: string | null;
};

type ProfilesContextValue = ProfilesState & {
	activeProfile: Profile | null;
	addProfile: (data: Omit<Profile, 'id' | 'createdAt'>) => Profile;
	updateProfile: (
		id: string,
		data: Partial<Omit<Profile, 'id' | 'createdAt'>>,
	) => void;
	deleteProfile: (id: string) => void;
	selectProfile: (id: string) => void;
	clearActive: () => void;
};

// ---------------------------------------------------------------------------
// Valores por defecto (perfil administrador)
// ---------------------------------------------------------------------------

const DEFAULT_PROFILES: Profile[] = [
	{
		id: 'profile-admin',
		name: 'Admin',
		avatarColor: 'red',
		avatarEmoji: '⚽',
		isKid: false,
		createdAt: 0,
	},
];

const STORAGE_KEY = 'rfeftv_profiles';
const ACTIVE_KEY = 'rfeftv_active_profile';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const ProfilesContext = createContext<ProfilesContextValue | null>(null);

function loadFromStorage(): ProfilesState {
	if (typeof window === 'undefined') {
		return { profiles: DEFAULT_PROFILES, activeProfileId: null };
	}
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		const activeProfileId = localStorage.getItem(ACTIVE_KEY);
		const profiles: Profile[] = raw ? JSON.parse(raw) : DEFAULT_PROFILES;
		return {
			profiles: profiles.length > 0 ? profiles : DEFAULT_PROFILES,
			activeProfileId,
		};
	} catch {
		return { profiles: DEFAULT_PROFILES, activeProfileId: null };
	}
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function ProfilesProvider({ children }: { children: React.ReactNode }) {
	// Inicialización lazy: en servidor devuelve defaults, en cliente carga de localStorage
	const [state, setState] = useState<ProfilesState>(() => {
		if (typeof window === 'undefined') {
			return { profiles: DEFAULT_PROFILES, activeProfileId: null };
		}
		return loadFromStorage();
	});

	// Bandera para evitar persistir antes de la hidratación
	const hydrated = useRef(false);

	useEffect(() => {
		hydrated.current = true;
	}, []);

	// Persistir perfiles
	useEffect(() => {
		if (!hydrated.current) return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state.profiles));
	}, [state.profiles]);

	// Persistir perfil activo
	useEffect(() => {
		if (!hydrated.current) return;
		if (state.activeProfileId) {
			localStorage.setItem(ACTIVE_KEY, state.activeProfileId);
		} else {
			localStorage.removeItem(ACTIVE_KEY);
		}
	}, [state.activeProfileId]);

	const addProfile = useCallback(
		(data: Omit<Profile, 'id' | 'createdAt'>): Profile => {
			const profile: Profile = {
				...data,
				id: `profile-${Date.now()}`,
				createdAt: Date.now(),
			};
			setState((s) => ({ ...s, profiles: [...s.profiles, profile] }));
			return profile;
		},
		[],
	);

	const updateProfile = useCallback(
		(id: string, data: Partial<Omit<Profile, 'id' | 'createdAt'>>) => {
			setState((s) => ({
				...s,
				profiles: s.profiles.map((p) => (p.id === id ? { ...p, ...data } : p)),
			}));
		},
		[],
	);

	const deleteProfile = useCallback((id: string) => {
		setState((s) => ({
			profiles: s.profiles.filter((p) => p.id !== id),
			activeProfileId: s.activeProfileId === id ? null : s.activeProfileId,
		}));
	}, []);

	const selectProfile = useCallback((id: string) => {
		setState((s) => ({ ...s, activeProfileId: id }));
	}, []);

	const clearActive = useCallback(() => {
		setState((s) => ({ ...s, activeProfileId: null }));
	}, []);

	const activeProfile =
		state.profiles.find((p) => p.id === state.activeProfileId) ?? null;

	return (
		<ProfilesContext.Provider
			value={{
				...state,
				activeProfile,
				addProfile,
				updateProfile,
				deleteProfile,
				selectProfile,
				clearActive,
			}}
		>
			{children}
		</ProfilesContext.Provider>
	);
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useProfiles() {
	const ctx = useContext(ProfilesContext);
	if (!ctx) throw new Error('useProfiles must be used within ProfilesProvider');
	return ctx;
}

// ---------------------------------------------------------------------------
// Helpers de estilo de avatar
// ---------------------------------------------------------------------------

export const AVATAR_COLORS: Record<AvatarColor, { bg: string; ring: string }> =
	{
		red: { bg: 'bg-red-600', ring: 'ring-red-500' },
		blue: { bg: 'bg-blue-600', ring: 'ring-blue-500' },
		green: { bg: 'bg-green-600', ring: 'ring-green-500' },
		yellow: { bg: 'bg-yellow-500', ring: 'ring-yellow-400' },
		purple: { bg: 'bg-purple-600', ring: 'ring-purple-500' },
		orange: { bg: 'bg-orange-500', ring: 'ring-orange-400' },
		pink: { bg: 'bg-pink-600', ring: 'ring-pink-500' },
		cyan: { bg: 'bg-cyan-600', ring: 'ring-cyan-500' },
	};

export const AVATAR_EMOJIS = [
	'⚽',
	'🏆',
	'🥅',
	'🎯',
	'⭐',
	'🦁',
	'🐉',
	'🚀',
	'🎮',
	'🎵',
];

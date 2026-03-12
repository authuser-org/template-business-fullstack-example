'use client';

import Link from 'next/link';
import Marquee from 'react-fast-marquee';

// ---------------------------------------------------------------------------
// Flag — imagen real porque Windows no renderiza emojis de bandera
// ---------------------------------------------------------------------------

const EMOJI_TO_CODE: Record<string, string> = {
	'🇪🇸': 'es',
	'🇫🇷': 'fr',
	'🇵🇱': 'pl',
	'🇮🇹': 'it',
	'🇩🇪': 'de',
	'🇬🇧': 'gb',
	'🇵🇹': 'pt',
	'🇸🇪': 'se',
	'🇧🇪': 'be',
	'🇳🇱': 'nl',
};

function Flag({ emoji }: { emoji: string }) {
	const code = EMOJI_TO_CODE[emoji];
	if (!code) return <span className="text-base leading-none">{emoji}</span>;
	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			src={`https://flagcdn.com/w40/${code}.png`}
			alt={code.toUpperCase()}
			width={24}
			height={18}
			className="h-4.5 w-6 rounded-sm object-cover"
		/>
	);
}

// ---------------------------------------------------------------------------
// Tipos y datos
// ---------------------------------------------------------------------------

type MatchStatus = 'live' | 'finished' | 'upcoming';

type MatchResult = {
	id: string;
	competition: string;
	team1: string;
	flag1: string;
	team2: string;
	flag2: string;
	score?: string;
	time?: string; // minuto si live, hora si upcoming
	status: MatchStatus;
	href: string;
};

const MATCHES: MatchResult[] = [
	{
		id: 'm1',
		competition: 'Nations League',
		team1: 'España',
		flag1: '🇪🇸',
		team2: 'Francia',
		flag2: '🇫🇷',
		score: '2 – 1',
		time: "74'",
		status: 'live',
		href: '/video',
	},
	{
		id: 'm2',
		competition: 'Clasif. Mundial',
		team1: 'España',
		flag1: '🇪🇸',
		team2: 'Polonia',
		flag2: '🇵🇱',
		score: '3 – 0',
		status: 'finished',
		href: '/partidos',
	},
	{
		id: 'm3',
		competition: 'Eurocopa Sub-21',
		team1: 'Portugal',
		flag1: '🇵🇹',
		team2: 'España',
		flag2: '🇪🇸',
		score: '1 – 2',
		status: 'finished',
		href: '/partidos',
	},
	{
		id: 'm4',
		competition: 'Amistoso',
		team1: 'Sel. Femenina',
		flag1: '🇪🇸',
		team2: 'Suecia',
		flag2: '🇸🇪',
		score: '1 – 1',
		time: "58'",
		status: 'live',
		href: '/video',
	},
	{
		id: 'm5',
		competition: 'Nations League',
		team1: 'Alemania',
		flag1: '🇩🇪',
		team2: 'Portugal',
		flag2: '🇵🇹',
		time: '20:45',
		status: 'upcoming',
		href: '/partidos',
	},
	{
		id: 'm6',
		competition: 'Nations League',
		team1: 'Italia',
		flag1: '🇮🇹',
		team2: 'Bélgica',
		flag2: '🇧🇪',
		score: '0 – 0',
		status: 'finished',
		href: '/partidos',
	},
	{
		id: 'm7',
		competition: 'Élite Round UEFA',
		team1: 'España FS',
		flag1: '🇪🇸',
		team2: 'Italia FS',
		flag2: '🇮🇹',
		score: '4 – 2',
		status: 'finished',
		href: '/partidos',
	},
	{
		id: 'm8',
		competition: 'Clasif. Mundial',
		team1: 'España',
		flag1: '🇪🇸',
		team2: 'Escocia',
		flag2: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
		time: '22:00',
		status: 'upcoming',
		href: '/partidos',
	},
];

// ---------------------------------------------------------------------------
// Tarjeta de resultado individual
// ---------------------------------------------------------------------------

function MatchCard({ match }: { match: MatchResult }) {
	const isLive = match.status === 'live';
	const isUpcoming = match.status === 'upcoming';

	return (
		<Link
			href={match.href}
			className="group flex shrink-0 items-center gap-3 rounded-xl border border-white/8 bg-white/4 px-4 py-2.5 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/10"
		>
			{/* Competición */}
			<span className="hidden text-[10px] font-bold uppercase tracking-widest text-zinc-500 sm:block">
				{match.competition}
			</span>

			{/* Separador */}
			<span className="hidden h-3 w-px bg-white/10 sm:block" />

			{/* Estado */}
			{isLive ? (
				<span className="flex items-center gap-1 rounded-full bg-red-600 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-white">
					<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
					{match.time}
				</span>
			) : isUpcoming ? (
				<span className="rounded-full bg-zinc-700 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-zinc-400">
					{match.time}
				</span>
			) : (
				<span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[9px] font-bold uppercase text-zinc-500">
					FIN
				</span>
			)}

			{/* Equipo 1 */}
			<span className="flex items-center gap-1.5 text-sm font-semibold text-white">
				<Flag emoji={match.flag1} />
				<span className="hidden md:block">{match.team1}</span>
			</span>

			{/* Marcador o vs */}
			<span
				className={`min-w-12 text-center text-sm font-black tabular-nums ${
					isLive ? 'text-red-400' : isUpcoming ? 'text-zinc-500' : 'text-white'
				}`}
			>
				{match.score ?? 'vs'}
			</span>

			{/* Equipo 2 */}
			<span className="flex items-center gap-1.5 text-sm font-semibold text-white">
				<span className="hidden md:block">{match.team2}</span>
				<Flag emoji={match.flag2} />
			</span>
		</Link>
	);
}

// ---------------------------------------------------------------------------
// Separador decorativo entre tarjetas
// ---------------------------------------------------------------------------

function Dot() {
	return <span className="shrink-0 text-zinc-700">✦</span>;
}

// ---------------------------------------------------------------------------
// Marquee principal
// ---------------------------------------------------------------------------

export function ResultsMarquee() {
	return (
		<div className="relative border-b border-white/6 bg-zinc-950/80 py-3 backdrop-blur-md">
			<Marquee
				speed={55}
				pauseOnHover
				gradient
				gradientColor="#09090b"
				gradientWidth={64}
			>
				{MATCHES.map((match) => (
					<span
						key={match.id}
						className="flex shrink-0 items-center gap-3 mr-3"
					>
						<MatchCard match={match} />
						<Dot />
					</span>
				))}
			</Marquee>
		</div>
	);
}

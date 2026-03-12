'use client';

import { Divider, Footer as UiFooter } from '@repo/ui-react';
import Image from 'next/image';
import Link from 'next/link';

const LINKS = {
	Contenido: [
		{ label: 'Partidos', href: '/matches' },
		{ label: 'Highlights', href: '/highlights' },
		{ label: 'Documentales', href: '/documentaries' },
		{ label: 'Selección Española', href: '/selection' },
		{ label: 'Fútbol Femenino', href: '/female' },
		{ label: 'Fútbol Sala', href: '/hall' },
	],
	Cuenta: [
		{ label: 'Iniciar sesión', href: '/login' },
		{ label: 'Registrarse', href: '/register' },
		{ label: 'Mi perfil', href: '/profile' },
		{ label: 'Suscripción', href: '/subscription' },
	],
	Legal: [
		{ label: 'Aviso legal', href: '/legal/alert' },
		{ label: 'Política de privacidad', href: '/legal/privacy' },
		{ label: 'Cookies', href: '/legal/cookies' },
		{ label: 'Condiciones de uso', href: '/legal/terms' },
	],
};

const SOCIAL = [
	{
		label: 'X / Twitter',
		href: 'https://twitter.com/rfef',
		icon: (
			<svg
				viewBox="0 0 24 24"
				fill="currentColor"
				className="h-5 w-5"
				aria-hidden="true"
			>
				<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
			</svg>
		),
	},
	{
		label: 'Instagram',
		href: 'https://instagram.com/rfef',
		icon: (
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth={1.75}
				className="h-5 w-5"
				aria-hidden="true"
			>
				<rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
				<circle cx="12" cy="12" r="4" />
				<circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
			</svg>
		),
	},
	{
		label: 'YouTube',
		href: 'https://youtube.com/rfef',
		icon: (
			<svg
				viewBox="0 0 24 24"
				fill="currentColor"
				className="h-5 w-5"
				aria-hidden="true"
			>
				<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
			</svg>
		),
	},
	{
		label: 'TikTok',
		href: 'https://tiktok.com/@rfef',
		icon: (
			<svg
				viewBox="0 0 24 24"
				fill="currentColor"
				className="h-5 w-5"
				aria-hidden="true"
			>
				<path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z" />
			</svg>
		),
	},
];

export function Footer() {
	const year = new Date().getFullYear();

	return (
		<UiFooter className="border-t border-zinc-800 bg-zinc-950 p-0 text-zinc-400">
			<div className="px-4 pb-8 pt-12 md:px-8 lg:px-24">
				{/* Top: logo + columnas */}
				<div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
					{/* Marca */}
					<div className="col-span-2 md:col-span-1">
						<Link href="/" className="inline-flex items-center">
							<Image
								src="/images/logo.png"
								alt="Logo OTT"
								width={180}
								height={54}
								className="h-10 w-auto"
							/>
						</Link>
						<p className="mt-3 max-w-xs text-sm leading-relaxed">
							La plataforma oficial de la Real Federación Española de Fútbol.
							Todo el fútbol español, en un solo lugar.
						</p>
						{/* Social */}
						<div className="mt-5 flex items-center gap-3">
							{SOCIAL.map((s) => (
								<a
									key={s.label}
									href={s.href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={s.label}
									className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-white"
								>
									{s.icon}
								</a>
							))}
						</div>
					</div>

					{/* Columnas de links */}
					{Object.entries(LINKS).map(([section, items]) => (
						<div key={section}>
							<h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
								{section}
							</h3>
							<ul className="space-y-2.5">
								{items.map((item) => (
									<li key={item.href}>
										<Link
											href={item.href}
											className="text-sm transition-colors hover:text-white"
										>
											{item.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Bottom: copyright + badges */}
				<div className="mt-10">
					<Divider className="bg-zinc-800" />
					<div className="flex flex-col items-start gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
						<p className="text-xs">
							© {year} Real Federación Española de Fútbol. Todos los derechos
							reservados.
						</p>
						<div className="flex items-center gap-2">
							<span className="rounded border border-zinc-700 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
								4K
							</span>
							<span className="rounded border border-zinc-700 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
								Dolby
							</span>
							<span className="rounded border border-zinc-700 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
								HDR
							</span>
						</div>
					</div>
				</div>
			</div>
		</UiFooter>
	);
}

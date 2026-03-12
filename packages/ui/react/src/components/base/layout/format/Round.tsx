import type { FormatComponentProps } from '.';

const SIZE = {
	sm: { img: 'w-16 h-16 sm:w-20 sm:h-20 md:w-20 md:h-20' },
	md: { img: 'w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32' },
	lg: { img: 'w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44' },
	xl: { img: 'w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56' },
	'2xl': { img: 'w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64' },
	'3xl': { img: 'w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72' },
};

export function Round({ item, size = 'md' }: FormatComponentProps) {
	const s = SIZE[size];
	return (
		<div className="group flex flex-col items-center gap-2">
			<img
				src={item.image}
				alt={item.title}
				className={`${s.img} aspect-square rounded-full object-cover transition-transform group-hover:scale-105`}
			/>
			<p className="text-xs font-semibold text-white text-center line-clamp-2 leading-tight">
				{item.title}
			</p>
		</div>
	);
}

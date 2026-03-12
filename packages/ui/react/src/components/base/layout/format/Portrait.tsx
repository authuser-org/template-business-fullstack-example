import type { FormatComponentProps } from '.';
import { FormatActions } from './FormatActions';

const SIZE = {
	sm: {
		container: 'w-20 sm:w-24 md:w-24',
		img: 'w-20 h-32 sm:w-24 sm:h-40 md:w-24 md:h-40',
	},
	md: {
		container: 'w-28 sm:w-32 md:w-36',
		img: 'w-28 h-44 sm:w-32 sm:h-52 md:w-36 md:h-56',
	},
	lg: {
		container: 'w-36 sm:w-40 md:w-48',
		img: 'w-36 h-56 sm:w-40 sm:h-64 md:w-48 md:h-72',
	},
	xl: {
		container: 'w-44 sm:w-52 md:w-60',
		img: 'w-44 h-72 sm:w-52 sm:h-80 md:w-60 md:h-96',
	},
	'2xl': {
		container: 'w-52 sm:w-64 md:w-72',
		img: 'w-52 h-80 sm:w-64 sm:h-[24rem] md:w-72 md:h-[28rem]',
	},
	'3xl': {
		container: 'w-60 sm:w-72 md:w-80',
		img: 'w-60 h-96 sm:w-72 sm:h-[30rem] md:w-80 md:h-[36rem]',
	},
};

export function Portrait({ item, size = 'md' }: FormatComponentProps) {
	const s = SIZE[size];
	return (
		<div className={`group relative ${s.container}`}>
			<img
				src={item.image}
				alt={item.title}
				className={`${s.img} aspect-[9/16] object-cover transition-transform group-hover:scale-105`}
			/>
			<div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
			<FormatActions item={item} />
			{item.badge && (
				<div className="absolute top-2 right-2">
					<span
						className={`inline-block px-2 py-1 rounded text-xs font-bold text-white ${
							item.badge === 'Live' ? 'bg-red-600' : 'bg-blue-600'
						}`}
					>
						{item.badge}
					</span>
				</div>
			)}
			<div className="absolute bottom-0 left-0 right-0 p-3">
				<p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
					{item.subtitle}
				</p>
				<h3 className="text-sm font-bold text-white leading-tight mt-1 line-clamp-2">
					{item.title}
				</h3>
			</div>
		</div>
	);
}

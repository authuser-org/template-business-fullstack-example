import type { FormatComponentProps } from '.';
import { FormatActions } from './FormatActions';

const SIZE = {
	sm: {
		container: 'w-40 sm:w-44 md:w-48',
		img: 'w-40 h-24 sm:w-44 sm:h-24 md:w-48 md:h-28',
	},
	md: {
		container: 'w-56 sm:w-64 md:w-72',
		img: 'w-56 h-32 sm:w-64 sm:h-36 md:w-72 md:h-40',
	},
	lg: {
		container: 'w-72 sm:w-80 md:w-96',
		img: 'w-72 h-40 sm:w-80 sm:h-44 md:w-96 md:h-54',
	},
	xl: {
		container: 'w-80 sm:w-[24rem] md:w-[28rem]',
		img: 'w-80 h-44 sm:w-[24rem] sm:h-[13.5rem] md:w-[28rem] md:h-64',
	},
	'2xl': {
		container: 'w-[22rem] sm:w-[30rem] md:w-[36rem]',
		img: 'w-[22rem] h-48 sm:w-[30rem] sm:h-[17rem] md:w-[36rem] md:h-80',
	},
	'3xl': {
		container: 'w-[26rem] sm:w-[36rem] md:w-[44rem]',
		img: 'w-[26rem] h-56 sm:w-[36rem] sm:h-80 md:w-[44rem] md:h-96',
	},
};

export function Landscape({ item, size = 'md' }: FormatComponentProps) {
	const s = SIZE[size];
	return (
		<div className={`group relative ${s.container}`}>
			<img
				src={item.image}
				alt={item.title}
				className={`${s.img} aspect-video object-cover transition-transform group-hover:scale-105`}
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

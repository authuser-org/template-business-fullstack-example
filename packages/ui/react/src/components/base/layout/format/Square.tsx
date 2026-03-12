import type { FormatComponentProps } from '.';
import { FormatActions } from './FormatActions';

const SIZE = {
	sm: {
		container: 'w-20 sm:w-24 md:w-24',
		img: 'w-20 h-20 sm:w-24 sm:h-24 md:w-24 md:h-24',
	},
	md: {
		container: 'w-32 sm:w-36 md:w-40',
		img: 'w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40',
	},
	lg: {
		container: 'w-44 sm:w-48 md:w-56',
		img: 'w-44 h-44 sm:w-48 sm:h-48 md:w-56 md:h-56',
	},
	xl: {
		container: 'w-56 sm:w-64 md:w-72',
		img: 'w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72',
	},
	'2xl': {
		container: 'w-64 sm:w-72 md:w-80',
		img: 'w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80',
	},
	'3xl': {
		container: 'w-72 sm:w-80 md:w-96',
		img: 'w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96',
	},
};

export function Square({ item, size = 'md' }: FormatComponentProps) {
	const s = SIZE[size];
	return (
		<div className={`group relative ${s.container}`}>
			<img
				src={item.image}
				alt={item.title}
				className={`${s.img} aspect-square object-cover transition-transform group-hover:scale-105`}
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
			<div className="absolute bottom-0 left-0 right-0 p-2">
				<h3 className="text-xs font-bold text-white leading-tight line-clamp-2">
					{item.title}
				</h3>
			</div>
		</div>
	);
}

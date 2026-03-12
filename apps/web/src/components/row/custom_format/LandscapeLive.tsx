import { RowCarouselFormatComponent } from '@repo/ui-react';

export const LandscapeLive: RowCarouselFormatComponent = ({
	item,
	size = 'lg',
}) => {
	const sizeClass =
		size === 'xl' || size === '2xl' || size === '3xl'
			? 'w-[22rem] md:w-[26rem]'
			: 'w-72 md:w-80';

	return (
		<article
			className={`group relative ${sizeClass} overflow-hidden rounded-2xl  bg-zinc-900`}
		>
			<img
				src={item.image}
				alt={item.title}
				className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
			<div className="absolute bottom-0 left-0 right-0 p-4">
				<p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-amber-300">
					{item.subtitle}
				</p>
				<h3 className="mt-1 text-base font-bold leading-tight text-white">
					{item.title}
				</h3>
			</div>
		</article>
	);
};

'use client';

import type { ComponentType, ReactNode } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
	type CarouselItem,
	type FormatComponentProps,
	type FormatConfig,
	type FormatItem,
	FORMAT_COMPONENTS,
} from '../format';

export type RowCarouselFormatComponent = ComponentType<FormatComponentProps>;

export type RowCarouselFormatRendererProps = FormatComponentProps & {
	formatType: FormatItem;
};

export interface RowCarouselProps {
	controller?: boolean;
	dots?: boolean;
	title?: string;
	format?: FormatConfig;
	items?: CarouselItem[];
	formatComponents?: Partial<Record<FormatItem, RowCarouselFormatComponent>>;
	renderItem?: (props: RowCarouselFormatRendererProps) => ReactNode;
}

export function RowCarousel({
	controller = false,
	dots = false,
	title,
	format = {},
	items,
	formatComponents,
	renderItem,
}: RowCarouselProps) {
	const formatType = format.type ?? 'landscape';
	const FormatComponent =
		formatComponents?.[formatType] ?? FORMAT_COMPONENTS[formatType];

	if (!items || items.length === 0) {
		return null;
	}

	return (
		<div className="w-full max-w-full overflow-x-hidden">
			{title && (
				<div className="ml-4 sm:ml-6 md:ml-10">
					<h2 className="text-lg font-bold text-white mb-4">{title}</h2>
				</div>
			)}
			<Swiper
				modules={[Navigation, Pagination]}
				navigation={controller}
				pagination={dots ? { clickable: true } : false}
				slidesPerView="auto"
				spaceBetween={20}
				className="w-full"
			>
				{items.map((item, index) => (
					<SwiperSlide
						key={item.id}
						className={`!w-auto rounded-lg overflow-hidden ${index === 0 ? 'ml-4 sm:ml-6 md:ml-10' : ''}`}
					>
						{renderItem ? (
							renderItem({
								item,
								type: formatType,
								size: format.size,
								formatType,
							})
						) : (
							<FormatComponent
								item={item}
								type={formatType}
								size={format.size}
							/>
						)}
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}

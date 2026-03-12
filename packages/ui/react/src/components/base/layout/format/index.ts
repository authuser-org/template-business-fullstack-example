import type { ComponentType } from 'react';
import { Landscape } from './Landscape';
import { Portrait } from './Portrait';
import { Round } from './Round';
import { Square } from './Square';

export { Landscape } from './Landscape';
export { Portrait } from './Portrait';
export { Round } from './Round';
export { Square } from './Square';

export type FormatItem = 'landscape' | 'portrait' | 'square' | 'round';
export type FormatSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export interface FormatConfig {
	type?: FormatItem;
	size?: FormatSize;
}

export interface CarouselItem {
	id: number;
	title: string;
	subtitle: string;
	image: string;
	badge?: string;
}

export interface FormatComponentProps {
	item: CarouselItem;
	type?: FormatItem;
	size?: FormatSize;
}

export const FORMAT_COMPONENTS: Record<
	FormatItem,
	ComponentType<FormatComponentProps>
> = {
	landscape: Landscape,
	portrait: Portrait,
	square: Square,
	round: Round,
};

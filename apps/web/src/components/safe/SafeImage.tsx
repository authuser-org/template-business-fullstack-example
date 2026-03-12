'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

const FALLBACK = '/images/fallback.avif';

/**
 * Wrapper de next/image que sustituye automáticamente src por el fallback
 * `/images/default.avif` si la imagen original falla al cargar.
 */
export function SafeImage({ src, onError, ...props }: ImageProps) {
	const [imgSrc, setImgSrc] = useState(src);

	return (
		<Image
			{...props}
			src={imgSrc}
			onError={(e) => {
				setImgSrc(FALLBACK);
				onError?.(e);
			}}
		/>
	);
}

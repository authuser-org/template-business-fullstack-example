import type { CSSProperties, HTMLAttributes } from 'react';

export interface SpacerProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
	axis?: 'vertical' | 'horizontal';
}

export function Spacer({
	size = 12,
	axis = 'vertical',
	style,
	...props
}: SpacerProps) {
	return (
		<div
			aria-hidden
			style={{
				width: axis === 'horizontal' ? size : '100%',
				height: axis === 'vertical' ? size : 1,
				flexShrink: 0,
				...(style as CSSProperties),
			}}
			{...props}
		/>
	);
}

import type { CSSProperties, HTMLAttributes } from 'react';
import { cx } from '../../../index';

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
	orientation?: 'horizontal' | 'vertical';
}

export function Divider({
	orientation = 'horizontal',
	className,
	style,
	...props
}: DividerProps) {
	return (
		<hr
			className={cx('border-0 bg-surface-border', className)}
			style={{
				width: orientation === 'horizontal' ? '100%' : 1,
				height: orientation === 'horizontal' ? 1 : '100%',
				...(style as CSSProperties),
			}}
			{...props}
		/>
	);
}

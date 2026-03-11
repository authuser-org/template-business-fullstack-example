import { cx } from '../../../index';
import type { ButtonProps } from './button.types';

const variantClassName: Record<NonNullable<ButtonProps['variant']>, string> = {
	primary: 'bg-brand-500 text-white hover:bg-brand-600 border border-brand-500',
	secondary:
		'bg-surface-muted text-surface-foreground hover:bg-surface-border border border-surface-border',
	ghost:
		'bg-transparent text-brand-600 hover:bg-brand-50 border border-transparent',
};

const sizeClassName: Record<NonNullable<ButtonProps['size']>, string> = {
	sm: 'px-3 py-1.5 text-sm rounded-sm',
	md: 'px-4 py-2 text-base rounded-md',
	lg: 'px-5 py-2.5 text-lg rounded-lg',
};

export function Button({
	children,
	className,
	variant = 'primary',
	size = 'md',
	type = 'button',
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			className={cx(
				'inline-flex items-center justify-center font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60',
				variantClassName[variant],
				sizeClassName[size],
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
}

import { Toaster, toast } from 'sonner';

export type ToastNotificationProps = {
	position?:
		| 'top-left'
		| 'top-center'
		| 'top-right'
		| 'bottom-left'
		| 'bottom-center'
		| 'bottom-right';
};

export type ToastVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

export type ShowToastOptions = {
	description?: string;
	variant?: ToastVariant;
};

export function showToast(message: string, options: ShowToastOptions = {}) {
	const { description, variant = 'default' } = options;

	switch (variant) {
		case 'success':
			toast.success(message, { description });
			return;
		case 'warning':
			toast.warning(message, { description });
			return;
		case 'error':
			toast.error(message, { description });
			return;
		case 'info':
			toast.info(message, { description });
			return;
		default:
			toast(message, { description });
	}
}

export function ToastNotification({
	position = 'bottom-right',
}: ToastNotificationProps) {
	return <Toaster position={position} richColors closeButton />;
}

import type { LocalizedStringMap } from '../i18n/localization';

export type NotificationChannel = 'push' | 'email' | 'in-app';

export interface UserNotification {
	id: string;
	userId: string;
	channel: NotificationChannel;
	title: string;
	titleI18n?: LocalizedStringMap;
	body: string;
	bodyI18n?: LocalizedStringMap;
	locale?: string;
	templateKey?: string;
	templateParams?: Record<string, string | number | boolean>;
	sentAt: string;
	readAt?: string;
	deeplink?: string;
}

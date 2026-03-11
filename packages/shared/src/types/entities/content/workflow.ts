export type EditorialStatus =
	| 'draft'
	| 'review'
	| 'scheduled'
	| 'published'
	| 'archived';

export interface EditorialAuditLog {
	id: string;
	entityType: 'program' | 'season' | 'episode' | 'collection' | 'page';
	entityId: string;
	fromStatus?: EditorialStatus;
	toStatus: EditorialStatus;
	changedBy: string;
	changedAt: string;
	note?: string;
}

export interface ChatMessage {
	id: string;
	streamId: string;
	profileId: string;
	text: string;
	sentAt: string;
}

export interface SendChatMessageDto {
	streamId: string;
	profileId: string;
	text: string;
}

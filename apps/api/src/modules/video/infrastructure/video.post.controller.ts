import { Body, Controller, Post } from '@nestjs/common';
import type {
	VideoAdTrackResponse,
	VideoCreatePlaybackSessionResponse,
	VideoCreateTranscodingJobResponse,
	VideoEntitlementCheckResponse,
	VideoNotificationSendResponse,
	VideoPlaybackHeartbeatResponse,
} from '@repo/shared';
import {
	adTrackingEventMock,
	entitlementDecisionAllowedMock,
	playbackHeartbeatMock,
	playbackSessionMock,
	transcodeJobMock,
	userNotificationMock,
} from '@repo/shared/mocks';

@Controller('video')
export class VideoPostController {
	@Post('playback/session')
	createPlaybackSession(
		@Body() body: Record<string, unknown>,
	): VideoCreatePlaybackSessionResponse {
		return {
			...playbackSessionMock,
			request: body,
		};
	}

	@Post('playback/heartbeat')
	postPlaybackHeartbeat(
		@Body() body: Record<string, unknown>,
	): VideoPlaybackHeartbeatResponse {
		return {
			...playbackHeartbeatMock,
			request: body,
		};
	}

	@Post('rights/entitlement/check')
	checkEntitlement(
		@Body() body: Record<string, unknown>,
	): VideoEntitlementCheckResponse {
		return {
			...entitlementDecisionAllowedMock,
			request: body,
		};
	}

	@Post('transcoding/jobs')
	createTranscodingJob(
		@Body() body: Record<string, unknown>,
	): VideoCreateTranscodingJobResponse {
		return {
			...transcodeJobMock,
			status: 'queued',
			request: body,
		};
	}

	@Post('ads/track')
	trackAdEvent(@Body() body: Record<string, unknown>): VideoAdTrackResponse {
		return {
			...adTrackingEventMock,
			request: body,
		};
	}

	@Post('notifications/send')
	sendNotification(
		@Body() body: Record<string, unknown>,
	): VideoNotificationSendResponse {
		return {
			...userNotificationMock,
			request: body,
		};
	}
}

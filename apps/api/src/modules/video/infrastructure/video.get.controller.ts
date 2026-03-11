import { Controller, Get, Param } from '@nestjs/common';
import type {
	VideoEntitlementResponse,
	VideoEpgChannelResponse,
	VideoEpgResponse,
	VideoHealthResponse,
	VideoHomeResponse,
	VideoLocaleResolveResponse,
	VideoMonetizationProfileResponse,
	VideoPlaybackSessionResponse,
	VideoProgramResponse,
	VideoStreamResponse,
	VideoTranscodingJobResponse,
	VideoUserProfileResponse,
	VideoWatchProgressResponse,
} from '@repo/shared';
import {
	contentPageMock,
	entitlementDecisionAllowedMock,
	epgChannelMock,
	epgResponseMock,
	monetizationProfileMock,
	playbackSessionDtoMock,
	programMock,
	streamSourceMock,
	transcodeJobMock,
	userProfileMock,
	watchProgressMock,
} from '@repo/shared/mocks';

@Controller('video')
export class VideoGetController {
	@Get('health')
	health(): VideoHealthResponse {
		return { ok: true, module: 'video' };
	}

	@Get('home')
	getHome(): VideoHomeResponse {
		return contentPageMock;
	}

	@Get('program/:id')
	getProgram(@Param('id') id: string): VideoProgramResponse {
		return { ...programMock, id };
	}

	@Get('stream/:programId')
	getStream(@Param('programId') programId: string): VideoStreamResponse {
		return {
			...streamSourceMock,
			programId,
		};
	}

	@Get('playback/session/:programId')
	getPlaybackSession(
		@Param('programId') programId: string,
	): VideoPlaybackSessionResponse {
		return {
			...playbackSessionDtoMock,
			source: {
				id: 'source-1',
				programId,
				manifests: [
					{
						id: 'manifest-hls-1',
						protocol: 'hls',
						url: 'https://cdn.ott.local/hls/program-1/master.m3u8',
					},
				],
				qualityProfiles: [
					{
						id: 'q-1080p',
						label: '1080p',
						width: 1920,
						height: 1080,
						bitrateKbps: 5000,
						fps: 24,
						dynamicRange: 'sdr',
					},
				],
			},
		};
	}

	@Get('rights/entitlement/:programId')
	getEntitlement(
		@Param('programId') programId: string,
	): VideoEntitlementResponse {
		return {
			...entitlementDecisionAllowedMock,
			programId,
		};
	}

	@Get('epg')
	getEpg(): VideoEpgResponse {
		return epgResponseMock;
	}

	@Get('epg/channel/:id')
	getEpgChannel(@Param('id') id: string): VideoEpgChannelResponse {
		return { ...epgChannelMock, id };
	}

	@Get('monetization/profile/:userId')
	getMonetizationProfile(
		@Param('userId') userId: string,
	): VideoMonetizationProfileResponse {
		return {
			...monetizationProfileMock,
			userId,
		};
	}

	@Get('user/profile/:profileId')
	getUserProfile(
		@Param('profileId') profileId: string,
	): VideoUserProfileResponse {
		return {
			...userProfileMock,
			id: profileId,
		};
	}

	@Get('user/progress/:profileId/:programId')
	getWatchProgress(
		@Param('profileId') profileId: string,
		@Param('programId') programId: string,
	): VideoWatchProgressResponse {
		return {
			...watchProgressMock,
			profileId,
			programId,
		};
	}

	@Get('transcoding/job/:id')
	getTranscodingJob(@Param('id') id: string): VideoTranscodingJobResponse {
		return {
			...transcodeJobMock,
			id,
		};
	}

	@Get('i18n/resolve')
	getResolvedLocale(): VideoLocaleResolveResponse {
		return {
			request: {
				headers: {
					'accept-language': 'es-MX,es;q=0.9,en-US;q=0.8',
					'x-locale': 'es-ES',
					'x-fallback-locale': 'en-US',
				},
				requestedLocale: 'es-MX',
				preferredLocale: 'es-ES',
				fallbackLocale: 'en-US',
				supportedLocales: ['en-US', 'es-ES'],
				defaultLocale: 'en-US',
			},
			context: {
				headers: {
					'accept-language': 'es-MX,es;q=0.9,en-US;q=0.8',
					'x-locale': 'es-ES',
					'x-fallback-locale': 'en-US',
				},
				resolved: {
					locale: 'es-ES',
					source: 'preferred',
				},
			},
		};
	}
}

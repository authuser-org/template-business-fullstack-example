import { Body, Controller, Param, Put } from '@nestjs/common';
import type {
	VideoUpdateDownloadResponse,
	VideoUpdateProfileLocaleResponse,
	VideoUpdateProgressResponse,
	VideoUpdateTranscodingJobResponse,
} from '@repo/shared';
import {
	downloadItemMock,
	transcodeCompletedJobMock,
	userProfileMock,
	watchProgressMock,
} from '@repo/shared/mocks';

@Controller('video')
export class VideoPutController {
	@Put('user/progress')
	updateProgress(
		@Body() body: Record<string, unknown>,
	): VideoUpdateProgressResponse {
		return {
			...watchProgressMock,
			request: body,
		};
	}

	@Put('user/profile/:id/locale')
	updateProfileLocale(
		@Param('id') id: string,
		@Body() body: Record<string, unknown>,
	): VideoUpdateProfileLocaleResponse {
		return {
			...userProfileMock,
			id,
			request: body,
		};
	}

	@Put('stream/download/:id')
	updateDownload(
		@Param('id') id: string,
		@Body() body: Record<string, unknown>,
	): VideoUpdateDownloadResponse {
		return {
			...downloadItemMock,
			id,
			request: body,
		};
	}

	@Put('transcoding/jobs/:id')
	updateTranscodingJob(
		@Param('id') id: string,
		@Body() body: Record<string, unknown>,
	): VideoUpdateTranscodingJobResponse {
		return {
			...transcodeCompletedJobMock,
			id,
			request: body,
		};
	}
}

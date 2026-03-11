import { Controller, Delete, Param } from '@nestjs/common';
import type { VideoDeleteResponse } from '@repo/shared';

@Controller('video')
export class VideoDeleteController {
	@Delete('user/watchlist/:programId')
	removeWatchlist(@Param('programId') programId: string): VideoDeleteResponse {
		return {
			deleted: true,
			resource: 'watchlist',
			programId,
		};
	}

	@Delete('stream/download/:id')
	deleteDownload(@Param('id') id: string): VideoDeleteResponse {
		return {
			deleted: true,
			resource: 'download',
			id,
		};
	}

	@Delete('playback/session/:id')
	closeSession(@Param('id') id: string): VideoDeleteResponse {
		return {
			deleted: true,
			resource: 'playback-session',
			id,
		};
	}

	@Delete('transcoding/jobs/:id')
	cancelTranscodingJob(@Param('id') id: string): VideoDeleteResponse {
		return {
			deleted: true,
			resource: 'transcoding-job',
			id,
			status: 'canceled',
		};
	}
}

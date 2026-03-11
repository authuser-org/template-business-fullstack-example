import { Module } from '@nestjs/common';
import { VideoDeleteController } from './infrastructure/video.delete.controller';
import { VideoGetController } from './infrastructure/video.get.controller';
import { VideoPostController } from './infrastructure/video.post.controller';
import { VideoPutController } from './infrastructure/video.put.controller';

@Module({
	imports: [],
	controllers: [
		VideoGetController,
		VideoPostController,
		VideoPutController,
		VideoDeleteController,
	],
	providers: [],
})
export class VideoModule {}

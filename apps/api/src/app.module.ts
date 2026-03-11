import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './modules/health/health.controller';
import { VideoModule } from './modules/video/video.module';

@Module({
	imports: [TerminusModule, VideoModule],
	controllers: [HealthController],
	providers: [],
})
export class AppModule {}

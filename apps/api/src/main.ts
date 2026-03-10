import { createHttpApp } from '@authuser/nest-fastify-kit';
import { AppModule } from './app.module';
import { CORS_ORIGINS, PORT, validateEnv } from 'src/server/config';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';

async function bootstrap() {
	const app = await createHttpApp({
		rootModule: AppModule,
		appName: 'api',
		preset: 'secure',
		apiPrefix: 'api',
		apiVersioning: true,
		docs: process.env.NODE_ENV !== 'production',
		config: { enabled: true, isGlobal: true, validate: validateEnv },
		cors: { origin: CORS_ORIGINS, credentials: true },
	});

	app.useGlobalFilters(new HttpExceptionFilter());

	await app.listen(PORT, '0.0.0.0');
}

void bootstrap();

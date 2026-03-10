type RuntimeEnv = 'development' | 'test' | 'pre' | 'production';

const ALLOWED_ENVS: RuntimeEnv[] = ['development', 'test', 'pre', 'production'];

const DEFAULT_CORS_ORIGINS = 'http://localhost:3000';

export function parsePort(value: string | undefined): number {
	const parsed = Number(value ?? '4000');
	if (!Number.isInteger(parsed) || parsed < 1 || parsed > 65535) {
		throw new Error('PORT debe ser un entero entre 1 y 65535');
	}
	return parsed;
}

export function parseCorsOrigins(value: string | undefined): string[] {
	return (value ?? DEFAULT_CORS_ORIGINS)
		.split(',')
		.map((origin) => origin.trim())
		.filter(Boolean);
}

export function validateEnv(config: Record<string, unknown>) {
	const env = (config.NODE_ENV as string | undefined) ?? 'development';
	if (!ALLOWED_ENVS.includes(env as RuntimeEnv)) {
		throw new Error(
			`NODE_ENV inválido: ${env}. Valores permitidos: ${ALLOWED_ENVS.join(', ')}`,
		);
	}

	parsePort(config.PORT as string | undefined);
	parseCorsOrigins(config.CORS_ORIGINS as string | undefined);

	if (env === 'pre' || env === 'production') {
		const jwtSecret = (config.JWT_SECRET as string | undefined)?.trim();
		if (!jwtSecret || jwtSecret === 'change_me_in_production') {
			throw new Error(
				'JWT_SECRET es obligatorio en pre/production y no puede usar valor por defecto',
			);
		}
	}

	return config;
}

export const PORT = parsePort(process.env.PORT);
export const CORS_ORIGINS = parseCorsOrigins(process.env.CORS_ORIGINS);

# API (NestJS + Fastify)

## Propósito

Definir y exponer capacidades de negocio con contratos estables, observabilidad y controles de seguridad.

## Ubicación

- `apps/api`

## Base técnica

- Usamos [`@authuser/nest-fastify-kit`](https://www.npmjs.com/package/@authuser/nest-fastify-kit), módulo que desarrollamos para facilitar la creación de APIs seguras y con buen rendimiento sobre NestJS + Fastify.

## Comandos útiles

```bash
pnpm dev:api
pnpm --filter @repo/api build
pnpm --filter @repo/api test
pnpm --filter @repo/api test:e2e
pnpm --filter @repo/api lint
```

## Convenciones

- Prefijo API: `/api`
- Versionado habilitado
- Validación global de DTOs
- Configuración por entorno (`APP_ENV` + `NODE_ENV`)

## Entregables esperados

- Contratos de API versionados
- Cobertura de tests por casos críticos
- Evidencia de despliegue y healthcheck

## Checklist rápido de PR (API)

- [ ] Tests unit/e2e en verde
- [ ] Endpoint y contrato documentado
- [ ] Sin secretos hardcodeados
- [ ] Manejo de errores consistente

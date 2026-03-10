# Environments and variables

Minimum environment matrix for enterprise-grade operations.

## Business environments

- `dev`: local development and internal validation.
- `pre`: pre-production, functional mirror of production.
- `pro`: production.

## Conventions

- Business environment: `APP_ENV=dev|pre|pro`
- Runtime environment: `NODE_ENV=development|test|production`
- Keep secrets outside the repository (secret manager).
- Use `.env.local` for local development only.

## Variables by stack

### API (`apps/api`)

| Variable       | dev | pre | pro | Description          |
| -------------- | --- | --- | --- | -------------------- |
| `APP_ENV`      | ✅  | ✅  | ✅  | Business environment |
| `NODE_ENV`     | ✅  | ✅  | ✅  | Runtime environment  |
| `PORT`         | ✅  | ✅  | ✅  | HTTP port            |
| `CORS_ORIGINS` | ✅  | ✅  | ✅  | Allowed origins      |
| `DATABASE_URL` | ✅  | ✅  | ✅  | Database connection  |
| `JWT_SECRET`   | ✅  | ✅  | ✅  | JWT signing secret   |

### Web (`apps/web`)

| Variable              | dev | pre | pro | Description          |
| --------------------- | --- | --- | --- | -------------------- |
| `APP_ENV`             | ✅  | ✅  | ✅  | Business environment |
| `NODE_ENV`            | ✅  | ✅  | ✅  | Runtime environment  |
| `NEXT_PUBLIC_API_URL` | ✅  | ✅  | ✅  | Public API URL       |

### Mobile (`apps/mobile`)

| Variable   | dev | pre | pro | Description          |
| ---------- | --- | --- | --- | -------------------- |
| `APP_ENV`  | ✅  | ✅  | ✅  | Business environment |
| `NODE_ENV` | ✅  | ✅  | ✅  | Runtime environment  |
| `API_URL`  | ✅  | ✅  | ✅  | API base URL         |

## Environment promotion checklist

- [ ] Variables and secrets loaded in target environment.
- [ ] Quality pipeline (`lint`, `test`, `build`) is green.
- [ ] API healthcheck validated after deployment.

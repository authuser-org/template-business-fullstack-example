# API (NestJS + Fastify)

## Purpose

Expose business capabilities through stable contracts, observability, and security controls.

## Location

- `apps/api`

## Technical baseline

- We use [`@authuser/nest-fastify-kit`](https://www.npmjs.com/package/@authuser/nest-fastify-kit), a module we developed to simplify building secure and high-performance APIs on top of NestJS + Fastify.

## Useful commands

```bash
pnpm dev:api
pnpm --filter @repo/api build
pnpm --filter @repo/api test
pnpm --filter @repo/api test:e2e
pnpm --filter @repo/api lint
```

## Conventions

- API prefix: `/api`
- API versioning enabled
- Global DTO validation
- Environment-driven config (`APP_ENV` + `NODE_ENV`)

## Expected deliverables

- Versioned API contracts
- Test coverage on critical paths
- Deployment and healthcheck evidence

## API PR checklist

- [ ] Unit/e2e tests are green
- [ ] Endpoint and contract documented
- [ ] No hardcoded secrets
- [ ] Error handling is consistent

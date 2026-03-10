# Web (Next.js)

## Purpose

Deliver a consistent user experience aligned with API contracts and business flows.

## Location

- `apps/web`

## Useful commands

```bash
pnpm dev:web
pnpm --filter @repo/web build
pnpm --filter @repo/web test
pnpm --filter @repo/web lint
```

## Conventions

- Public variables must use `NEXT_PUBLIC_`
- Consume API through environment configuration
- Reuse shared logic from `@repo/shared`

## Expected deliverables

- Functional critical routes
- Baseline test coverage on key components
- Consistent env-based configuration

## Web PR checklist

- [ ] Route/screen works as expected
- [ ] Loading/error states covered
- [ ] Component tests updated
- [ ] Basic accessibility validated

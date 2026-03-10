# Mobile (React Native)

## Purpose

Keep Android/iOS delivery stable with a reproducible build workflow for enterprise teams.

## Location

- `apps/mobile`

## Useful commands

```bash
pnpm mobile:metro
pnpm mobile:metro:reset
pnpm mobile:android
pnpm mobile:ios
pnpm --filter @repo/mobile test
pnpm --filter @repo/mobile lint
```

## Recommended flow

1. Start Metro (`mobile:metro`)
2. Start platform (`mobile:android` or `mobile:ios`)
3. If module resolution fails, reset cache (`mobile:metro:reset`)

## Expected deliverables

- Verifiable Android and iOS builds
- Smoke tests in place
- Stable dependency resolution in monorepo

## Mobile PR checklist

- [ ] Runs on Android/iOS
- [ ] Main screen renders correctly
- [ ] Smoke tests are green
- [ ] No unsupported module imports in Jest tests

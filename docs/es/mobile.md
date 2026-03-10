# Mobile (React Native)

## Propósito

Mantener una experiencia móvil estable en Android/iOS con flujo de build reproducible para equipos enterprise.

## Ubicación

- `apps/mobile`

## Comandos útiles

```bash
pnpm mobile:metro
pnpm mobile:metro:reset
pnpm mobile:android
pnpm mobile:ios
pnpm --filter @repo/mobile test
pnpm --filter @repo/mobile lint
```

## Flujo recomendado

1. Arrancar Metro (`mobile:metro`)
2. Arrancar plataforma (`mobile:android` o `mobile:ios`)
3. Si falla resolución de módulos: `mobile:metro:reset`

## Entregables esperados

- Build verificable en Android e iOS
- Smoke tests funcionales
- Estabilidad de resolución de dependencias en monorepo

## Checklist rápido de PR (Mobile)

- [ ] Levanta en Android/iOS
- [ ] Pantalla principal renderiza
- [ ] Test de humo en verde
- [ ] Sin imports de módulos no soportados en Jest

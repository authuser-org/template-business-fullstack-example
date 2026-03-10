# Web (Next.js)

## Propósito

Entregar experiencia de usuario consistente, medible y alineada con los contratos de API.

## Ubicación

- `apps/web`

## Comandos útiles

```bash
pnpm dev:web
pnpm --filter @repo/web build
pnpm --filter @repo/web test
pnpm --filter @repo/web lint
```

## Convenciones

- Variables públicas con prefijo `NEXT_PUBLIC_`
- Consumir API desde configuración por entorno
- Reutilizar utilidades desde `@repo/shared`

## Entregables esperados

- Interfaces funcionales en rutas críticas
- Cobertura mínima de componentes clave
- Consistencia de configuración por entorno

## Checklist rápido de PR (Web)

- [ ] Ruta/pantalla funcional
- [ ] Estado loading/error resuelto
- [ ] Test de componente actualizado
- [ ] Accesibilidad básica validada

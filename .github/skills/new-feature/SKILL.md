---
name: new-feature
description: Flujo completo para añadir una nueva funcionalidad a este monorepo: qué rama crear, en qué app trabajar, cómo commitear y cómo abrir el PR. Úsala cuando el usuario pregunte cómo empezar una nueva story, tarea o feature.
argument-hint: "[descripción breve de la feature, ej: 'sistema de notificaciones push']"
---

# Flujo de trabajo: nueva feature en el monorepo

## 1. Crea la rama desde `develop`

Siempre parte de `develop`, **nunca de `main`**.

```bash
git checkout develop
git pull origin develop
git checkout -b feat/<scope>/<descripcion-corta>
```

Ejemplos de nombres de rama:

```
feat/web/user-profile-page
feat/api/push-notifications-endpoint
feat/mobile/onboarding-screen
feat/packages/notification-types
```

> **Regla**: el nombre debe identificar el scope principal de la feature.

## 2. Decide en qué parte del monorepo trabajas

| Tarea                                      | Directorio                                   |
| ------------------------------------------ | -------------------------------------------- |
| Pantalla o UI nueva                        | `apps/web/app/` o `apps/mobile/src/screens/` |
| Endpoint REST nuevo                        | `apps/api/src/<modulo>/`                     |
| Shared type, interfaz o DTO                | `packages/shared/src/types/`                 |
| Función de validación o formato compartida | `packages/shared/src/utils/`                 |
| Config de build, Docker o CI               | Raíz del repo                                |

**Si la lógica es compartida**, crea los tipos/utilidades en `@repo/shared` primero
(ver skill `/add-to-shared`) y luego impórtalos en la app.

## 3. Arranca el entorno de desarrollo

```bash
# Todas las apps simultáneamente (recomendado)
pnpm dev

# Solo la app que te interesa
pnpm --filter @repo/web dev
pnpm --filter @repo/api dev
pnpm --filter @repo/mobile start
```

Para shared en modo watch mientras editas:

```bash
pnpm --filter @repo/shared dev
```

## 4. Escribe el código

Checklist de calidad antes de commitear:

- [ ] Tipado completo en TypeScript (sin `any` salvo casos muy justificados)
- [ ] Si añades lógica de dominio compartida → va a `packages/shared`
- [ ] Si añades un endpoint REST → incluye validación DTO con class-validator
- [ ] Si añades UI en la web → usa Tailwind v4, sigue los componentes existentes
- [ ] Si añades una pantalla mobile → StyleSheet o Tailwind-RN, no estilos en línea
- [ ] Sin `console.log` olvidados

## 5. Tests

```bash
# Correr los tests de la app que modificaste
pnpm --filter @repo/api test
pnpm --filter @repo/web test
pnpm --filter @repo/mobile test

# Verificar que todo el monorepo sigue pasando
pnpm test
```

## 6. Lint

```bash
pnpm lint
```

Debe pasar antes de hacer commit. El pre-commit hook también lo ejecuta.

## 7. Commitea los cambios

Usa Conventional Commits con el scope adecuado.
Para detalles, consulta la skill `/commit-guide`.

```bash
git add .
git commit -m "feat(web): add user profile page with avatar upload"
```

Si la feature toca múltiples apps, haz un commit por app:

```bash
git commit -m "feat(packages): add NotificationPayload type to shared"
git commit -m "feat(api): add POST /notifications endpoint"
git commit -m "feat(mobile): add push notification handler in App.tsx"
```

## 8. Push y Pull Request

```bash
git push origin feat/web/user-profile-page
```

Abre el PR **hacia `develop`** (no hacia `main`).

### Checklist del PR

- [ ] Título sigue el formato `feat(scope): descripción` (lo usará semantic-release)
- [ ] El PR apunta a `develop`
- [ ] Los tests de CI pasan (GitHub Actions / GitLab CI)
- [ ] Lint sin errores
- [ ] Si es para mobile: el job `build:android` y/o `build:ios` es verde
- [ ] Al menos un reviewer ha aprobado

## 9. Flujo de versiones

```
feat/... → develop (auto-deploy + prerelease beta)
                 ↓ cuando esté listo para producción
             main (auto-release semver)
```

semantic-release calcula la versión automáticamente a partir de los commits:

- `feat` → bump `minor`
- `fix`, `perf`, `refactor` → bump `patch`
- `feat!` o `BREAKING CHANGE:` → bump `major`

## Comandos de referencia rápida

```bash
# Ver qué cambios afectan a qué paquetes
pnpm turbo run build --dry=json

# Limpiar artifacts de build
pnpm clean

# Reinstalar deps desde cero
pnpm install --frozen-lockfile
```

---
name: commit-guide
description: Ayuda a escribir mensajes de commit correctos para este monorepo usando Conventional Commits. Úsala cuando necesites redactar un commit, revisar si el formato es correcto, o cuando el hook de commitlint rechace un mensaje.
argument-hint: "[descripción de los cambios que quieres commitear]"
---

# Guía de commits para este monorepo

Este proyecto usa [Conventional Commits](https://www.conventionalcommits.org/).
El hook `commit-msg` (Husky + commitlint) rechaza cualquier commit que no cumpla el formato.

## Formato obligatorio

```
<type>(<scope>): <descripción en minúsculas, máximo 100 caracteres>
```

## Types

| Type       | Genera versión | Cuándo usarlo                                     |
| ---------- | -------------- | ------------------------------------------------- |
| `feat`     | minor `1.1.0`  | Nueva funcionalidad visible para el usuario       |
| `fix`      | patch `1.0.1`  | Corrección de un bug                              |
| `perf`     | patch          | Mejora de rendimiento                             |
| `refactor` | patch          | Refactorización sin cambio de comportamiento      |
| `docs`     | —              | Solo documentación                                |
| `style`    | —              | Formato de código (espacios, comas, punto y coma) |
| `test`     | —              | Añadir o modificar tests                          |
| `build`    | —              | Sistema de build, Turbo, Docker                   |
| `ci`       | —              | Cambios en GitHub Actions o GitLab CI             |
| `chore`    | —              | Mantenimiento general                             |
| `revert`   | patch          | Revertir un commit anterior                       |

Para **breaking changes** añade `!` al type o incluye `BREAKING CHANGE:` en el cuerpo:

```
feat(api)!: redesign authentication endpoints
```

→ genera versión **major** `2.0.0`

## Scopes permitidos

| Scope      | Cuándo usarlo                         |
| ---------- | ------------------------------------- |
| `web`      | Cambios en `apps/web/`                |
| `api`      | Cambios en `apps/api/`                |
| `mobile`   | Cambios en `apps/mobile/`             |
| `packages` | Cambios en `packages/` (shared, etc.) |
| `deps`     | Actualización de dependencias         |
| `release`  | Proceso de release / CI               |

> El linter acepta cualquier scope pero lanza un **warning** si no está en esta lista.
> Usa el scope correspondiente a la app que estás modificando.

## Reglas de commitlint activas

- `type-enum`: solo los types de la tabla → **error**
- `subject-case`: descripción en minúsculas → **error**
- `header-max-length`: máximo 100 caracteres → **error**
- `scope-enum`: scope fuera de la lista → **warning** (no bloquea)

## Ejemplos correctos

```bash
feat(web): add user login form with email validation
fix(api): return 404 when user is not found
perf(mobile): lazy load images in product feed
refactor(packages): extract price formatting to shared utility
chore(deps): update react to 19.3.0
ci: add paths-filter for mobile workflow
docs(web): update setup instructions in README
test(api): add unit tests for UsersService.create
feat(api)!: change response shape of /auth/login endpoint
```

## Ejemplos incorrectos (serán rechazados)

```bash
# ❌ Sin type
git commit -m "add login page"

# ❌ Sin scope
git commit -m "feat: add login page"

# ❌ Mayúsculas en la descripción
git commit -m "feat(web): Add Login Page"

# ❌ Scope no reconocido (solo warning, pero evítalo)
git commit -m "feat(frontend): add login page"

# ❌ Demasiado largo
git commit -m "feat(web): add a completely new login page with all the fields and validation and redirect logic"
```

## Sugerencia de mensaje

Cuando el usuario describa sus cambios, genera el commit así:

1. Identifica qué app o área cambia → elige el `scope`
2. Clasifica el tipo de cambio → elige el `type`
3. Resume la acción en imperativo presente, minúsculas, < 100 chars
4. Si hay breaking change, añade `!` o el footer `BREAKING CHANGE:`

## Cómo hacer el commit

```bash
git add <archivos>
git commit -m "type(scope): descripción"

# Para commits con cuerpo y/o breaking change:
git commit -m "feat(api)!: redesign auth endpoints" \
           -m "BREAKING CHANGE: /auth/login now returns { token, refreshToken } instead of { accessToken }"
```

# template-business-fullstack

Plantilla fullstack orientada a negocio para equipos Node.js que necesitan velocidad de entrega con estándares enterprise desde el día 1.

Este monorepo incluye Web, API y Mobile con una base común de calidad, versionado, automatización y documentación operativa.

> Si vas a desarrollar en este repositorio, empieza por [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## Índice

- [Propuesta de valor](#propuesta-de-valor)
- [Arquitectura](#arquitectura)
- [Estructura actual](#estructura-actual)
- [Requisitos](#requisitos)
- [Inicio rápido](#inicio-rápido)
- [Comandos raíz](#comandos-raíz)
- [Trabajo por stack](#trabajo-por-stack)
- [Entornos](#entornos)
- [CI/CD y versionado](#cicd-y-versionado)
- [Docker](#docker)
- [Calidad](#calidad)
- [Documentación operativa](#documentación-operativa)
- [Go-Live](#go-live)

---

## Propuesta de valor

Piensa esta plantilla como una plataforma de referencia para producto digital:

- **Acelera el time-to-market** con una base técnica ya operativa.
- **Reduce riesgo operativo** con flujos de calidad y release consistentes.
- **Escala equipos** separando claramente dominios (`web`, `api`, `mobile`, `database`, `devops`).
- **Mantiene gobernanza** con convenciones unificadas y trazabilidad de cambios.

---

## Arquitectura

- **Monorepo:** Turborepo + pnpm workspaces
- **Web:** Next.js
- **API:** NestJS + Fastify
- **Módulo base API:** [`@authuser/nest-fastify-kit`](https://www.npmjs.com/package/@authuser/nest-fastify-kit) para acelerar la creación de APIs seguras y con buena performance
- **Mobile:** React Native (Android/iOS)
- **Shared:** utilidades y tipos comunes en `packages/shared`
- **Infra:** separación por dominio en `infra/database` y `infra/devops`

---

## Estructura actual

```text
.
├── apps/
│   ├── web/
│   ├── api/
│   └── mobile/
├── packages/
│   ├── shared/
│   ├── typescript-config/
│   └── eslint-config/
├── infra/
│   ├── database/
│   └── devops/
├── docs/
│   ├── api.md
│   ├── web.md
│   ├── mobile.md
│   ├── devops.md
│   ├── database.md
│   ├── environments.md
│   └── runbook-minimo.md
├── scripts/
├── docker-compose.yml
├── docker-compose.override.yml
├── CONTRIBUTING.md
└── package.json
```

---

## Requisitos

| Herramienta          | Versión recomendada |
| -------------------- | ------------------- |
| Node.js              | 22+                 |
| pnpm                 | 9+                  |
| Docker               | 27+                 |
| Xcode + CocoaPods    | para iOS            |
| Android Studio + SDK | para Android        |

---

## Inicio rápido

```bash
git clone <url-del-repo>
cd <repo>
pnpm setup
```

Arranque global:

```bash
pnpm dev
```

Servicios esperados:

- Web: `http://localhost:3000`
- API: `http://localhost:4000`
- Mobile: Metro en `http://localhost:8081`

---

## Comandos raíz

```bash
# setup y ciclo principal
pnpm setup
pnpm dev
pnpm build
pnpm test
pnpm lint
pnpm clean

# web/api en independiente
pnpm dev:web
pnpm dev:api
pnpm dev:web:api

# mobile en independiente
pnpm mobile:metro
pnpm mobile:metro:reset
pnpm mobile:android
pnpm mobile:ios
```

---

## Trabajo por stack

### Web

```bash
pnpm --filter @repo/web dev
pnpm --filter @repo/web test
pnpm --filter @repo/web lint
```

### API

```bash
pnpm --filter @repo/api dev
pnpm --filter @repo/api test
pnpm --filter @repo/api test:e2e
pnpm --filter @repo/api lint
```

### Mobile

```bash
pnpm --filter @repo/mobile dev
pnpm --filter @repo/mobile android
pnpm --filter @repo/mobile ios
pnpm --filter @repo/mobile test
```

---

## Entornos

Convención corporativa de negocio:

- `APP_ENV=dev|pre|pro`

Convención técnica de runtime:

- `NODE_ENV=development|test|production`

Más detalle en [docs/es/environments.md](./docs/es/environments.md) (ES) o [docs/en/environments.md](./docs/en/environments.md) (EN).

---

## CI/CD y versionado

- CI ejecuta calidad en PR (`lint`, `build`, `test`).
- Release semántico automatizado con `semantic-release`.
- Convención de commits basada en Conventional Commits + commitlint.

Referencia completa en:

- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [.releaserc.json](./.releaserc.json)
- [.github/workflows](./.github/workflows)

---

## Docker

- Dockerfiles de runtime viven junto a cada app:
  - `apps/web/Dockerfile`
  - `apps/api/Dockerfile`
- `mobile` no usa Docker para runtime (binarios nativos).
- Orquestación local:

```bash
docker compose up --build
```

---

## Calidad

- Lint y tests centralizados por Turbo.
- Hooks de calidad con Husky + lint-staged.
- Shared package reutilizable para consistencia entre apps.

---

## Documentación operativa

Guías por stack para developers:

- [docs/README.md](./docs/README.md) (selector de idioma)
- [docs/es/README.md](./docs/es/README.md)
- [docs/en/README.md](./docs/en/README.md)

---

## Go-Live

Documentación base de salida a producción:

- [docs/es/runbook-minimo.md](./docs/es/runbook-minimo.md) (ES)
- [docs/en/runbook-minimo.md](./docs/en/runbook-minimo.md) (EN)

---

## Licencia

Uso interno como plantilla de proyecto. Ajustar licencia y metadatos según política de la organización.

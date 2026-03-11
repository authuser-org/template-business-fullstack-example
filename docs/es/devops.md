# DevOps

## Ubicación

- `infra/devops/iac`
- `infra/devops/pipelines`
- `infra/devops/runbooks`

## Objetivo

Automatizar despliegue y operación de forma repetible, auditable y segura.

## Responsabilidades

- IaC por entorno (`dev/pre/pro`)
- Pipeline CI/CD
- Runbooks de incidentes y rollback
- Gobernanza de releases

## Entregables esperados

- Pipelines con quality gates
- Runbooks ejecutables por on-call
- Estrategia de rollback de app e infraestructura

## Regla práctica sobre Dockerfiles

- Dockerfiles de runtime junto a cada app (`apps/.../Dockerfile`)
- Orquestación, templates y automatización en `infra/devops`

## Flujo oficial de entrega (main protegida)

Con reglas de rama protegida, el orden operativo es:

1. Crear rama de trabajo (`feat/*`, `fix/*`, `chore/*`).
2. Abrir PR hacia `main`.
3. Pasar CI (`lint`, `build`, `test`) y aprobar PR.
4. Hacer merge en `main`.
5. Se ejecuta `Release` automáticamente.
6. Si `Release` finaliza correctamente, se ejecuta `Mobile`.

Importante: la release ocurre después del merge en `main`, no antes.

## Checklist rápido de PR (DevOps)

- [ ] Cambio de pipeline o IaC documentado
- [ ] Evidencia de plan/validación adjunta
- [ ] Runbook actualizado si cambia operación

## Jenkins (opcional)

El repositorio incluye un pipeline declarativo en la raíz: `Jenkinsfile`.

Flujo implementado:

1. `Checkout`
2. `Install`
3. `Lint`
4. `Build`
5. `Test`
6. `Release` (solo en ramas `main` y `develop`)

Variables mínimas para `Release`:

- `GITHUB_TOKEN` (token para `semantic-release`)
- `DOCKER_REGISTRY` (ejemplo: `ghcr.io/org/repo`)
- `GITHUB_ACTOR` (opcional, usuario para login en GHCR)

Nota: si no se definen `GITHUB_TOKEN` o `DOCKER_REGISTRY`, el stage de `Release` falla de forma explícita.

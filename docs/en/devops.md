# DevOps

## Location

- `infra/devops/iac`
- `infra/devops/pipelines`
- `infra/devops/runbooks`

## Purpose

Automate deployment and operations in a repeatable, auditable, and secure way.

## Responsibilities

- IaC by environment (`dev/pre/pro`)
- CI/CD pipeline governance
- Incident and rollback runbooks
- Release governance

## Expected deliverables

- Pipelines with quality gates
- Runbooks executable by on-call teams
- Application and infrastructure rollback strategy

## Dockerfile rule of thumb

- Runtime Dockerfiles live next to each app (`apps/.../Dockerfile`)
- Orchestration, templates, and automation live in `infra/devops`

## Official delivery flow (protected main)

With protected-branch rules, the operating sequence is:

1. Create a working branch (`feat/*`, `fix/*`, `chore/*`).
2. Open a PR to `main`.
3. Pass CI (`lint`, `build`, `test`) and get approvals.
4. Merge into `main`.
5. `Release` runs automatically.
6. If `Release` succeeds, `Mobile` runs next.

Important: release happens after merge into `main`, not before.

## DevOps PR checklist

- [ ] Pipeline or IaC change documented
- [ ] Plan/validation evidence attached
- [ ] Runbook updated when operations change

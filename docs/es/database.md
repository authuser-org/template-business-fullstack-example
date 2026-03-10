# Base de datos

## Ubicación

- `infra/database/migrations`
- `infra/database/schema`
- `infra/database/seeds`

## Objetivo

Mantener el contrato de datos versionado y controlado, con independencia del ORM.

## Flujo recomendado

1. Crear migración `*.up.sql`
2. Crear rollback `*.down.sql`
3. Validar en `dev`
4. Promover a `pre` y luego `pro`

## Entregables esperados

- Evolución de esquema auditable
- Rollback documentado
- Evidencia de ejecución en entorno de integración

## Checklist rápido de PR (Base de datos)

- [ ] Migración y rollback incluidos
- [ ] Impacto en índices/FK revisado
- [ ] Compatibilidad hacia atrás evaluada
- [ ] Evidencia de ejecución en entorno de integración

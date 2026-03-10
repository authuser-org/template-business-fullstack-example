# Database

## Location

- `infra/database/migrations`
- `infra/database/schema`
- `infra/database/seeds`

## Purpose

Maintain a versioned and controlled data contract, independent of ORM choices.

## Recommended flow

1. Create `*.up.sql` migration
2. Create `*.down.sql` rollback
3. Validate in `dev`
4. Promote to `pre`, then `pro`

## Expected deliverables

- Auditable schema evolution
- Documented rollback path
- Execution evidence in integration environment

## Database PR checklist

- [ ] Migration and rollback included
- [ ] Index/FK impact reviewed
- [ ] Backward compatibility assessed
- [ ] Execution evidence attached

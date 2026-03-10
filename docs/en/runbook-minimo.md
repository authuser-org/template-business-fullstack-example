# Minimal runbook

Baseline runbook for initial operations (standard deployment and SEV-1 incident).

## 1) Standard deployment

1. Confirm the pipeline is green (`lint`, `build`, `test`).
2. Confirm environment variables (see `./environments.md`).
3. Execute release on target branch (`develop` or `main`).
4. Validate API `GET /health`.
5. Record evidence: pipeline link, owner, and timestamp.

## 2) High-severity incident (SEV-1)

### Objective

Recover critical service with minimum business impact.

### Procedure

1. Declare incident and assign Incident Commander.
2. Freeze non-urgent deployments.
3. Verify API status and last stable release.
4. Execute application/configuration rollback.
5. Validate recovery with smoke checks.
6. Communicate status to business and technical teams.

### Closure

- Document RCA (root cause), impact, and preventive actions.
- Create follow-up tasks with owner and target date.

## Related links

- [Environments](./environments.md)
- [Go-Live checklist](../../CHECKLIST_GO_LIVE.md)

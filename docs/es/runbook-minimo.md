# Runbook mínimo

Runbook base para operación inicial (despliegue estándar e incidente SEV-1).

## 1) Despliegue estándar

1. Confirmar pipeline en verde (`lint`, `build`, `test`).
2. Confirmar variables por entorno (ver `./environments.md`).
3. Ejecutar release en rama objetivo (`develop` o `main`).
4. Validar `GET /health` en API.
5. Registrar evidencia: enlace a pipeline, responsable y timestamp.

## 2) Incidente severidad alta (SEV-1)

### Objetivo

Recuperar servicio crítico con el menor impacto posible sobre negocio.

### Procedimiento

1. Declarar incidente y asignar Incident Commander.
2. Congelar despliegues no urgentes.
3. Verificar estado de API y última release estable.
4. Ejecutar rollback de aplicación/configuración.
5. Validar recuperación con smoke checks.
6. Comunicar estado a negocio y equipos técnicos.

### Cierre

- Documentar RCA (causa raíz), impacto y acciones preventivas.
- Crear tareas de seguimiento con owner y fecha objetivo.

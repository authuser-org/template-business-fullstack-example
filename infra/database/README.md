# Database

Espacio del equipo de base de datos.

## Carpetas

- `migrations/`: scripts de evolución del esquema.
- `schema/`: definición base del esquema (DDL, vistas, funciones).
- `seeds/`: datos base para entornos no productivos.

## Reglas sugeridas

- Migraciones inmutables: no editar una migración ya aplicada.
- Nombre recomendado: `YYYYMMDDHHMM__descripcion.sql`.
- Toda migración debe tener rollback documentado.

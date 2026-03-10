# Entornos y variables

Matriz mínima de entornos para operación de negocio en formato corporativo.

## Entornos de negocio

- `dev`: desarrollo local y validación interna.
- `pre`: preproducción, espejo funcional de producción.
- `pro`: producción.

## Convenciones

- Entorno de negocio: `APP_ENV=dev|pre|pro`
- Entorno técnico: `NODE_ENV=development|test|production`
- Secretos fuera del repositorio (secret manager).
- `.env.local` solo para desarrollo local.

## Variables por stack

### API (`apps/api`)

| Variable       | dev | pre | pro | Descripción |
| -------------- | --- | --- | --- | ----------- |
| `APP_ENV`      | ✅  | ✅  | ✅  | Entorno negocio |
| `NODE_ENV`     | ✅  | ✅  | ✅  | Entorno runtime |
| `PORT`         | ✅  | ✅  | ✅  | Puerto HTTP |
| `CORS_ORIGINS` | ✅  | ✅  | ✅  | Orígenes permitidos |
| `DATABASE_URL` | ✅  | ✅  | ✅  | Conexión a base de datos |
| `JWT_SECRET`   | ✅  | ✅  | ✅  | Secreto de firma JWT |

### Web (`apps/web`)

| Variable              | dev | pre | pro | Descripción |
| --------------------- | --- | --- | --- | ----------- |
| `APP_ENV`             | ✅  | ✅  | ✅  | Entorno negocio |
| `NODE_ENV`            | ✅  | ✅  | ✅  | Entorno runtime |
| `NEXT_PUBLIC_API_URL` | ✅  | ✅  | ✅  | URL pública de API |

### Mobile (`apps/mobile`)

| Variable   | dev | pre | pro | Descripción |
| ---------- | --- | --- | --- | ----------- |
| `APP_ENV`  | ✅  | ✅  | ✅  | Entorno negocio |
| `NODE_ENV` | ✅  | ✅  | ✅  | Entorno runtime |
| `API_URL`  | ✅  | ✅  | ✅  | URL base de API |

## Checklist de promoción entre entornos

- [ ] Variables y secretos cargados en el entorno destino.
- [ ] Pipeline de calidad (`lint`, `test`, `build`) en verde.
- [ ] Healthcheck de API validado tras despliegue.

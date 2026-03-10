# Guía para desarrolladores

Bienvenido al equipo. Este documento explica todo lo que necesitas saber para trabajar en el monorepo desde el primer día.

---

## Contenido

- [Configuración del entorno](#configuración-del-entorno)
- [Primer arranque](#primer-arranque)
- [Flujo de trabajo diario](#flujo-de-trabajo-diario)
- [Cómo hacer commits](#cómo-hacer-commits)
- [Ramas y Pull Requests](#ramas-y-pull-requests)
- [Qué pasa en el CI/CD](#qué-pasa-en-el-cicd)
- [Versionado — qué tienes que hacer tú](#versionado--qué-tienes-que-hacer-tú)
- [Paquetes compartidos](#paquetes-compartidos)
- [Trabajar solo en tu app](#trabajar-solo-en-tu-app)
- [Firma y secrets mobile](#firma-y-secrets-mobile)
- [Errores frecuentes](#errores-frecuentes)
- [Go-Live y operación](#go-live-y-operación)

---

## Configuración del entorno

### 1. Instala las herramientas necesarias

```bash
# Node.js 22 (recomendado con nvm)
nvm install 22 && nvm use 22

# pnpm
npm install -g pnpm@9

# Verificar versiones
node --version   # v22.x.x
pnpm --version   # 9.x.x
```

Para **mobile** adicionalmente necesitas:

- **iOS**: Xcode (Mac App Store) + CocoaPods (`brew install cocoapods`)
- **Android**: Android Studio + SDK (ver [guía oficial React Native](https://reactnative.dev/docs/set-up-your-environment))

### 2. Clona el repositorio

```bash
git clone <url-del-repo>
cd <nombre-del-repo>
```

### 3. Instala las dependencias

```bash
pnpm install
```

Esto instala las dependencias de **todo el monorepo** y configura los git hooks de Husky automáticamente.

### 4. Variables de entorno

```bash
cp apps/web/.env.example    apps/web/.env.local
cp apps/api/.env.example    apps/api/.env.local
```

> Nunca subas ficheros `.env.local` al repositorio. Están en `.gitignore`.

---

## Primer arranque

```bash
# Levantar todo en paralelo
pnpm dev
```

| App    | URL                                                             |
| ------ | --------------------------------------------------------------- |
| web    | http://localhost:3000                                           |
| api    | http://localhost:4000                                           |
| mobile | conecta el simulador y ejecuta `pnpm --filter @repo/mobile ios` |

---

## Flujo de trabajo diario

```
1. Actualiza tu rama local
   git checkout develop && git pull

2. Crea tu rama de feature
   git checkout -b feat/nombre-de-la-feature

3. Trabaja en tu app
   pnpm --filter @repo/web dev   (o api, o mobile)

4. Haz commits con el formato correcto
   git commit -m "feat(web): add login page"

5. Sube la rama y abre un PR hacia la rama objetivo (`develop` o `main`)
   git push origin feat/nombre-de-la-feature
```

---

## Cómo hacer commits

Los commits siguen el estándar [Conventional Commits](https://www.conventionalcommits.org/).  
**Husky valida automáticamente cada commit** — si el formato es incorrecto, el commit se rechaza antes de enviarse.

### Formato

```
<type>(<scope>): <descripción en minúsculas>
```

### Types disponibles

| Type       | Cuándo usarlo                                | Cambia versión   |
| ---------- | -------------------------------------------- | ---------------- |
| `feat`     | Nueva funcionalidad                          | ✅ minor `1.1.0` |
| `fix`      | Corrección de un bug                         | ✅ patch `1.0.1` |
| `perf`     | Mejora de rendimiento                        | ✅ patch         |
| `refactor` | Refactorización sin cambio de comportamiento | ✅ patch         |
| `docs`     | Cambios en documentación                     | ❌               |
| `style`    | Formato de código (espacios, comas…)         | ❌               |
| `test`     | Añadir o modificar tests                     | ❌               |
| `chore`    | Tareas de mantenimiento (deps, config…)      | ❌               |
| `ci`       | Cambios en CI/CD                             | ❌               |
| `revert`   | Revertir un commit                           | ✅ patch         |

> Para un cambio que rompe retrocompatibilidad añade `!` al type o incluye `BREAKING CHANGE:` en el cuerpo → genera versión **major** `2.0.0`.

### Scopes permitidos

Indica en qué app o área estás trabajando:

| Scope      | Cuándo usarlo                                  |
| ---------- | ---------------------------------------------- |
| `web`      | Cambios en `apps/web`                          |
| `api`      | Cambios en `apps/api`                          |
| `mobile`   | Cambios en `apps/mobile`                       |
| `packages` | Cambios en `packages/`                         |
| `deps`     | Actualización de dependencias                  |
| `release`  | Cambios relacionados con el proceso de release |

### Ejemplos reales

```bash
# Nuevo feature en web
git commit -m "feat(web): add user login page"

# Bug fix en api
git commit -m "fix(api): handle null response on auth endpoint"

# Mejora de rendimiento en mobile
git commit -m "perf(mobile): optimize image loading on feed"

# Actualización de dependencias
git commit -m "chore(deps): update react to 19.3"

# Cambio en packages compartidos
git commit -m "feat(packages): add shared button component"

# Breaking change
git commit -m "feat(api)!: redesign authentication endpoints"
# o con cuerpo:
git commit -m "feat(api): redesign auth" -m "BREAKING CHANGE: /auth/login now returns a different response shape"

# Cambio en documentación (no genera versión)
git commit -m "docs(web): update setup instructions"
```

### ❌ Ejemplos incorrectos (serán rechazados)

```bash
git commit -m "adding login"               # sin type
git commit -m "feat: add login"            # sin scope
git commit -m "feat(frontend): add login"  # scope no permitido
git commit -m "feat(web): Add Login Page"  # mayúsculas en descripción
```

---

## Ramas y Pull Requests

### Nombre de ramas

```
feat/<descripción>    # nueva funcionalidad
fix/<descripción>     # corrección de bug
chore/<descripción>   # mantenimiento
docs/<descripción>    # documentación
```

Ejemplos:

```
feat/user-authentication
fix/api-null-response
chore/update-dependencies
```

### Flujo de ramas

```
feat/mi-feature
      │
      └──── PR ──── develop  →  pre-release 1.2.3-beta.1
                      │
                      └──── PR ──── main  →  release 1.2.3
```

### Checklist antes de abrir un PR

- [ ] Los tests pasan localmente (`pnpm test`)
- [ ] El linting no tiene errores (`pnpm lint`)
- [ ] El PR va hacia la rama objetivo (`develop` para pre-release o `main` para release)
- [ ] El título del PR sigue el formato de conventional commits
- [ ] Los commits tienen el scope correcto

---

## Qué pasa en el CI/CD

### Orden oficial en ramas críticas

En `main` y `develop` el flujo se ejecuta en cadena:

1. `CI` (`lint` → `build` → `test`)
2. `Release` (si CI pasa)
3. `Mobile` (si Release pasa)

Regla clave: la release ocurre después del merge del PR en la rama objetivo.

Al hacer push o abrir un PR el CI ejecuta automáticamente:

```
┌─────────────────────────────────────────────────────────┐
│  FEATURE BRANCH / PULL REQUEST                          │
│                                                          │
│   lint ──► build ──► test                               │
│                        │                                │
│                     ✅ verde    ❌ rojo                  │
│                  PR se puede    PR queda                 │
│                    mergear      bloqueado                │
│                                                          │
│   Si hay cambios en mobile/shared:                       │
│   Mobile workflow genera APK debug (Android)             │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  MERGE A DEVELOP                                         │
│                                                          │
│   CI (lint/build/test)                                   │
│            │                                             │
│            └────► Release (beta)                         │
│                       │                                  │
│                       └────► Mobile (signed artifacts)   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  MERGE A MAIN                                            │
│                                                          │
│   CI (lint/build/test)                                   │
│            │                                             │
│            └────► Release (stable)                       │
│                       │                                  │
│                       ├────► Docker web/api en GHCR      │
│                       ├────► Tag git                     │
│                       └────► GitHub Release              │
│                                      │                   │
│                                      └────► Mobile (APK/AAB/IPA)
└─────────────────────────────────────────────────────────┘
```

> **Nunca hagas push directo a `main` o `develop`.** Siempre a través de PR.

---

## Versionado — qué tienes que hacer tú

**Nada.** El versionado es completamente automático.

```
Tu responsabilidad:     escribir commits con el formato correcto
Responsabilidad del CI: calcular la versión, crear el tag,
                        publicar GitHub Release y publicar artefactos
```

La versión la determina el tipo de commit:

```
git commit -m "fix(web): ..."     →  release patch (ej. 1.0.0 → 1.0.1)
git commit -m "feat(web): ..."    →  release minor (ej. 1.0.1 → 1.1.0)
git commit -m "feat(api)!: ..."   →  release major (ej. 1.1.0 → 2.0.0)
```

### ¿Dónde veo las notas de release?

En GitHub, dentro de la sección **Releases** del repositorio.

---

## Paquetes compartidos

El directorio `packages/shared` contiene lógica de negocio que todos los equipos pueden importar directamente. Como todo es TypeScript, el compilador valida los tipos en `web`, `api` y `mobile` por igual.

```ts
import { isValidEmail, formatPrice, type User, UserRole } from '@repo/shared';
```

### Qué hay disponible

| Export                 | Tipo      | Descripción                                 |
| ---------------------- | --------- | ------------------------------------------- |
| `User`                 | interface | Entidad de usuario base                     |
| `UserRole`             | enum      | `admin` · `editor` · `viewer`               |
| `CreateUserDto`        | interface | DTO para crear usuarios (forms + endpoints) |
| `PaginatedResult<T>`   | interface | Respuesta paginada genérica                 |
| `formatPrice(amount)`  | función   | `1999.9` → `"1.999,90 €"`                   |
| `formatDate(date)`     | función   | `new Date()` → `"9 de marzo de 2026"`       |
| `truncate(text, max)`  | función   | `"Texto largo"` → `"Texto lar…"`            |
| `isValidEmail(email)`  | función   | Valida formato de email                     |
| `isValidPassword(pwd)` | función   | Mínimo 8 chars, 1 mayúscula, 1 número       |
| `isUUID(value)`        | función   | Valida UUID v4                              |

### Dónde está el código de ejemplo

| App      | Fichero                                     | Qué muestra                                        |
| -------- | ------------------------------------------- | -------------------------------------------------- |
| `web`    | `apps/web/app/components/ProfileCard.tsx`   | `formatPrice`, `formatDate`, tipo `User`           |
| `api`    | `apps/api/src/users/users.service.ts`       | `isValidEmail`, `isValidPassword`, `CreateUserDto` |
| `mobile` | `apps/mobile/src/screens/ProfileScreen.tsx` | `formatDate`, `formatPrice`, tipo `User`           |

### Añadir algo nuevo al paquete

1. Crea o modifica el fichero en `packages/shared/src/`
2. Expórtalo en `packages/shared/src/index.ts`
3. Turbo construirá `@repo/shared` antes que las apps automáticamente (`dependsOn: ["^build"]`)
4. Haz el commit con scope `packages`:

```bash
git commit -m "feat(packages): add formatPhoneNumber utility"
```

---

## Trabajar solo en tu app

También puedes usar comandos raíz preconfigurados:

```bash
pnpm dev:web
pnpm dev:api
pnpm dev:web:api

pnpm mobile:metro
pnpm mobile:metro:reset
pnpm mobile:android
pnpm mobile:ios
```

Equivalentes por workspace:

Si eres del equipo de **web**:

```bash
# Solo arranca web
pnpm --filter @repo/web dev

# Solo compila web
pnpm --filter @repo/web build

# Solo tests de web
pnpm --filter @repo/web test

# Solo linting de web
pnpm --filter @repo/web lint
```

Si eres del equipo de **api**:

```bash
pnpm --filter @repo/api dev
pnpm --filter @repo/api test
```

Si eres del equipo de **mobile**:

```bash
pnpm --filter @repo/mobile ios
pnpm --filter @repo/mobile android
```

> Aunque trabajes solo en tu app, usa el scope correcto para mantener trazabilidad y notas de release claras.

---

## Firma y secrets mobile

Esta sección es solo para el equipo mobile. Los secrets se configuran **una sola vez** en GitHub y el CI los usa automáticamente en cada build de `main` y `develop`.

### Android — generar keystore

Si no tienes un keystore de producción, créalo así:

```bash
keytool -genkey -v \
  -keystore release.keystore \
  -alias mobile-key \
  -keyalg RSA -keysize 2048 \
  -validity 10000
```

Guarda el fichero `release.keystore` en un lugar seguro (**nunca lo subas al repositorio**). Después convierte a base64 para añadirlo como secret:

```bash
base64 -w0 release.keystore  # Linux
base64 release.keystore      # macOS
```

| Secret a configurar en CI   | Valor                                  |
| --------------------------- | -------------------------------------- |
| `ANDROID_KEYSTORE_BASE64`   | salida del comando de arriba           |
| `ANDROID_KEYSTORE_PASSWORD` | contraseña que pusiste en el keytool   |
| `ANDROID_KEY_ALIAS`         | `mobile-key` (o el alias que elegiste) |
| `ANDROID_KEY_PASSWORD`      | contraseña de la clave                 |

### iOS — certificado y perfil

1. En [Apple Developer](https://developer.apple.com) descarga:
   - **Certificado de distribución** (`.cer`) y expórtalo como `.p12` desde Keychain Access
   - **Provisioning Profile** (`.mobileprovision`) — tipo `Ad Hoc` para develop, `App Store` para main

2. Conviértelos a base64:

```bash
base64 -w0 Certificates.p12         # → IOS_CERTIFICATE_BASE64
base64 -w0 mobile_adhoc.mobileprovision # → IOS_PROVISIONING_PROFILE_BASE64
```

| Secret a configurar en CI         | Valor                            |
| --------------------------------- | -------------------------------- |
| `IOS_CERTIFICATE_BASE64`          | base64 del .p12                  |
| `IOS_CERTIFICATE_PASSWORD`        | contraseña del .p12              |
| `IOS_PROVISIONING_PROFILE_BASE64` | base64 del .mobileprovision      |
| `APPLE_TEAM_ID`                   | ID del equipo (ej. `ABC123XYZ9`) |

> Para obtener el `APPLE_TEAM_ID`: entra en [developer.apple.com/account](https://developer.apple.com/account), sección **Membership** → campo **Team ID**.

En GitHub Actions no hace falta runner propio — `macos-14` está disponible en los runners públicos.

---

## Errores frecuentes

### El commit se rechaza

```
✖ subject may not be empty
✖ type may not be empty
```

**Solución:** revisa el formato — `<type>(<scope>): <descripción>`.

---

### El scope no es válido

```
✖ scope must be one of [web, api, mobile, packages, deps, release]
```

**Solución:** usa uno de los scopes permitidos listados arriba.

---

### `pnpm install` falla con error de workspace

```
Usage Error: The nearest package directory doesn't seem to be part of the project
```

**Solución:** asegúrate de ejecutar `pnpm install` desde la **raíz del monorepo**, no desde dentro de una app.

---

### El CI falla en lint pero en local no

**Solución:** ejecuta `pnpm lint` desde la raíz del monorepo, no desde dentro de la app.

---

### Quiero deshacer el último commit (aún no pusheado)

```bash
git reset --soft HEAD~1
# Modifica lo que necesites y vuelve a commitear
```

---

### Dos compañeros modificaron el mismo archivo (conflicto)

```bash
git checkout develop
git pull
git checkout feat/mi-feature
git rebase develop
# Resuelve los conflictos y continúa
git rebase --continue
```

---

## Go-Live y operación

Documentación operativa base:

- [docs/README.md](./docs/README.md)
- [docs/es/environments.md](./docs/es/environments.md)
- [docs/es/runbook-minimo.md](./docs/es/runbook-minimo.md)
- [docs/en/environments.md](./docs/en/environments.md)
- [docs/en/runbook-minimo.md](./docs/en/runbook-minimo.md)

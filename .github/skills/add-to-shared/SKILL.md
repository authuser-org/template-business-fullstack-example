---
name: add-to-shared
description: Guía para añadir tipos, interfaces, enums o funciones utilitarias al paquete @repo/shared. Úsala cuando quieras crear código TypeScript reutilizable entre web, api y mobile, o cuando Copilot te sugiera duplicar lógica en más de una app.
argument-hint: "[qué quieres añadir: tipo, validación, utilidad de formato...]"
---

# Añadir código a @repo/shared

El paquete `packages/shared` contiene lógica de negocio en TypeScript puro que
comparten `web`, `api` y `mobile`. Como las tres apps son TypeScript, el compilador
valida los tipos en todas ellas al mismo tiempo.

## Cuándo añadir algo a shared

- Una interfaz o tipo que usan dos o más apps
- Una función de validación (email, password, UUID…)
- Una función de formato (precio, fecha, texto…)
- Un enum de dominio (roles, estados, categorías…)
- Cualquier lógica de negocio que no dependa del entorno (sin DOM, sin NativeModules, sin Node.js específico)

## Estructura del paquete

```
packages/shared/src/
├── types/          → interfaces, enums, DTOs
│   └── user.ts     → User, UserRole, CreateUserDto, PaginatedResult
├── utils/
│   ├── format.ts   → formatPrice, formatDate, truncate
│   └── validate.ts → isValidEmail, isValidPassword, isUUID
└── index.ts        → barrel export (re-exporta todo)
```

## Pasos para añadir algo nuevo

### 1. Crear o editar el fichero fuente

**Para un tipo nuevo** → `packages/shared/src/types/<nombre>.ts`

```ts
/**
 * Descripción de la interfaz.
 * Consumida por: web · api · mobile
 */
export interface MyNewType {
  id: string;
  // ...
}
```

**Para una utilidad nueva** → `packages/shared/src/utils/<categoria>.ts`

```ts
/**
 * Descripción de lo que hace.
 *
 * @example
 * myUtil("input") // → "output"
 */
export function myUtil(value: string): string {
  // sin dependencias externas, sin DOM, sin Node.js específico
}
```

### 2. Exportar desde el barrel (obligatorio)

Editar `packages/shared/src/index.ts` y añadir la exportación:

```ts
// Tipos nuevos
export type { MyNewType } from "./types/myFile";
export { MyEnum } from "./types/myFile";

// Utilidades nuevas
export { myUtil } from "./utils/myCategory";
```

### 3. Compilar el paquete

Turbo compila `@repo/shared` antes que las apps gracias a `"dependsOn": ["^build"]`,
pero durante el desarrollo conviene tenerlo en modo watch:

```bash
pnpm --filter @repo/shared dev   # tsc --watch
```

O simplemente dejar que Turbo lo gestione:

```bash
pnpm build   # compila shared primero, luego las apps
```

### 4. Importarlo en la app correspondiente

```ts
// En web, api o mobile — exactamente igual en las tres
import { MyNewType, myUtil } from "@repo/shared";
```

### 5. Commit con scope packages

```bash
git commit -m "feat(packages): add myUtil to shared utilities"
# o
git commit -m "feat(packages): add MyNewType interface"
```

## Restricciones importantes

- **Sin dependencias externas** en shared: no instales `axios`, `react`, `express`, etc.
  Solo TypeScript puro y la biblioteca estándar de JavaScript (Intl, Date, etc.)
- **Sin código de entorno**: nada de `document`, `window`, `NativeModules`, `fs`…
- Si necesitas algo específico de plataforma, créalo en la propia app, no en shared.

## Tipos ya disponibles

Antes de crear algo nuevo, comprueba si ya existe en `packages/shared/src/index.ts`:

```ts
// Tipos
User, UserRole, CreateUserDto, PaginatedResult<T>

// Validaciones
isValidEmail(email)
isValidPassword(password)
isUUID(value)

// Formato
formatPrice(amount, currency?, locale?)
formatDate(date, locale?, options?)
truncate(text, maxLength)
```

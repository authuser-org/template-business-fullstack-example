# Sistema UI reutilizable (`@repo/ui-*`)

Guía para reutilizar este sistema de UI en futuros proyectos y cambiar el **look & feel** sin romper componentes.

Seguimiento de avance: [CHECKLIST.md](./CHECKLIST.md)

## Objetivo

Este sistema separa:

- **Núcleo visual compartido** (`@repo/ui-core`): tokens, variables CSS y theme Tailwind.
- **Adaptador Web** (`@repo/ui-react`): componentes/hooks para React web.
- **Adaptador Mobile** (`@repo/ui-react-native`): componentes/hooks para React Native.

La API de uso se mantiene estable (`Button`, `useToggle`, etc.) mientras el estilo puede cambiar por proyecto.

## Paquetes

- `@repo/ui-core`
  - `styles.css`: define variables base `--ui-*`.
  - `tailwind-theme.css`: publica tokens en `@theme inline` (Tailwind v4).
- `@repo/ui-react`
  - Componentes y hooks para web.
- `@repo/ui-react-native`
  - Componentes y hooks para mobile.

## Uso en Web (Next.js + Tailwind v4)

### 1) Dependencias

```bash
pnpm add @repo/ui-react
```

### 2) Importar theme en CSS global

En el `globals.css` de la app:

```css
@import 'tailwindcss';
@import '@repo/ui-react/styles.css';
@import '@repo/ui-react/tailwind-theme.css';

@source '../../../packages/ui/react/src/**/*.{ts,tsx}';
```

> Si los componentes UI viven fuera del proyecto web (monorepo), mantén `@source` apuntando al paquete para que Tailwind genere utilidades usadas allí.

### 3) Consumir componentes

```tsx
import { BottomSheet, Button, useToggle } from '@repo/ui-react';
```

`BottomSheet` en web usa una implementación interna compatible con React 19.

## Uso en Mobile (React Native)

### 1) Dependencias

```bash
pnpm add @repo/ui-react-native
```

### 2) Consumir componentes

```tsx
import { BottomSheet, Button, useToggle } from '@repo/ui-react-native';
```

`BottomSheet` en mobile usa internamente `@gorhom/react-native-bottom-sheet` (`@gorhom/bottom-sheet`).

> El contenido de `BottomSheet` puede ser distinto en web y mobile según el caso de uso.

## Personalizar look & feel por proyecto

Hay 2 niveles recomendados:

### A) Tema base compartido (todos los proyectos)

Modificar en `@repo/ui-core`:

- `styles.css` para valores `--ui-*` (colores, radios, sombras, breakpoints).
- `tailwind-theme.css` para cómo se exponen en Tailwind (`--color-*`, `--radius-*`, etc.).

Úsalo cuando quieras que todos los productos hereden el mismo branding.

### B) Tema por proyecto (un producto específico)

Sobrescribir variables en el CSS global de la app, por ejemplo:

```css
:root {
	--ui-color-brand-500: #7c3aed;
	--ui-color-brand-600: #6d28d9;
	--ui-radius-md: 0.75rem;
}
```

Así mantienes los mismos componentes pero cambias el look & feel sin tocar lógica.

## Reglas recomendadas

- Mantener **tokens semánticos** (`brand`, `surface`, `feedback`) en vez de colores hardcodeados en componentes.
- Evitar `style` inline para tema en web; preferir `@theme` + variables CSS.
- Si agregas un token nuevo:
  1. añadir en `@repo/ui-core/styles.css`,
  2. exponer en `@repo/ui-core/tailwind-theme.css`,
  3. usar en componentes de `@repo/ui-react` / `@repo/ui-react-native`.

## Estrategia de hooks (basada en Mantine)

### Hooks implementados actualmente

- Comunes por API en web y mobile: `useToggle`, `useDisclosure`, `useCounter`, `usePrevious`, `useDebouncedValue`, `useDebouncedState`, `useThrottledValue`, `useTimeout`, `useInterval`, `useSetState`, `useListState`.
- Utilidades de lógica compartida en `@repo/ui-core`: toggle/disclosure/counter + helpers de `setState` y `listState`.

### Hooks comunes (`@repo/ui-core`)

Priorizar hooks agnósticos de plataforma (sin `window`/`document`):

- Estado: `useToggle`, `useDisclosure`, `useCounter`, `useSetState`, `useListState`.
- Colecciones: `useMap`, `useSet`, `useQueue`, `usePagination`.
- Timing: `useDebouncedValue`, `useDebouncedState`, `useThrottledValue`, `useTimeout`, `useInterval`.
- Utilidad de ciclo: `usePrevious`, `useValidatedState`, `useStateHistory`, `useInputState`, `useDidUpdate`.

### Hooks web (`@repo/ui-react`)

Implementar en capa web los hooks que dependen del navegador:

- Browser/Storage: `useLocalStorage`, `useSessionStorage`, `useClipboard`, `useHash`, `useDocumentTitle`.
- DOM/viewport: `useMediaQuery`, `useViewportSize`, `useWindowScroll`, `useResizeObserver`, `useElementSize`.
- Interacción: `useClickOutside`, `useHover`, `useMouse`, `useIntersection`, `useScrollIntoView`.
- Accesibilidad/UX: `useFocusTrap`, `useFocusReturn`, `useHotkeys`, `useReducedMotion`.

### Hooks mobile (`@repo/ui-react-native`)

- Reusar todos los hooks comunes de `@repo/ui-core`.
- No portar hooks web-only (`window`, `document`, `localStorage`, observers del DOM).
- Crear wrappers nativos equivalentes: `useAppState`, `useKeyboard`, `useNetInfo`, `useDeviceOrientation`, `useDimensions`, `useColorScheme`.

> Nota: en React Native, los tokens de tamaño/spacing se exponen como números (dp), no como `rem`.

## Build de paquetes

```bash
pnpm --filter @repo/ui-core build
pnpm --filter @repo/ui-react build
pnpm --filter @repo/ui-react-native build
```

## Checklist para nuevos proyectos

1. Instalar solo el adaptador (`@repo/ui-react` o `@repo/ui-react-native`).
1. Importar `styles.css` y `tailwind-theme.css` en web.
1. Configurar `@source` para que Tailwind vea el código de componentes.
1. Definir override de variables `--ui-*` para el branding del proyecto.
1. Validar componentes base (`Button`) y hooks (`useToggle`).

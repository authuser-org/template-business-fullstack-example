# Checklist UI (Componentes + Hooks)

Estado de implementación del sistema UI para seguimiento de equipo.

## Estado actual

- Fecha de actualización: 2026-03-11
- Objetivo: validar qué está hecho y qué falta para roadmap OTT.

## Componentes

### Base (actual)

- [x] `Button` en `@repo/ui-react`
- [x] `Button` en `@repo/ui-react-native`

### P1 OTT (prioridad alta)

- [x] `Card` (web)
- [x] `Card` (react-native)
- [x] `BottomSheet` (web)
- [x] `BottomSheet` (react-native)
- [ ] `Tabs` (web)
- [ ] `Tabs` (react-native)
- [x] `Modal` (web)
- [x] `Modal` (react-native)
- [ ] `Drawer` (web)
- [ ] `Drawer` (react-native)
- [x] `TextInput` (web)
- [x] `TextInput` (react-native)
- [ ] `Select` (web)
- [ ] `Select` (react-native)
- [x] `Skeleton` (web)
- [x] `Skeleton` (react-native)
- [x] `Progress` (web)
- [x] `Progress` (react-native)
- [x] `Alert` (web)
- [x] `Alert` (react-native)

### P2 (siguiente fase)

- [ ] `Menu` (web)
- [ ] `Menu` (react-native)
- [ ] `Tooltip` (web)
- [ ] `Badge` (web)
- [ ] `Badge` (react-native)
- [ ] `LoadingOverlay` (web)
- [ ] `LoadingOverlay` (react-native)
- [ ] `Pagination` (web)

## Hooks

### Implementados (web + mobile)

- [x] `useToggle`
- [x] `useDisclosure`
- [x] `useCounter`
- [x] `usePrevious`
- [x] `useDebouncedValue`
- [x] `useTimeout`
- [x] `useInterval`
- [x] `useSetState`
- [x] `useListState`
- [x] `useDebouncedState`
- [x] `useThrottledValue`

### Núcleo compartido (`@repo/ui-core`) pendientes

- [ ] `useMap`
- [ ] `useSet`
- [ ] `useQueue`
- [ ] `usePagination`
- [ ] `useValidatedState`
- [ ] `useStateHistory`
- [ ] `useInputState`
- [ ] `useDidUpdate`

### Web (`@repo/ui-react`) pendientes

- [ ] `useLocalStorage`
- [ ] `useSessionStorage`
- [ ] `useClipboard`
- [ ] `useHash`
- [ ] `useDocumentTitle`
- [ ] `useMediaQuery`
- [ ] `useViewportSize`
- [ ] `useWindowScroll`
- [ ] `useResizeObserver`
- [ ] `useElementSize`
- [ ] `useClickOutside`
- [ ] `useHover`
- [ ] `useMouse`
- [ ] `useIntersection`
- [ ] `useScrollIntoView`
- [ ] `useFocusTrap`
- [ ] `useFocusReturn`
- [ ] `useHotkeys`
- [ ] `useReducedMotion`

### Mobile (`@repo/ui-react-native`) pendientes

- [ ] `useAppState`
- [ ] `useKeyboard`
- [ ] `useNetInfo`
- [ ] `useDeviceOrientation`
- [ ] `useDimensions`
- [ ] `useColorScheme`

## Criterios de cierre por ítem

- [ ] API del hook/componente unificada entre `react` y `react-native` cuando aplique.
- [ ] Exportado en `index.ts` del paquete correspondiente.
- [ ] Documentado en `packages/ui/README.md`.
- [ ] Build de `ui-core`, `ui-react`, `ui-react-native` en verde.
- [ ] Validado en `apps/web` y/o `apps/mobile` según corresponda.

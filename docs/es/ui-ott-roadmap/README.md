# Roadmap UI OTT (Checklist)

Checklist práctico para implementar después, por fases, en el sistema UI compartido.

Última actualización: 11-03-2026 (Fase 3 ✅ - ContentDetail, VideoPlayer, Watch Experience iniciado)

## Cómo usar este documento

- Marcar cada ítem cuando esté terminado.
- Mantener paridad entre Web y Native cuando aplique.
- Priorizar componentes base reutilizables antes de compuestos OTT.

## Convención de estado

- ✅ Implementado
- ⚠️ Existe pero requiere refactor
- ⬜ Pendiente

---

## Estado actual (base)

### Primitives UI

- ✅ Button (Both)
- ✅ Card (Both)
- ✅ TextInput (Both)
- ✅ Skeleton (Both)
- ✅ Progress (Both)
- ✅ Alert (Both)
- ✅ BottomSheet (Both)
- ✅ Modal (Both)
- ✅ ToastNotification (Both)

### Hooks de estado

- ✅ useToggle
- ✅ useDisclosure
- ✅ useCounter
- ✅ usePrevious
- ✅ useDebouncedValue
- ✅ useDebouncedState
- ✅ useThrottledValue
- ✅ useTimeout
- ✅ useInterval
- ✅ useSetState
- ✅ useListState

---

## Fase 1 — Layout y navegación base

### Layout

- ✅ AppShell (Both)
- ✅ MainLayout (Web)
- ✅ PageLayout (Both)
- ✅ Container (Both)
- ✅ Section (Both)
- ✅ Grid (Web)
- ✅ Stack (Both)
- ✅ Spacer (Both)
- ✅ Divider (Both)
- ✅ AspectRatio (Both)
- ✅ ScrollableArea (Both)

### Navigation

- ✅ Header (Web)
- ✅ TopNavigation (Web)
- ✅ SideNavigation (Web)
- ✅ MobileNavigation (Native)
- ✅ Footer (Web)
- ✅ Breadcrumbs (Web)
- ✅ Tabs (Both)
- ✅ Pagination (Web)
- ✅ CategoryNavigation (Both)
- ✅ GenreNavigation (Both)
- ✅ ProfileMenu (Both)
- ✅ SearchBar (Both)
- ✅ SearchResults (Both)

---

## Fase 2 — Discovery y browsing

### Hero / Discovery

- ✅ HeroBanner (Both)
- ✅ HeroCarousel (Both)
- ✅ HeroSlide (Both)
- ✅ FeaturedContent (Both)
- ✅ FeaturedCarousel (Both)
- ✅ FeaturedCard (Both)
- ✅ SpotlightBanner (Both)
- ✅ PromotionBanner (Both)

### Content Browsing

- ✅ ContentRow (Both)
- ✅ ContentCarousel (Both)
- ✅ ContentGrid (Web)
- ✅ ContentSlider (Both)
- ✅ ContentList (Both)
- ✅ ContentSection (Both)
- ✅ ContinueWatchingRow (Both)
- ✅ TrendingRow (Both)
- ✅ RecommendedRow (Both)
- ✅ CategoryRow (Both)
- ✅ GenreRow (Both)

### Content Cards

- ✅ ContentCard (Both)
- ✅ ContentPosterCard (Both)
- ✅ ContentLandscapeCard (Both)
- ✅ ContentSquareCard (Both)
- ✅ ContentPreviewCard (Both)
- ✅ EpisodeCard (Both)
- ✅ SeasonCard (Both)
- ✅ PlaylistCard (Both)
- ✅ CollectionCard (Both)

---

## Fase 3 — Detail, player y watch experience

### Content Detail

- ✅ ContentDetail (Both)
- ✅ ContentHeader (Both)
- ✅ ContentMetadata (Both)
- ✅ ContentDescription (Both)
- ✅ ContentTags (Both)
- ⚠️ ContentCast (Both)
- ⚠️ ContentCrew (Both)
- ⚠️ ContentGallery (Both)
- ⚠️ ContentTrailer (Both)
- ⚠️ ContentRecommendations (Both)
- ⚠️ ContentEpisodes (Both)
- ⚠️ ContentSeasons (Both)

### Video Player

- ✅ VideoPlayer (Both)
- ✅ VideoControls (Both)
- ⚠️ PlayButton (Both)
- ⚠️ PauseButton (Both)
- ⚠️ SeekBar (Both)
- ⚠️ VolumeControl (Web)
- ⚠️ PlaybackSpeedSelector (Both)
- ⚠️ SubtitleSelector (Both)
- ⚠️ AudioTrackSelector (Both)
- ⚠️ QualitySelector (Both)
- ⚠️ FullscreenButton (Web)
- ⚠️ PictureInPictureButton (Web)
- ⚠️ NextEpisodeOverlay (Both)
- ⚠️ SkipIntroButton (Both)
- ⚠️ SkipRecapButton (Both)

### Player Overlays

- ⚠️ PlayerOverlay (Both)
- ⚠️ PlayerTopBar (Both)
- ⚠️ PlayerBottomBar (Both)
- ⚠️ PlayerLoading (Both)
- ⚠️ PlayerError (Both)
- ⚠️ PlayerPreviewThumbnail (Web)
- ⚠️ PlayerProgressIndicator (Both)
- ⚠️ AutoplayCountdown (Both)

### Watch Experience

- ⚠️ ContinueWatchingCard (Both)
- ⚠️ UpNextOverlay (Both)
- ⚠️ EpisodeNavigation (Both)
- ⚠️ EpisodeSelector (Both)
- ⚠️ SeasonSelector (Both)
- ⚠️ WatchHistory (Both)

---

## Fase 4 — Cuenta, engagement y negocio

### User Account

- ⚠️ UserAvatar (Both)
- ⚠️ UserProfileCard (Both)
- ⚠️ ProfileSelector (Both)
- ⚠️ ProfileManager (Both)
- ⚠️ AccountSettings (Both)
- ⚠️ SubscriptionPlan (Both)
- ⚠️ BillingInformation (Both)
- ⚠️ DeviceManagement (Both)
- ⚠️ ParentalControls (Both)

### Engagement / Social

- ⚠️ LikeButton (Both)
- ⚠️ FavoriteButton (Both)
- ⚠️ WatchlistButton (Both)
- ⚠️ ShareButton (Both)
- ⚠️ CommentSection (Both)
- ⚠️ RatingStars (Both)
- ⚠️ ReviewCard (Both)
- ⚠️ ReactionBar (Both)

### Search & Discovery

- ⚠️ SearchInput (Both)
- ⚠️ SearchSuggestions (Both)
- ⚠️ SearchFilters (Both)
- ⚠️ SearchResultsGrid (Both)
- ⚠️ SearchEmptyState (Both)
- ⚠️ SearchHistory (Both)

### Notifications

- ⚠️ NotificationBell (Both)
- ⚠️ NotificationList (Both)
- ⚠️ NotificationItem (Both)
- ✅ ToastNotification (Both)
- ⚠️ SystemAlert (Both)

### Ads (AVOD)

- ⚠️ AdPlayer (Both)
- ⚠️ AdOverlay (Both)
- ⚠️ AdCountdown (Both)
- ⚠️ AdBanner (Web)
- ⚠️ AdCompanion (Web)

---

## Fase 5 — Estados y acceso

### Loading / UI States

- ⚠️ SkeletonCard (Both)
- ⚠️ SkeletonRow (Both)
- ⚠️ LoadingSpinner (Both)
- ⚠️ EmptyState (Both)
- ⚠️ ErrorState (Both)
- ⚠️ OfflineState (Both)

### Auth / Access

- ⚠️ LoginForm (Both)
- ⚠️ RegisterForm (Both)
- ⚠️ AuthModal (Web)
- ⚠️ ForgotPasswordForm (Both)
- ⚠️ AccessGate (Both)
- ⚠️ AgeVerificationGate (Both)
- ⚠️ GeoRestrictionGate (Both)
- ⚠️ SubscriptionGate (Both)

---

## Criterios de cierre por componente

- API consistente entre Web y Native (cuando aplique).
- Exportado en paquetes UI correspondientes.
- Tokens y estilos alineados con ui-core.
- Demo funcional en `apps/web/app/(public)/page.tsx`.
- Para pasar de ⚠️ a ✅: cubrir interacción real, estados vacíos/error/loading y test mínimo.
- Demo mínima en apps/web y apps/mobile.
- Build y tests en verde.

## Nota de implementación

- Web: priorizar CSS Grid en componentes de layout y rails.
- Native: priorizar Flex y composiciones con ScrollView/FlatList.

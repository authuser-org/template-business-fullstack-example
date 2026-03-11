// Tipos de usuario
export type { ActiveSession, RegisteredDevice } from './types/user/device';
export { UserRole } from './types/user/index';
export type {
	CreateUserDto,
	PaginatedResult,
	User,
	UserProfile,
	WatchlistItem,
	WatchProgress,
} from './types/user/index';
export type { ProfileParentalControl } from './types/user/parental';

// Tipos de contenido
export type {
	DiscoveryCategory,
	DiscoveryCategoryType,
} from './types/content/category';
export type { Collection, CollectionLayout } from './types/content/collection';
export type { Genre, GenreRef } from './types/content/genre';
export type {
	LocalizedProgramFields,
	LocalizedText,
	ProgramMetadata,
} from './types/content/metadata';
export type { ContentPage, HomePageResponseDto } from './types/content/page';
export type {
	Program,
	ProgramCard,
	ProgramQueryDto,
} from './types/content/program';
export type {
	RecommendationItem,
	RecommendationShelf,
} from './types/content/recommendation';
export type { ContentRow, ContentRowType } from './types/content/rows';
export type {
	SearchDocument,
	SearchFacet,
	SearchQueryDto,
} from './types/content/search';
export type { Episode, Season } from './types/content/season';
export type { Tag, TagRef } from './types/content/tag';
export type {
	AvailabilityWindow,
	ContentRating,
	ContentType,
	ProgramStatus,
} from './types/content/type';
export type {
	EditorialAuditLog,
	EditorialStatus,
} from './types/content/workflow';

// Tipos de assets
export type { AudioAsset, AudioCodec } from './types/assets/audio';
export type { CaptionAsset } from './types/assets/caption';
export type { ClipAsset } from './types/assets/clip';
export type { PosterAsset } from './types/assets/poster';
export type { SubtitleAsset, SubtitleFormat } from './types/assets/subtitle';
export type { ThumbnailAsset } from './types/assets/thumbnail';
export type { TrailerAsset } from './types/assets/trailer';
export type {
	VideoAsset,
	VideoCodec,
	VideoRendition,
} from './types/assets/video';

// Tipos de stream
export type { ChatMessage, SendChatMessageDto } from './types/stream/chat';
export type {
	DownloadEntitlement,
	DownloadItem,
	DownloadState,
	OfflineLicense,
} from './types/stream/download';
export type { DrmConfig, DrmSystem } from './types/stream/drm';
export type {
	DrmLicenseRequestDto,
	DrmLicenseToken,
} from './types/stream/license';
export type { LiveStream } from './types/stream/live';
export type { ManifestProtocol, StreamManifest } from './types/stream/manifest';
export type {
	PlaybackError,
	PlaybackHeartbeat,
	PlaybackSession,
	PlayerState,
} from './types/stream/playback';
export type {
	DynamicRange,
	StreamQualityProfile,
} from './types/stream/quality';
export type { PlaybackSessionDto, StreamSource } from './types/stream/source';

// Tipos de transcodificación
export type {
	CreateTranscodeJobDto,
	TranscodeEvent,
	TranscodeEventType,
} from './types/transcoding/event';
export type {
	TranscodeError,
	TranscodeInput,
	TranscodeJob,
	TranscodeOutput,
	TranscodeOutputRendition,
	TranscodeProgress,
	TranscodeStatus,
} from './types/transcoding/job';
export type {
	TranscodeAudioProfile,
	TranscodeContainer,
	TranscodeProfile,
	TranscodeVideoProfile,
} from './types/transcoding/profile';

// Tipos EPG
export type { EpgChannel } from './types/epg/channel';
export type { EpgQueryDto, EpgResponseDto } from './types/epg/epg';
export type { EpgSchedule } from './types/epg/schedule';
export type { EpgSlot } from './types/epg/slot';
export type { EpgChannelStream } from './types/epg/stream';

// Tipos de monetización
export type {
	AdTechPayload,
	CheckoutItem,
	MonetizationPolicy,
	MonetizationProfile,
} from './types/monetization';
export type {
	AdBreak,
	AdBreakPosition,
	AdDecision,
	AdTrackingEvent,
	AdTrackingEventType,
} from './types/monetization/avod/ad';
export type {
	BillingMethod,
	BillingProvider,
	Invoice,
	Promotion,
} from './types/monetization/billing';
export type { BillingPeriod, SvodPlan } from './types/monetization/svod/plan';
export type {
	SubscriptionStatus,
	UserSubscription,
} from './types/monetization/svod/subscription';
export type {
	TvodOffer,
	TvodPurchase,
} from './types/monetization/tvod/purchase';

// Tipos auxiliares de plataforma
export type {
	RequestEcho,
	VideoAdTrackResponse,
	VideoCreatePlaybackSessionResponse,
	VideoCreateTranscodingJobResponse,
	VideoDeleteResponse,
	VideoEntitlementCheckResponse,
	VideoEntitlementResponse,
	VideoEpgChannelResponse,
	VideoEpgResponse,
	VideoHealthResponse,
	VideoHomeResponse,
	VideoLocaleResolveResponse,
	VideoMonetizationProfileResponse,
	VideoNotificationSendResponse,
	VideoPlaybackHeartbeatResponse,
	VideoPlaybackSessionResponse,
	VideoProgramResponse,
	VideoStreamResponse,
	VideoTranscodingJobResponse,
	VideoUpdateDownloadResponse,
	VideoUpdateProfileLocaleResponse,
	VideoUpdateProgressResponse,
	VideoUpdateTranscodingJobResponse,
	VideoUserProfileResponse,
	VideoWatchProgressResponse,
} from './types/api/video-endpoints';

// Tipos auxiliares de plataforma
export type {
	ContractVersion,
	VersionedPayload,
} from './types/contract/version';
export type {
	AnalyticsEvent,
	AnalyticsEventType,
} from './types/entities/analytics/event';
export type {
	QoeRebufferMetric,
	QoeStartupMetric,
	QoeSummary,
} from './types/entities/analytics/qoe';
export type { DomainError, ErrorSeverity } from './types/errors/error';
export type { GeoDecision, GeoFenceRule } from './types/geolocation/geofence';
export type {
	LocaleCode,
	LocaleResolutionInput,
	LocalizationContext,
	LocalizedRichText,
	LocalizedStringMap,
	RequestLocaleContext,
	RequestLocaleHeaders,
	ResolvedLocale,
} from './types/i18n/localization';
export type { GeoLocation } from './types/location/location';
export type {
	NotificationChannel,
	UserNotification,
} from './types/notification/notification';
export type {
	ContentEntitlement,
	DeviceRestriction,
	EntitlementDecision,
	EntitlementSource,
	EntitlementWindow,
	GeoRestriction,
} from './types/rights/entitlement';

// Utilidades de formato
export { formatDate, formatPrice, truncate } from './utils/format';

// Utilidades de validación
export { isUUID, isValidEmail, isValidPassword } from './utils/validate';

// Mocks compartidos
export * from './mocks';

import type { EpgChannel } from '../types/epg/channel';
import type { EpgResponseDto } from '../types/epg/epg';
import type { EpgSchedule } from '../types/epg/schedule';
import type { EpgSlot } from '../types/epg/slot';

export const epgChannelMock: EpgChannel = {
  id: 'ch-101',
  number: '101',
  slug: 'sports-plus',
  name: 'Sports Plus',
  nameI18n: {
    'en-US': 'Sports Plus',
    'es-ES': 'Deportes Plus',
  },
  logoUrl: 'https://cdn.ott.local/channels/ch-101.png',
  language: 'en',
};

export const epgSlotMock: EpgSlot = {
  id: 'slot-1',
  channelId: 'ch-101',
  programId: 'program-live-1',
  title: 'Championship Finals',
  titleI18n: {
    'en-US': 'Championship Finals',
    'es-ES': 'Final del Campeonato',
  },
  startsAt: '2026-03-11T19:00:00.000Z',
  endsAt: '2026-03-11T21:00:00.000Z',
  isLive: true,
};

export const epgScheduleMock: EpgSchedule = {
  date: '2026-03-11',
  channels: [epgChannelMock],
  slots: [epgSlotMock],
};

export const epgResponseMock: EpgResponseDto = {
  schedules: [epgScheduleMock],
  generatedAt: '2026-03-11T10:00:00.000Z',
};

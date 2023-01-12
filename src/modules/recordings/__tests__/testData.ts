import { RecordingState } from '@/types/enums/RecordingState';
import { Recording } from '@/types/models/Recording';
import { RecordingSettings } from '@/types/models/RecordingSettings';
import { RecordingPlaybackMeta } from '@/types/models/RecordingMeta';
import { RecordingMetaStatus } from '@/types/enums/RecordingMetaStatus';

// eslint-disable-next-line import/prefer-default-export
export const recording: Recording = {
  id: '1644355515',
  state: RecordingState.OPERATIONAL,
  programmeId: 'macAssetId|OT012609_HD',
  start: 431552058,
  duration: 3600,
  channelDvbTriplet:
    'wydvb://dvbt/?frequency=610000000&modulation=QAM64&hp_code_rate=2/3&lp_code_rate=None&bandwidth=8&transmission_mode=8&guard_interval=1/32&hierarchy=None internal:*:*:wyplay.com_src=tv/dvb-t;wyplay.com_res=HD',
  errors: '',
};

export const recordingMeta: RecordingPlaybackMeta = {
  id: '1644355515',
  programmeId: 'macAssetId|OT012609_HD',
  scheduledRecordingId: '5',
  start: 1644355515,
  duration: 3600,
  size: 139700550,
  playInfo:
    'rwchunk3:///mnt/hdd/.system/timeshift/9888d673_e58d_4ea2_924f_68f1886ed325/%08d.ts?record_id=1&start_offs=0&end_offs=139700550 wyplay.com:*:video/mpeg:wyplay.com_src=pvr/local',
  status: RecordingMetaStatus.DONE,
  channelDvbTriplet: 'dvb://a9.3.4cb',
  profileId: 'profileId',
  slot: undefined,
};

export const scheduledRecordingMeta: RecordingPlaybackMeta = {
  id: '16443555152',
  programmeId: 'macAssetId|OT012609_HD',
  scheduledRecordingId: '51',
  start: 1645407000,
  duration: 3000,
  size: 0,
  playInfo: '',
  status: RecordingMetaStatus.SCHEDULED,
  channelDvbTriplet: 'dvb://a9.3.4cb',
  profileId: 'profileId',
  slot: undefined,
};

export const recordingSettings: RecordingSettings = {
  usedStorage: 8890,
  usedDiskspace: 100000,
  freeDiskspace: 5000,
};

export const show1Slot1 = {
  start: '2022-02-04T04:00:00Z',
  end: '2022-02-04T04:30:00Z',
  recordOptions: ['EPISODE', 'SERIES'],
  hasParentalRestriction: false,
  live: false,
  rating: { classification: '_PG', advisories: [] },
  channel: {
    id: 'SKY2',
    mySchedule: null,
    schedule: { subscriptions: [{ id: 'ENTERTAINMENT', title: 'Entertainment' }] },
  },
  programme: {
    __typename: 'Episode',
    id: 'mac_11415417',
    title: 'Judge Judy 51',
    synopsis:
      'With her outspoken style and hard-hitting decisiveness, Judge Judy single-handedly sorts out family disputes and misdemeanours, one case at a time.',
    asset: null,
    mySchedule: null,
    schedule: null,
    number: 51,
    show: {
      __typename: 'Show',
      id: 'mac_sh_324',
      title: 'Judge Judy',
      type: 'SERIES',
      primaryGenres: [{ title: 'Reality' }],
      synopsis:
        "One of the world's most well-known media personalities, the irrepressible Judge Judith Sheindlin continues to single-handedly sort out family disputes and misdemeanours. The People are real, the cases are real, the rulings are final!",
      allGenres: [{ title: 'Reality' }, { title: 'Law' }],
      heroLandingWide: {
        uri:
          'https://images.skyone.co.nz/media/images/stills/content/226242/862b6bfc976f70849b583120cfbe763a.jpg',
      },
      contentTileHorizontal: {
        uri:
          'https://images.skyone.co.nz/media/images/stills/content/226242/3d7d1bd60f4b5ada785c371a8311ecf6.jpg',
      },
      contentTileVertical: {
        uri:
          'https://images.skyone.co.nz/media/images/stills/content/226242/ea40ce7482d60b542e444371ed8c2214.jpg',
      },
    },
    season: { number: 24 },
  },
};

export const show1Slot2 = {
  start: '2022-02-21T04:00:00Z',
  end: '2022-02-21T04:30:00Z',
  recordOptions: ['EPISODE', 'SERIES'],
  hasParentalRestriction: false,
  live: false,
  rating: { classification: '_PG', advisories: [] },
  channel: {
    id: 'SKY2',
    mySchedule: null,
    schedule: { subscriptions: [{ id: 'ENTERTAINMENT', title: 'Entertainment' }] },
  },
  programme: {
    __typename: 'Episode',
    id: 'mac_11415417',
    title: 'Judge Judy 52',
    synopsis:
      'With her outspoken style and hard-hitting decisiveness, Judge Judy single-handedly sorts out family disputes and misdemeanours, one case at a time.',
    asset: null,
    mySchedule: null,
    schedule: null,
    number: 52,
    show: {
      __typename: 'Show',
      id: 'mac_sh_324',
      title: 'Judge Judy',
      type: 'SERIES',
      primaryGenres: [{ title: 'Reality' }],
      synopsis:
        "One of the world's most well-known media personalities, the irrepressible Judge Judith Sheindlin continues to single-handedly sort out family disputes and misdemeanours. The People are real, the cases are real, the rulings are final!",
      allGenres: [{ title: 'Reality' }, { title: 'Law' }],
      heroLandingWide: {
        uri:
          'https://images.skyone.co.nz/media/images/stills/content/226242/862b6bfc976f70849b583120cfbe763a.jpg',
      },
      contentTileHorizontal: {
        uri:
          'https://images.skyone.co.nz/media/images/stills/content/226242/3d7d1bd60f4b5ada785c371a8311ecf6.jpg',
      },
      contentTileVertical: {
        uri:
          'https://images.skyone.co.nz/media/images/stills/content/226242/ea40ce7482d60b542e444371ed8c2214.jpg',
      },
    },
    season: { number: 24 },
  },
};

export const show2Slot = {
  start: '2022-02-10T22:35:00Z',
  end: '2022-02-11T02:00:00Z',
  recordOptions: ['EPISODE', 'SERIES'],
  hasParentalRestriction: false,
  live: true,
  rating: { classification: '_G', advisories: [] },
  channel: {
    id: 'SPT2',
    mySchedule: null,
    schedule: { subscriptions: [{ id: 'SPORTS', title: 'Sports' }] },
  },
  programme: {
    __typename: 'Episode',
    id: 'mac_11508556',
    title: 'LIVE: Rio Open: Doubles Final',
    synopsis:
      "LIVE - ATP 500: Rio Open presented by Claro. Tune in for the Doubles Final as the world's top tennis players go head to head in Rio De Janeiro, Brazil.",
    asset: null,
    mySchedule: null,
    schedule: null,
    number: 44,
    show: {
      __typename: 'Show',
      id: 'mac_sh_131286',
      title: 'ATP Tour 500',
      type: 'SPORT',
      primaryGenres: [{ title: 'Tennis' }],
      synopsis:
        "Tune in and experience the power as the world’s top tennis players go head to head in the ATP 500 tournaments – the annual series of 13 tournaments, with 500 ranking points awarded for the events' champions.",
      allGenres: [{ title: 'Tennis' }],
      heroLandingWide: {
        uri:
          'https://images.skyone.co.nz/media/images/stills/content/1169114/655d8faa2fd9490f5695e4a81dfddfa1.jpg',
      },
      contentTileHorizontal: {
        uri:
          'https://images.skyone.co.nz/media/images/stills/content/1169114/33813a9f44cd47e7ae8b9ccee93af708.jpg',
      },
      contentTileVertical: {
        uri:
          'https://images.skyone.co.nz/media/images/stills/content/1169114/3b878ef88038dd8e3f6b3a255d9bd803.jpg',
      },
    },
    season: { number: 2022 },
  },
};
export const show3Slot = {
  start: '2022-02-08T22:35:00Z',
  end: '2022-02-09T02:00:00Z',
  recordOptions: ['EPISODE', 'SERIES'],
  hasParentalRestriction: false,
  live: true,
  rating: { classification: '_G', advisories: [] },
  channel: {
    id: 'SPT2',
    mySchedule: null,
    schedule: { subscriptions: [{ id: 'SPORTS', title: 'Sports' }] },
  },
  programme: {
    __typename: 'Episode',
    id: 'mac_10975627',
    title: 'You Say You Wanna Revolution',
    synopsis:
      'The Pawn Stars start a revolution when they check out an Annual Register from 1776 - including a printed copy of the Declaration of Independence. Will they declare their intention to buy it? S12 Ep47',
    asset: {
      id: 'macAssetId|OT081515_SD_mac_10975627',
      hasParentalRestriction: false,
    },
    mySchedule: {
      subscriptions: [
        {
          id: 'FREE_TO_AIR',
          title: 'Prime',
        },
      ],
    },
    schedule: {
      subscriptions: [
        {
          id: 'FREE_TO_AIR',
          title: 'Prime',
        },
      ],
    },
    image: {
      uri:
        'https://images.skyone.co.nz/media/images/stills/content/189053/1498727ae1e13498d0d830e1091b89fb.jpg',
    },
    number: 47,
    show: {
      __typename: 'Show',
      id: 'mac_sh_317',
      title: 'Pawn Stars',
      type: 'SERIES',
      primaryGenres: [
        {
          title: 'History',
        },
      ],
      synopsis:
        'Three generations of the Harrison family jointly run their pawn business on the outskirts of Las Vegas. The staff of the Gold & Silver Pawn Shop use their sharp eyes and skills to assess the values of items from the commonplace to the truly historic.',
      allGenres: [
        {
          title: 'History',
        },
        {
          title: 'Reality',
        },
        {
          title: 'Auction',
        },
      ],
      heroLandingWide: {
        uri:
          'https://images.skyone.co.nz/media/images/stills/content/47/5493cd4e52bacd6e012014e9ed56b718.jpg',
      },
      contentTileHorizontal: {
        uri:
          'https://images.skyone.co.nz/media/images/stills/content/47/8edd47d0d00604a20c6beeb665436cd4.jpg',
      },
      contentTileVertical: {
        uri:
          'https://images.skyone.co.nz/media/images/stills/content/47/5c845749a0b09949fefe18e3408f063f.jpg',
      },
    },
    season: {
      id: 'mac_s_42675',
      number: 12,
    },
  },
};

export const movieSlot = {
  start: '2022-03-21T23:50:00Z',
  end: '2022-03-22T01:40:00Z',
  recordOptions: ['EPISODE'],
  hasParentalRestriction: false,
  live: false,
  rating: { classification: '_M', advisories: ['V', 'L', 'C'] },
  channel: {
    id: 'MOVI',
    mySchedule: null,
    schedule: { subscriptions: [{ id: 'MOVIES', title: 'Movies' }] },
  },
  programme: {
    __typename: 'Movie',
    id: 'mac_11443866',
    title: 'The Courier',
    synopsis:
      'The true story of a British businessman forming an unlikely partnership with a Soviet officer hoping to prevent a nuclear confrontation, the two men work together to provide the crucial intelligence used to defuse the Cuban Missile Crisis.',
    heroLandingWide: {
      uri:
        'https://images.skyone.co.nz/media/images/stills/content/654841/0f6b188415c6961d435996a67470fd81.jpg',
    },
    contentTileHorizontal: {
      uri:
        'https://images.skyone.co.nz/media/images/stills/content/654841/c1c66858a9c8954ee1cdee32611b1098.jpg',
    },
    contentTileVertical: {
      uri:
        'https://images.skyone.co.nz/media/images/stills/content/654841/f62b4fb73e92053760768647eb6d7426.jpg',
    },
    asset: { id: 'macAssetId|OT144818_SD_mac_11443866', hasParentalRestriction: false },
    mySchedule: null,
    schedule: { subscriptions: [{ id: 'MOVIES', title: 'Movies' }] },
    primaryGenres: [{ title: 'Historical Drama' }],
    allGenres: [{ title: 'Historical Drama' }, { title: 'Thriller' }],
  },
};

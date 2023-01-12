import { BrandType } from '@/types/enums/BrandType';
import dayjs from 'dayjs';
import { ShowType } from '@/types/graph-ql';
import {
  hasPlayableVod,
  shouldDisplaySlotDetail,
  getSynopsis,
  getImage,
  getPlayButtonSetting,
  getRecordButtonSetting,
  getWatchlistButtonSetting,
} from '../Hero';

test('check whether the brand has playable vod or not', () => {
  // Given
  const show: any = {
    __typename: BrandType.Show,
    type: ShowType.Series,
    defaultEpisode: { asset: { id: 'macAssetId|OT146607_HD_mac_11440440' } },
    seasons: [{ id: 'test' }],
    slots: [{ id: 'test' }],
  };

  const movie: any = {
    __typename: BrandType.Movie,
    asset: { id: 'test' },
    slots: [{ id: 'test' }],
  };

  // When it's show and with playable vod
  let result = hasPlayableVod(show);
  // Then
  expect(result).toBeTruthy();

  // When it's show and without playable vod
  result = hasPlayableVod({ ...show, defaultEpisode: null, seasons: [] });
  // Then
  expect(result).toBeFalsy();

  // When it's movie and with playable vod
  result = hasPlayableVod(movie);
  // Then
  expect(result).toBeTruthy();

  // When it's movie and without playable vod
  result = hasPlayableVod({ ...movie, asset: null });
  // Then
  expect(result).toBeFalsy();
});

test('should display show / movie availability', () => {
  const show: any = {
    __typename: BrandType.Show,
    type: ShowType.Series,
    defaultEpisode: { asset: { id: 'macAssetId|OT146607_HD_mac_11440440' } },
    seasons: [{ id: 'test' }],
    slots: [{ id: 'test' }],
  };

  let isShowing = shouldDisplaySlotDetail(show);
  expect(isShowing).toBeFalsy();

  isShowing = shouldDisplaySlotDetail({ ...show, defaultEpisode: { asset: null }, seasons: [] });
  expect(isShowing).toBeTruthy();

  isShowing = shouldDisplaySlotDetail({ ...show, slots: [] });
  expect(isShowing).toBeFalsy();

  isShowing = shouldDisplaySlotDetail({ ...show, type: ShowType.Sport });
  expect(isShowing).toBeTruthy();

  isShowing = shouldDisplaySlotDetail({ ...show, slots: [], type: ShowType.Sport });
  expect(isShowing).toBeFalsy();

  const movie: any = {
    __typename: BrandType.Movie,
    asset: { id: 'test' },
    slots: [{ id: 'test' }],
  };

  isShowing = shouldDisplaySlotDetail(movie);
  expect(isShowing).toBeFalsy();

  movie.asset = null;
  isShowing = shouldDisplaySlotDetail(movie);
  expect(isShowing).toBeTruthy();

  movie.slots = [];
  isShowing = shouldDisplaySlotDetail(movie);
  expect(isShowing).toBeFalsy();
});

test('get synopsis for show hero depends on sport type', () => {
  const show: any = {
    __typename: BrandType.Show,
    synopsis: 'show_synopsis',
    type: ShowType.Series,
    slots: [
      {
        channel: { id: 'channel1', title: 'SoHo' },
        start: '2021-05-13T03:25:00Z',
        end: '2021-05-13T04:15:00Z',
        programme: {
          synopsis: 'slot_synopsis',
        },
      },
    ],
  };

  let synopsis = getSynopsis(show);
  expect(synopsis).toBe('show_synopsis');

  show.type = ShowType.Sport;
  synopsis = getSynopsis(show);
  expect(synopsis).toBe('slot_synopsis');

  // when the sports show slot synopsis is empty.
  show.slots[0].programme.synopsis = '';
  synopsis = getSynopsis(show);
  expect(synopsis).toBe('show_synopsis');

  const movie: any = {
    __typename: BrandType.Movie,
    synopsis: 'movie_synopsis',
    slots: [
      {
        channel: { id: 'channel1', title: 'SoHo' },
        start: '2021-05-13T03:25:00Z',
        end: '2021-05-13T04:15:00Z',
        programme: {
          synopsis: 'slot_synopsis',
        },
      },
    ],
  };

  synopsis = getSynopsis(movie);
  expect(synopsis).toBe('movie_synopsis');
});

test('get hero image', () => {
  const show = {
    __typename: BrandType.Show,
    defaultEpisode: {
      id: 'skylarkEpisodeUid|epis_fd3e81805c4145cb8adf74f523935eb',
      asset: {
        id: 'macAssetId|OT132744_HD_mac_11419764',
      },
    },
    slots: [],
  };
  const brandImage = 'brand_image_url';
  // when there is no available slots
  const image = getImage(show as any, brandImage);
  // then
  expect(image).toEqual(brandImage);
});

test('get Hero play button settings', () => {
  const now = dayjs();
  const show = {
    __typename: BrandType.Show,
    defaultEpisode: {
      id: 'skylarkEpisodeUid|epis_fd3e81805c4145cb8adf74f523935eb',
      asset: {
        id: 'macAssetId|OT132744_HD_mac_11419764',
      },
    },
    seasons: [{ id: 'seas_123214' }],
    slots: [],
  };
  const movie = {
    __typename: BrandType.Movie,
    asset: {
      id: 'macAssetId|OT132744_HD_mac_11419764',
    },
    slots: [],
  };
  const liveSlot = {
    channel: { id: '1' },
    start: now.subtract(1, 'hour'),
    end: now.add(2, 'hour'),
  };
  const upcomingSlot = {
    channel: { id: '1' },
    start: now.add(1, 'hour'),
    end: now.add(2, 'hour'),
  };
  // when the show has only vod content
  let playButtonSetting = getPlayButtonSetting(show as any);
  // then
  expect(playButtonSetting).toEqual({
    isVod: true,
    visible: true,
    hasTvod: false,
    hasPpv: false,
    videoContent: show.defaultEpisode,
  });

  // when the show has no vod content but live slot
  const liveShow = {
    ...show,
    defaultEpisode: null,
    seasons: [],
    slots: [liveSlot],
  };
  playButtonSetting = getPlayButtonSetting(liveShow as any);
  // then
  expect(playButtonSetting).toEqual({
    isVod: false,
    visible: true,
    hasTvod: false,
    hasPpv: false,
    videoContent: liveSlot,
  });

  // when the show has no vod content but upcoming live slot
  const upcomingShow = {
    ...show,
    defaultEpisode: null,
    seasons: [],
    hasTvod: false,
    hasPpv: false,
    slots: [upcomingSlot],
  };
  playButtonSetting = getPlayButtonSetting(upcomingShow as any);
  // then
  expect(playButtonSetting).toEqual({
    isVod: false,
    visible: false,
    hasTvod: false,
    hasPpv: false,
  });

  // when the show has both vod content and live slot
  const vodAndLiveShow = {
    ...show,
    slots: [liveSlot],
  };
  playButtonSetting = getPlayButtonSetting(vodAndLiveShow as any);
  // then
  expect(playButtonSetting).toEqual({
    isVod: true,
    visible: true,
    hasTvod: false,
    hasPpv: false,
    videoContent: vodAndLiveShow.defaultEpisode,
  });

  // when the sport show has only vod content
  const vodSportShow = {
    ...show,
    type: ShowType.Sport,
  };
  playButtonSetting = getPlayButtonSetting(vodSportShow as any);
  // then
  expect(playButtonSetting).toEqual({
    isVod: false,
    visible: false,
    hasTvod: false,
    hasPpv: false,
  });

  // when the sport show has only live slot
  const liveSportShow = {
    ...show,
    type: ShowType.Sport,
    defaultEpisode: null,
    seasons: [],
    slots: [liveSlot],
  };
  playButtonSetting = getPlayButtonSetting(liveSportShow as any);
  // then
  expect(playButtonSetting).toEqual({
    isVod: false,
    visible: true,
    hasTvod: false,
    hasPpv: false,
    videoContent: liveSlot,
  });

  // when the sport show has upcoming slot
  const upcomingSportShow = {
    ...show,
    type: ShowType.Sport,
    slots: [upcomingSlot],
  };
  playButtonSetting = getPlayButtonSetting(upcomingSportShow as any);
  // then
  expect(playButtonSetting).toEqual({
    isVod: false,
    visible: false,
    hasTvod: false,
    hasPpv: false,
  });

  // when the sport show has both vod content and live slot
  const vodAndLiveSportShow = {
    ...show,
    type: ShowType.Sport,
    slots: [liveSlot],
  };
  playButtonSetting = getPlayButtonSetting(vodAndLiveSportShow as any);
  // then
  expect(playButtonSetting).toEqual({
    isVod: false,
    visible: true,
    hasTvod: false,
    hasPpv: false,
    videoContent: liveSlot,
  });

  // when the movie has only vod content
  playButtonSetting = getPlayButtonSetting(movie as any);
  // then
  expect(playButtonSetting).toEqual({
    isVod: true,
    visible: true,
    hasTvod: false,
    hasPpv: false,
    videoContent: movie.asset,
  });

  // when the movie has only vod content and tvod offer
  playButtonSetting = getPlayButtonSetting({
    ...movie,
    schedule: {
      tvodOffer: {
        __typename: 'CustomerTvodOffer',
        id: 'qqqqqqqq',
        price: {
          amount: '7.99',
        },
        startingPeriod: 'P10D',
        rentalPeriod: 'P30D',
        expressRelease: false,
        purchase: null,
        content: '',
        schedule: '',
      },
    },
  } as any);
  // then
  expect(playButtonSetting).toEqual({
    isVod: true,
    visible: true,
    hasTvod: true,
    hasPpv: false,
    videoContent: movie.asset,
  });

  // when the show has ppv offer
  playButtonSetting = getPlayButtonSetting({
    ...show,
    slots: [
      {
        payPerViewOffer: {
          __typename: 'CustomerPayPerViewOffer',
          id: '7564856',
          price: { amount: '12.99' },
          purchases: null,
          slots: null,
        },
      },
    ],
  } as any);

  // then
  expect(playButtonSetting).toEqual({
    isVod: true,
    visible: true,
    hasTvod: false,
    hasPpv: true,
    videoContent: show.defaultEpisode,
  });

  // when the show has ppv offer but it has been purchased already
  playButtonSetting = getPlayButtonSetting(
    {
      ...show,
      slots: [
        {
          payPerViewOffer: {
            purchases: [
              {
                deviceId: 'moms iPhone',
              },
            ],
            slots: null,
          },
        },
      ],
    } as any,
    'moms iPhone',
  );

  // then
  expect(playButtonSetting).toEqual({
    isVod: true,
    visible: true,
    hasTvod: false,
    hasPpv: false,
    videoContent: show.defaultEpisode,
  });

  // when the movie has no vod content but live slot
  const liveMovie = {
    ...movie,
    asset: null,
    slots: [liveSlot],
  };
  playButtonSetting = getPlayButtonSetting(liveMovie as any);
  // then
  expect(playButtonSetting).toEqual({
    isVod: false,
    visible: true,
    hasTvod: false,
    hasPpv: false,
    videoContent: liveSlot,
  });

  // when the movie has no vod content but upcoming live slot
  const upcomingMovie = {
    ...movie,
    asset: null,
    slots: [upcomingSlot],
  };
  playButtonSetting = getPlayButtonSetting(upcomingMovie as any);
  // then
  expect(playButtonSetting).toEqual({
    isVod: false,
    visible: false,
    hasTvod: false,
    hasPpv: false,
  });
});

test('get Hero record button settings', () => {
  const now = dayjs();
  const show = {
    __typename: BrandType.Show,
    defaultEpisode: {
      id: 'skylarkEpisodeUid|epis_fd3e81805c4145cb8adf74f523935eb',
      asset: {
        id: 'macAssetId|OT132744_HD_mac_11419764',
      },
    },
    seasons: [{ id: 'seas_123214' }],
    slots: [],
  };
  const liveSlot = {
    channel: { id: '1' },
    start: now.subtract(1, 'hour'),
    end: now.add(2, 'hour'),
  };
  const upcomingSlot = {
    channel: { id: '1' },
    start: now.add(1, 'hour'),
    end: now.add(2, 'hour'),
  };
  // when the brand has only vod content
  let buttonsSetting = getRecordButtonSetting(show as any);
  // then
  expect(buttonsSetting).toEqual({
    visible: false,
  });

  // when the brand has no vod content but live slot
  const liveShow = {
    ...show,
    defaultEpisode: null,
    seasons: [],
    slots: [liveSlot],
  };
  buttonsSetting = getRecordButtonSetting(liveShow as any);
  // then
  expect(buttonsSetting).toEqual({
    visible: true,
  });

  // when the brand has no vod content but upcoming live slot
  const upcomingShow = {
    ...show,
    defaultEpisode: null,
    seasons: [],
    slots: [upcomingSlot],
  };
  buttonsSetting = getRecordButtonSetting(upcomingShow as any);
  // then
  expect(buttonsSetting).toEqual({
    visible: true,
  });

  // when the brand has both vod content and live slot
  const vodAndLiveShow = {
    ...show,
    slots: [liveSlot],
  };
  buttonsSetting = getRecordButtonSetting(vodAndLiveShow as any);
  // then
  expect(buttonsSetting).toEqual({
    visible: false,
  });
});

test('get Hero watchlist button settings', () => {
  // when
  // currently it always return true
  const buttonsSetting = getWatchlistButtonSetting();
  // then
  expect(buttonsSetting).toEqual({
    visible: true,
  });
});

import { mergeDeepRight } from 'ramda';
import { ShowType } from '@/types/graph-ql';
import { AnalyticsContentType } from '@/types/enums/AnalyticsContentType';

import { BrandType } from '@/types/enums';
import {
  getContentTypeByBrand,
  getContentTypeBySlot,
  getVodSeasonNumber,
  getVodEpisodeNumber,
  getSlotSeasonNumber,
  getSlotEpisodeNumber,
  getYouboraSlotTitle,
  getYouboraSlotProgram,
  getYouboraSlotChannel,
  getYouboraSlotGenres,
  getYouboraVodTitle,
  getYouboraVodProgram,
  getYouboraControllingChannel,
  getYouboraBrandGenres,
  getSegmentSlotTitle,
  getSegmentSlotTitleWithBrand,
  getSegmentSlotChannel,
  getSegmentSlotGenres,
  getSegmentVodTitle,
  getSegmentControllingChannel,
  getSegmentBrandGenres,
} from '../Analytics';

test('get content type by brand for analytics', () => {
  // Given
  const mockShow: any = {
    __typename: BrandType.Show,
    type: ShowType.Series,
    seasons: [{ id: 'test' }],
    slots: [{ id: 'test' }],
  };
  // When it is a series show
  let type = getContentTypeByBrand(mockShow);
  // Then
  expect(type).toEqual(AnalyticsContentType.SHOW);

  // when it is a sport show
  type = getContentTypeByBrand({ ...mockShow, type: ShowType.Sport });
  // Then
  expect(type).toEqual(AnalyticsContentType.SPORT);

  // when it is a movie
  type = getContentTypeByBrand({ ...mockShow, __typename: BrandType.Movie });
  // Then
  expect(type).toEqual(AnalyticsContentType.MOVIE);

  // when the brand is null
  type = getContentTypeByBrand(null);
  expect(type).toEqual(undefined);
});

test('get content type by slot for analytics', () => {
  // Given
  const mockSlot: any = {
    programme: {
      __typename: 'Episode',
      season: {
        number: 1,
      },
      show: {
        __typename: BrandType.Show,
        type: ShowType.Sport,
      },
    },
  };
  // When it belongs to a sport show
  let type = getContentTypeBySlot(mockSlot);
  // Then
  expect(type).toEqual(AnalyticsContentType.SPORT);

  // when it belongs to a series show
  const seriesSlot: any = mergeDeepRight(mockSlot, {
    programme: { show: { type: ShowType.Series } },
  });
  type = getContentTypeBySlot(seriesSlot);
  // Then
  expect(type).toEqual(AnalyticsContentType.SHOW);

  // when it belongs to a movie
  const movieSlot: any = mergeDeepRight(mockSlot, {
    programme: { __typename: AnalyticsContentType.MOVIE },
  });
  type = getContentTypeBySlot(movieSlot);
  // Then
  expect(type).toEqual(AnalyticsContentType.MOVIE);

  // when typename is missing
  const noTypeSlot: any = mergeDeepRight(mockSlot, {
    programme: { __typename: undefined },
  });
  type = getContentTypeBySlot(noTypeSlot);
  // Then
  expect(type).toEqual(undefined);

  // when the slot is null
  type = getContentTypeBySlot(null);
  expect(type).toEqual(undefined);
});

test('get the slot season/episode number for vod', () => {
  // Given
  const mockShowSeason: any = {
    number: 2,
  };
  const mockShowEpisode: any = {
    number: 1,
  };

  // When the slot is a non-sport show
  let seasonNumber = getVodSeasonNumber(mockShowSeason);
  const episodeNumber = getVodEpisodeNumber(mockShowEpisode);
  // Then
  expect(seasonNumber).toBe(2);
  expect(episodeNumber).toBe(1);

  // When the slot is a sport show
  seasonNumber = getVodSeasonNumber(mockShowSeason);
  // Then
  expect(seasonNumber).toBe(2);

  // When the slot is a movie
  seasonNumber = getVodSeasonNumber(undefined);
  // Then
  expect(seasonNumber).toBe(undefined);
});

test('get the slot season/episode number for slot', () => {
  // Given
  const mockShowSlot: any = {
    programme: {
      __typename: 'Episode',
      number: 1,
      season: {
        number: 2,
      },
    },
  };
  const mockMovieSlot: any = {
    programme: {
      __typename: 'Movie',
    },
  };

  // When the slot is a non-sport show
  let seasonNumber = getSlotSeasonNumber(mockShowSlot);
  const episodeNumber = getSlotEpisodeNumber(mockShowSlot);
  // Then
  expect(seasonNumber).toBe(2);
  expect(episodeNumber).toBe(1);

  // When the slot is a sport show
  seasonNumber = getSlotSeasonNumber(mockShowSlot);
  // Then
  expect(seasonNumber).toBe(2);

  // When the slot is a movie
  seasonNumber = getSlotSeasonNumber(mockMovieSlot);
  // Then
  expect(seasonNumber).toBe(undefined);
});

test('get youbora content.title for slot', () => {
  // Given
  const mockEpisodeSlot: any = {
    programme: {
      title: 'episodeTitle',
      __typename: 'Episode',
      number: 2,
      season: {
        number: 1,
      },
      show: {
        title: 'showTitle',
        __typename: BrandType.Show,
      },
    },
  };
  const mockMovieSlot: any = {
    programme: {
      title: 'movieTitle',
      __typename: 'Movie',
    },
  };
  // When the slot is an episode
  let result = getYouboraSlotTitle(mockEpisodeSlot);
  // Then
  expect(result).toBe('showTitle');

  // When the slot is a sport show's episode
  const mockSportSlot: any = mergeDeepRight(mockEpisodeSlot, {
    programme: { show: { type: ShowType.Sport } },
  });
  result = getYouboraSlotTitle(mockSportSlot);
  // Then
  expect(result).toBe('showTitle');

  // When the slot is a movie
  result = getYouboraSlotTitle(mockMovieSlot);
  // Then
  expect(result).toBe('movieTitle');
});

test('get youbora content.program for slot', () => {
  // Given
  const mockEpisodeSlot: any = {
    programme: {
      title: 'episodeTitle',
      __typename: 'Episode',
      number: 2,
      season: {
        number: 1,
      },
      show: {
        title: 'showTitle',
        __typename: BrandType.Show,
      },
    },
  };
  const mockMovieSlot: any = {
    programme: {
      title: 'movieTitle',
      __typename: 'Movie',
    },
  };
  // When the slot is an episode
  let result = getYouboraSlotProgram(mockEpisodeSlot);
  // Then
  expect(result).toBe('showTitle S1 E2');

  // When the slot is a sport show's episode
  const mockSportSlot: any = mergeDeepRight(mockEpisodeSlot, {
    programme: { show: { type: ShowType.Sport } },
  });
  result = getYouboraSlotProgram(mockSportSlot);
  // Then
  expect(result).toBe('episodeTitle');

  // When the slot is a movie
  result = getYouboraSlotProgram(mockMovieSlot);
  // Then
  expect(result).toBe('movieTitle');
});

test("get youbora/segment slot's channel", () => {
  // Given
  const mockChannel: any = {
    id: 'channelId',
    title: 'SoHo',
  };
  // When
  const youboraRes = getYouboraSlotChannel(mockChannel);
  // Then
  expect(youboraRes).toBe(mockChannel.title);

  // When
  const segmentRes = getSegmentSlotChannel(mockChannel);
  // Then
  expect(segmentRes).toEqual([mockChannel.title]);
});

test("get youbora/segment slot's genres", () => {
  // Given
  const mockShowSlot: any = {
    programme: {
      title: 'episodeTitle',
      __typename: 'Episode',
      number: 2,
      season: {
        number: 1,
      },
      show: {
        title: 'showTitle',
        __typename: BrandType.Show,
        primaryGenres: [{ title: 'Game Show' }],
        allGenres: [{ title: 'Game Show' }, { title: 'Drama' }],
      },
    },
  };
  const mockMovieSlot: any = {
    programme: {
      title: 'movieTitle',
      __typename: 'Movie',
      primaryGenres: [{ title: 'Game Movie' }],
      allGenres: [{ title: 'Game Movie' }, { title: 'Sport' }],
    },
  };
  // When it's a show slot
  let youboraRes = getYouboraSlotGenres(mockShowSlot);
  let segmentRes = getSegmentSlotGenres(mockShowSlot);
  // Then
  expect(youboraRes).toBe('Game Show,Drama');
  expect(segmentRes).toEqual(['Game Show', 'Drama']);

  // When it's a show slot and without allGenres
  const mockShowSlotWithoutAllGenres: any = mergeDeepRight(mockShowSlot, {
    programme: { show: { allGenres: undefined } },
  });
  youboraRes = getYouboraSlotGenres(mockShowSlotWithoutAllGenres);
  segmentRes = getSegmentSlotGenres(mockShowSlotWithoutAllGenres);
  // Then
  expect(youboraRes).toBe('Game Show');
  expect(segmentRes).toEqual(['Game Show']);

  // When it's a movie slot
  youboraRes = getYouboraSlotGenres(mockMovieSlot);
  segmentRes = getSegmentSlotGenres(mockMovieSlot);
  // Then
  expect(youboraRes).toBe('Game Movie,Sport');
  expect(segmentRes).toEqual(['Game Movie', 'Sport']);

  // When it's a movie slot and without allGenres
  const mockMovieSlotWithoutAllGenres: any = mergeDeepRight(mockMovieSlot, {
    programme: { allGenres: undefined },
  });
  youboraRes = getYouboraSlotGenres(mockMovieSlotWithoutAllGenres);
  segmentRes = getSegmentSlotGenres(mockMovieSlotWithoutAllGenres);
  // Then
  expect(youboraRes).toBe('Game Movie');
  expect(segmentRes).toEqual(['Game Movie']);
});

test('get segement title for slot', () => {
  // Given
  const mockEpisodeSlot: any = {
    programme: {
      title: 'episodeTitle',
      __typename: 'Episode',
      number: 2,
      season: {
        number: 1,
      },
      show: {
        title: 'showTitle',
        __typename: BrandType.Show,
      },
    },
  };
  const mockMovieSlot: any = {
    programme: {
      title: 'movieTitle',
      __typename: 'Movie',
    },
  };
  // When the slot is an episode
  let result = getSegmentSlotTitle(mockEpisodeSlot);
  // Then
  expect(result).toBe('showTitle');

  // When the slot is a sport show's episode
  const mockSportSlot: any = mergeDeepRight(mockEpisodeSlot, {
    programme: { show: { type: ShowType.Sport } },
  });
  result = getSegmentSlotTitle(mockSportSlot);
  // Then
  expect(result).toBe('episodeTitle');

  // When the slot is a movie
  result = getSegmentSlotTitle(mockMovieSlot);
  // Then
  expect(result).toBe('movieTitle');
});

test('get segement title for slot without show info', () => {
  // Given
  const mockEpisodeSlot: any = {
    programme: {
      title: 'episodeTitle',
      __typename: 'Episode',
      number: 2,
      season: {
        number: 1,
      },
    },
  };
  const showTitle = 'showTitle';
  // When the slot is an episode
  let result = getSegmentSlotTitleWithBrand(mockEpisodeSlot, false, showTitle);
  // Then
  expect(result).toBe(showTitle);

  // When the slot is a sport show's episode
  result = getSegmentSlotTitleWithBrand(mockEpisodeSlot, true, showTitle);
  // Then
  expect(result).toBe('episodeTitle');
});

test('get youbora content.title for vod', () => {
  // Given
  const mockBrand: any = {
    title: 'brandTitle',
    __typename: BrandType.Show,
  };
  // When the brand is a non-sport show
  let result = getYouboraVodTitle(mockBrand);
  // Then
  expect(result).toBe('brandTitle');

  // When the brand is a sport show
  result = getYouboraVodTitle({ ...mockBrand, type: ShowType.Sport });
  // Then
  expect(result).toBe('brandTitle');

  // When the brand is a movie
  result = getYouboraVodTitle({ ...mockBrand, __typename: BrandType.Movie });
  // Then
  expect(result).toBe('brandTitle');
});

test('get youbora content.program for vod', () => {
  // Given
  const mockMovie: any = {
    __typename: BrandType.Movie,
    title: 'MovieTitle',
  };
  const mockShow: any = {
    __typename: BrandType.Show,
    type: ShowType.Series,
    title: 'ShowTitle',
  };

  const mockSportShow: any = {
    __typename: BrandType.Show,
    type: ShowType.Sport,
    title: 'SportTile',
  };

  const mockEpisode: any = {
    number: 1,
    season: { number: 1 },
    title: 'EpisodeTitle',
  };
  // When the brand is a movie
  let result = getYouboraVodProgram(mockMovie);
  // Then
  expect(result).toEqual('MovieTitle');

  // When the brand is a non-sport show
  result = getYouboraVodProgram(mockShow, mockEpisode);
  // Then
  expect(result).toEqual('ShowTitle S1 E1');

  // When the brand is a sport show
  result = getYouboraVodProgram(mockSportShow, mockEpisode);
  // Then
  expect(result).toEqual('EpisodeTitle');
});

test('get segement title for vod', () => {
  // Given
  const mockMovie: any = {
    __typename: BrandType.Movie,
    title: 'MovieTitle',
  };
  const mockShow: any = {
    __typename: BrandType.Show,
    type: ShowType.Series,
    title: 'ShowTitle',
  };

  const mockSportShow: any = {
    __typename: BrandType.Show,
    type: ShowType.Sport,
    title: 'SportTile',
  };

  const mockEpisode: any = {
    number: 1,
    season: { number: 1 },
    title: 'EpisodeTitle',
  };
  // When the brand is a movie
  let result = getSegmentVodTitle(mockMovie);
  // Then
  expect(result).toEqual('MovieTitle');

  // When the brand is a non-sport show
  result = getSegmentVodTitle(mockShow, mockEpisode);
  // Then
  expect(result).toEqual('ShowTitle');

  // When the brand is a sport show
  result = getSegmentVodTitle(mockSportShow, mockEpisode);
  // Then
  expect(result).toEqual('EpisodeTitle');
});

test("get youbora/segment vod's channel", () => {
  // Given
  const mockBrand: any = {
    id: 'brandId',
    brands: [
      { id: 'brand1', title: 'Prime' },
      { id: 'brand2', title: 'SoHo' },
    ],
  };
  // When the brands are all valid
  let youboraRes = getYouboraControllingChannel(mockBrand);
  let segmentRes = getSegmentControllingChannel(mockBrand);
  // Then
  expect(youboraRes).toBe('Prime,SoHo');
  expect(segmentRes).toEqual(['Prime', 'SoHo']);

  // When the brands are all invalid
  const mockBrandWithInvalidBrands: any = mergeDeepRight(mockBrand, {
    brands: [
      { id: 'brand1', title: 'untitled' },
      { id: 'brand2', title: 'untitled' },
    ],
  });
  youboraRes = getYouboraControllingChannel(mockBrandWithInvalidBrands);
  segmentRes = getSegmentControllingChannel(mockBrandWithInvalidBrands);
  // Then
  expect(youboraRes).toBe(undefined);
  expect(segmentRes).toEqual(undefined);
});

test("get youbora/segment vod's genres", () => {
  // Given
  const mockShow: any = {
    title: 'showTitle',
    __typename: BrandType.Show,
    primaryGenres: [{ title: 'Game Show' }],
    allGenres: [{ title: 'Game Show' }, { title: 'Drama' }],
  };
  const mockMovie: any = {
    title: 'movieTitle',
    __typename: 'Movie',
    primaryGenres: [{ title: 'Game Movie' }],
    allGenres: [{ title: 'Game Movie' }, { title: 'Sport' }],
  };
  // When it's a show slot
  let youboraRes = getYouboraBrandGenres(mockShow);
  let segmentRes = getSegmentBrandGenres(mockShow);
  // Then
  expect(youboraRes).toBe('Game Show,Drama');
  expect(segmentRes).toEqual(['Game Show', 'Drama']);

  // When it's a show slot and without allGenres
  const mockShowSlotWithoutAllGenres: any = mergeDeepRight(mockShow, {
    allGenres: undefined,
  });
  youboraRes = getYouboraBrandGenres(mockShowSlotWithoutAllGenres);
  segmentRes = getSegmentBrandGenres(mockShowSlotWithoutAllGenres);
  // Then
  expect(youboraRes).toBe('Game Show');
  expect(segmentRes).toEqual(['Game Show']);

  // When it's a movie slot
  youboraRes = getYouboraBrandGenres(mockMovie);
  segmentRes = getSegmentBrandGenres(mockMovie);
  // Then
  expect(youboraRes).toBe('Game Movie,Sport');
  expect(segmentRes).toEqual(['Game Movie', 'Sport']);

  // When it's a movie slot and without allGenres
  const mockMovieSlotWithoutAllGenres: any = mergeDeepRight(mockMovie, {
    allGenres: undefined,
  });
  youboraRes = getYouboraBrandGenres(mockMovieSlotWithoutAllGenres);
  segmentRes = getSegmentBrandGenres(mockMovieSlotWithoutAllGenres);
  // Then
  expect(youboraRes).toBe('Game Movie');
  expect(segmentRes).toEqual(['Game Movie']);
});

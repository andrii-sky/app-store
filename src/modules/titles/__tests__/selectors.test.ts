import { getBrand, getShow, getSelectedSeason, getShowEpisode, showHighlights } from '../selectors';

import { mockShowResponse, mockMovieResponse } from './testData';

test('get title by Id', () => {
  const brandId = 'bran_ad6137678fff49beb1ff8f00103be9e7';
  // Given
  const mockState = {
    titles: {
      brandById: {
        data: {
          [brandId]: mockShowResponse.show,
        },
      },
    },
  };

  // when
  const data = getBrand(mockState)(brandId);
  // Then
  expect(data).toEqual(mockShowResponse.show);

  // when
  const data1 = getBrand(mockState)('no_id');
  // Then
  expect(data1).toBeUndefined();
});

test('get the show from brand', () => {
  const brandId = 'bran_ad6137678fff49beb1ff8f00103be9e7';
  const episodeId = 'epis_9898e5793b2e4b16b3f059901c08920b';

  // Given
  const mockState = {
    titles: {
      brandById: {
        data: {
          [brandId]: mockShowResponse.show,
          [episodeId]: mockMovieResponse.movie,
        },
      },
    },
  };

  // when
  const show = getShow(mockState)(brandId);
  // Then
  expect(show).toBe(mockShowResponse.show);
});

test('get the episode from brand', () => {
  const brandId = 'bran_ad6137678fff49beb1ff8f00103be9e7';
  const selectedEpisode = mockShowResponse.show.seasons[1].episodes[0];
  const episodeId = selectedEpisode.id;

  // Given
  const mockState = {
    titles: {
      brandById: {
        data: {
          [brandId]: mockShowResponse.show,
        },
      },
    },
  };

  // when
  const data = getShowEpisode(mockState)(brandId, episodeId);
  // Then
  expect(data).toBe(selectedEpisode);

  const otherEpisode = mockShowResponse.show.seasons[0].episodes[1];
  // when
  const dataA = getShowEpisode(mockState)(brandId, otherEpisode.id);
  // Then
  expect(dataA).toBe(otherEpisode);

  // when
  const dataB = getShowEpisode(mockState)(brandId, 'no_id');
  // Then
  expect(dataB).toBeUndefined();

  // when
  const highlightEpisode = mockShowResponse.show.highlights.content[0];
  const dataC = getShowEpisode(mockState)(brandId, highlightEpisode.id);
  // Then
  expect(dataC).toBe(highlightEpisode);
});

test('get selected season by Id', () => {
  const brandId = 'bran_ad6137678fff49beb1ff8f00103be9e7';
  const selectedSeason = mockShowResponse.show.seasons[1];
  const seasonId = selectedSeason.id;
  // Given
  const mockState = {
    titles: {
      brandById: {
        data: {
          [brandId]: mockShowResponse.show,
        },
      },
      selectedSeasonByBrandId: {
        [brandId]: seasonId,
      },
    },
  };

  // when
  const data = getSelectedSeason(mockState)(brandId);
  // Then
  expect(data).toBe(selectedSeason);

  // when
  const data1 = getSelectedSeason(mockState)('no_id');
  // Then
  expect(data1).toBeUndefined();

  // when
  mockState.titles.selectedSeasonByBrandId[brandId] = 'no_id';
  const data2 = getSelectedSeason(mockState)(brandId);
  // Then
  expect(data2).toBeUndefined();

  // When
  const defaultEpiosdeMockSate = {
    titles: {
      brandById: {
        data: {
          [brandId]: mockShowResponse.show,
        },
      },
      selectedSeasonByBrandId: {},
    },
  };
  (defaultEpiosdeMockSate.titles.brandById.data[brandId].defaultEpisode
    .season as any).id = seasonId;
  const data3 = getSelectedSeason(defaultEpiosdeMockSate)(brandId);
  // Then
  expect(data3).toBe(selectedSeason);

  // When
  (defaultEpiosdeMockSate.titles.brandById.data[brandId].defaultEpisode.season as any).id = 'no_id';
  const data4 = getSelectedSeason(defaultEpiosdeMockSate)(brandId);
  // Then
  expect(data4).toBe(mockShowResponse.show.seasons[0]);
});

test('get highlights from show', () => {
  const brandId = mockShowResponse.show.id;

  // Given
  const mockState = {
    titles: {
      brandById: {
        data: {
          [brandId]: mockShowResponse.show,
        },
      },
    },
  };

  // when
  const data = showHighlights(mockState)(brandId);
  // Then
  expect(data).toBe(mockShowResponse.show.highlights);
});

import { BrandType } from '@/types/enums/BrandType';
import { WhatsOnTVTabType } from '@/types/enums/WhatsOnTVTabType';
import { ShowType } from '@/types/graph-ql';
import {
  isShow,
  isSport,
  getCharactersText,
  getProgrammeSynopsis,
  getSeasonTitle,
  getDefaultWhatsOnTVTab,
  getFirstAvailableSlot,
  getVodTitle,
  getSeasonEpisodeNumber,
} from '../Title';

test('check whether the brand is a show or not', () => {
  // Given
  const mockShow: any = {
    __typename: BrandType.Show,
    type: ShowType.Series,
    seasons: [{ id: 'test' }],
    slots: [{ id: 'test' }],
  };
  // When it is a show.
  let result = isShow(mockShow);
  // Then
  expect(result).toBeTruthy();

  // When it is a movie.
  result = isShow({ ...mockShow, __typename: BrandType.Movie });
  // Then
  expect(result).toBeFalsy();
});

test('check whether the show is sports or not', () => {
  const show: any = {
    __typename: BrandType.Show,
    type: ShowType.Series,
    seasons: [{ id: 'test' }],
    slots: [{ id: 'test' }],
  };

  // when it's series
  let result = isSport(show);
  // then
  expect(result).toBeFalsy();
  // when it's sport
  result = isSport({ ...show, type: ShowType.Sport });
  // then
  expect(result).toBeTruthy();
  // when it's movie
  result = isSport({ ...show, __typename: BrandType.Movie });
  // then
  expect(result).toBeFalsy();
});

test('get the slot season episode number', () => {
  // when Tv-show type
  let number = getSeasonEpisodeNumber(null, 0);
  // Then
  expect(number).toBe('');

  number = getSeasonEpisodeNumber(0, 0);
  expect(number).toBe('S0 E0');

  number = getSeasonEpisodeNumber(4, 5);
  expect(number).toBe('S4 E5');

  number = getSeasonEpisodeNumber(4, undefined);
  expect(number).toBe('');
});

test('get the synopsis for EPG content', () => {
  const episodeId = 'test-episode-id';
  const episodeSynopsis =
    'Plant workers and firefighters put their lives on the line to control a catastrophic explosion at a Soviet nuclear power plant in 1986.';
  const episodeProgramme = {
    __typename: BrandType.Episode,
    id: episodeId,
    synopsis: episodeSynopsis,
  };

  const brand: any = {
    __typename: BrandType.Show,
    synopsis:
      'Brave men and women act heroically to mitigate catastrophic damage when the Chernobyl Nuclear Power Plant suffers a nuclear accident on April 26, 1986.',
    seasons: [
      {
        id: 'season-1',
        number: 1,
        episodes: [
          {
            ...episodeProgramme,
          },
        ],
      },
    ],
  };

  // when programme with synopsis
  const synopsis = getProgrammeSynopsis({ synopsis: 'test_synopsis' } as any, brand as any);
  // Then
  expect(synopsis).toBe('test_synopsis');

  // When programme with synopsis, has no brand provide
  const synopsisE = getProgrammeSynopsis(episodeProgramme as any, null);
  // Then
  expect(synopsisE).toBe(episodeSynopsis);

  // when programme with no synopsis but inside current brand Episodes
  episodeProgramme.synopsis = '';
  const synopsisA = getProgrammeSynopsis(episodeProgramme as any, brand as any);
  // Then
  expect(synopsisA).toBe(episodeSynopsis);

  // when programme no in current brand episodes
  const synopsisB = getProgrammeSynopsis(
    {
      ...episodeProgramme,
      id: 'no_id',
    } as any,
    brand as any,
  );
  // Then
  expect(synopsisB).toBe(brand.synopsis);

  // when programme only in current brand slots
  brand.seasons = [];
  brand.slots = [
    {
      programme: {
        id: episodeId,
        synopsis: 'test_slot_synopsis',
      },
    },
  ] as any;
  const synopsisC = getProgrammeSynopsis(episodeProgramme as any, brand as any);
  // Then
  expect(synopsisC).toBe('test_slot_synopsis');

  const synopsisD = getProgrammeSynopsis(undefined, null);
  // Then
  expect(synopsisD).toBe('');
});

test('get characters as a text', () => {
  // when characters are empty
  const charactersText = getCharactersText([]);
  // Then
  expect(charactersText).toBe('');
  // when only 1 characters
  const charactersText1 = getCharactersText([{ actorName: 'Mila', characterName: 'Johanka' }]);
  // Then
  expect(charactersText1).toBe('Mila');
  // when characters are empty
  const charactersText2 = getCharactersText([
    { actorName: 'Mila', characterName: 'Johanka' },
    { actorName: 'Simon', characterName: 'King Lear' },
  ]);
  // Then
  expect(charactersText2).toBe('Mila, Simon');
});

test('get season title with number of seasons', () => {
  // when characters are empty
  const seasonText = getSeasonTitle(undefined);
  // Then
  expect(seasonText).toBe(null);
  // when only 1 characters
  const seasonText1 = getSeasonTitle(1);
  // Then
  expect(seasonText1).toBe('1 Season');
  // when characters are empty
  const seasonText2 = getSeasonTitle(5);
  // Then
  expect(seasonText2).toBe('5 Seasons');
});

test('get default tab for whats on TV', () => {
  const brand: any = {
    __typename: BrandType.Show,
    episodes: [
      {
        id: 'skylarkEpisodeUid|epis_1',
        title: 'Eposide 1',
      },
    ],
    slots: [
      {
        channel: { id: 'channel1', title: 'SoHo' },
        start: '2021-05-13T03:25:00Z',
        end: '2021-05-13T04:15:00Z',
        programme: {},
      },
    ],
  };
  // when the brand is a non-Sport Show
  let tab = getDefaultWhatsOnTVTab(brand);
  // Then
  expect(tab).toBe(WhatsOnTVTabType.Recent);
  // when the brand is a non-Sport Show without episodes
  tab = getDefaultWhatsOnTVTab({ ...brand, episodes: [] });
  // Then
  expect(tab).toBe(WhatsOnTVTabType.Upcoming);

  // when the brand is a Sport Show
  const sportBrand = { ...brand, type: ShowType.Sport };
  tab = getDefaultWhatsOnTVTab(sportBrand);
  // Then
  expect(tab).toBe(WhatsOnTVTabType.Upcoming);
  // when the brand is a non-Sport Show without slots
  tab = getDefaultWhatsOnTVTab({ ...sportBrand, slots: [] });
  // Then
  expect(tab).toBe(WhatsOnTVTabType.Recent);

  // when the brand is a movie
  const movieBrand = { ...brand, __typename: BrandType.Movie };
  tab = getDefaultWhatsOnTVTab(movieBrand);
  // Then
  expect(tab).toBe(WhatsOnTVTabType.Upcoming);
});

test('get first available slot', () => {
  const movie = {
    slots: [
      {
        channel: { id: '1' },
        start: '2020-09-31T00:35:00Z',
        end: '2020-09-31T02:00:00Z',
      },
      {
        channel: { id: '2' },
        start: '2020-09-30T00:35:00Z',
        end: '2020-09-30T02:00:00Z',
      },
      {
        channel: { id: '3' },
        start: '2020-09-29T00:35:00Z',
        end: '2020-09-29T02:00:00Z',
      },
    ],
  };
  // when there the slots array is unsorted.
  let result = getFirstAvailableSlot(movie as any);
  // then
  expect(result?.channel.id).toEqual('3');

  // when there are 2 slot in the same time.
  const concurrentSlotsMovie = {
    slots: [
      {
        channel: { id: '1' },
        start: '2020-09-31T00:35:00Z',
        end: '2020-09-31T02:00:00Z',
      },
      {
        channel: { id: '2' },
        start: '2020-09-31T00:35:00Z',
        end: '2020-09-31T02:00:00Z',
      },
    ],
  };
  result = getFirstAvailableSlot(concurrentSlotsMovie as any);
  expect(result?.channel.id).toEqual('1');
});

test('get Vod title', () => {
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

  const mockSportBrand: any = {
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
  let result = getVodTitle(mockMovie);
  // Then
  expect(result).toEqual('MovieTitle');

  // When the brand is a non-sport show
  result = getVodTitle(mockShow, mockEpisode);
  // Then
  expect(result).toEqual('ShowTitle S1 E1');

  // When the brand is a non-sport show and ignore the season/episode number
  result = getVodTitle(mockShow, mockEpisode, true);
  // Then
  expect(result).toEqual('ShowTitle');

  // When the brand is a sport show
  result = getVodTitle(mockSportBrand, mockEpisode);
  // Then
  expect(result).toEqual('EpisodeTitle');
});

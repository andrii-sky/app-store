import { createSelector } from 'reselect';
import memoize from '@/utils/fastMemoize';

import { Show } from '@/types/graph-ql';
import { BrandType } from '@/types/enums/BrandType';
import utils from '@/utils';
import { findEpisode } from '@/utils/Title';

import { isNilOrEmpty } from '@/utils/utils';
import { namespace } from './constants';
import reducer from './reducer';

const moduleState = rootState => rootState[namespace] as ReturnType<typeof reducer>;

const brandState = createSelector(moduleState, state => state.brandById);
export const brandIsLoading = createSelector(brandState, state => state.isLoading);
export const brandError = createSelector(brandState, state => state.error);
export const getBrand = createSelector(brandState, state =>
  memoize((brandId: string) => state.data[brandId]),
);

export const getShow = createSelector(getBrand, getBrandState => (brandId: string) => {
  const show = getBrandState(brandId);
  if (show?.__typename === BrandType.Show) {
    return show;
  }
});

export const getMovie = createSelector(getBrand, getBrandState => (brandId: string) => {
  const movie = getBrandState(brandId);
  if (movie?.__typename === BrandType.Movie) {
    return movie;
  }
});

export const getShowEpisode = createSelector(
  getBrand,
  getBrandState => (brandId: string, episodeId: string) => {
    const brand = getBrandState(brandId);

    if (utils.title.isShow(brand)) {
      const highlights = utils.pagination.getContent(brand.highlights);
      // check highlights firstly if it exists
      console.log('BUGAGA 4: ', highlights);
      if (Array.isArray(highlights)) {
        const episode = highlights.find(_episode => _episode?.id === episodeId);
        if (episode) {
          return episode;
        }
      }
      // check brand seasons
      return findEpisode(brand.seasons, episodeId);
    }
  },
);

export const getSeasons = createSelector(brandState, state => (brandId: string) => {
  const brand = state.data[brandId];
  if (brand?.__typename === BrandType.Show) {
    return brand.seasons;
  }
  return [];
});

const selectedSeasonState = createSelector(moduleState, state => state.selectedSeasonByBrandId);
export const getSelectedSeason = createSelector(
  getBrand,
  selectedSeasonState,
  (getBrandState, state) => (brandId: string) => {
    const show = getBrandState(brandId) as Show;
    if (isNilOrEmpty(show?.seasons)) {
      return undefined;
    }
    if (state[brandId]) {
      return show.seasons.find(season => season?.id === state[brandId]);
    }
    // fall back to the first season if the defaultEpisode is not a VOD content.
    return (
      show.seasons.find(season => season?.id === show.defaultEpisode?.season?.id) || show.seasons[0]
    );
  },
);

export const showHighlights = createSelector(getBrand, getBrandState => (brandId: string) => {
  const brand = getBrandState(brandId);

  if (utils.title.isShow(brand)) {
    return brand.highlights;
  }
  return [];
});

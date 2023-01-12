import { isEmpty, isNil, uniq, concat } from 'ramda';
import { AnalyticsContentType } from '@/types/enums/AnalyticsContentType';
import {
  Maybe,
  Movie,
  Show,
  LinearSlot,
  Episode,
  LinearChannel,
  Tag,
  Season,
} from '@/types/graph-ql';
import { BrandType } from '@/types/enums/BrandType';
import { isNilOrEmpty, isNotNilOrEmpty } from '@/utils/utils';
import { isShow, isSport, getVodTitle } from './Title';
import {
  isShow as isShowBySlot,
  isSport as isSportBySlot,
  isMovie as isMovieBySlot,
  getSlotTitle,
  getSlotTitleWithBrand,
} from './Slot';

export const getContentTypeBySlot = (slot?: Maybe<LinearSlot>): string | undefined => {
  if (isShowBySlot(slot)) {
    return isSportBySlot(slot) ? AnalyticsContentType.SPORT : AnalyticsContentType.SHOW;
  }
  if (isMovieBySlot(slot)) {
    return AnalyticsContentType.MOVIE;
  }

  return undefined;
};

export const getContentTypeByBrand = (brand?: Maybe<Show | Movie>): string | undefined => {
  if (isNilOrEmpty(brand)) {
    return undefined;
  }
  if (isShow(brand)) {
    return isSport(brand) ? AnalyticsContentType.SPORT : AnalyticsContentType.SHOW;
  }
  return AnalyticsContentType.MOVIE;
};

export const getVodSeasonNumber = (season: Maybe<Season> | undefined) => season?.number;

export const getVodEpisodeNumber = (episode: Maybe<Episode> | undefined) =>
  episode?.number || undefined;

export const getSlotSeasonNumber = (slot: LinearSlot | undefined) =>
  slot?.programme?.__typename === BrandType.Episode
    ? getVodSeasonNumber(slot?.programme?.season)
    : undefined;

export const getSlotEpisodeNumber = (slot: LinearSlot | undefined) =>
  slot?.programme?.__typename === BrandType.Episode
    ? getVodEpisodeNumber(slot?.programme)
    : undefined;

// Specific for Youbora
export const getYouboraSlotTitle = (slot: Maybe<LinearSlot> | undefined) =>
  // Movie title for movies; TV show (brand) title for TV shows and Sport
  slot?.programme?.__typename === 'Episode' ? slot?.programme?.show?.title : slot?.programme?.title;

export const getYouboraSlotProgram = (slot: Maybe<LinearSlot> | undefined) =>
  // Movie title for movies, TV Show (brand) title + season no. + episode no. for TV shows, Episode title for Sport
  getSlotTitle(slot);

export const getYouboraSlotChannel = (channel: Maybe<LinearChannel>) => channel?.title;

const getBrandGenres = (brand: Maybe<Show | Movie>) => {
  const genres: Array<Tag> = concat(brand?.primaryGenres || [], brand?.allGenres || []);
  const genreTitles = genres.map(genre => genre.title);
  return isNotNilOrEmpty(genreTitles) ? uniq(genreTitles) : undefined;
};

export const getYouboraSlotGenres = (slot: Maybe<LinearSlot> | undefined) => {
  const brand = isShowBySlot(slot) ? (slot?.programme as Episode).show : (slot?.programme as Movie);
  return getBrandGenres(brand)?.join(',');
};

// Movie title for movies; TV show (brand) title for TV shows and Sport
export const getYouboraVodTitle = (brand: Maybe<Show | Movie>) => brand?.title;

export const getYouboraVodProgram = (brand: Maybe<Show | Movie>, episode?: Maybe<Episode>) =>
  // Movie title for movies, TV Show (brand) title + season no. + episode no. for TV shows, Episode title for Sport
  getVodTitle(brand, episode);

const getControllingChannel = (brand: Maybe<Show | Movie>) => {
  const brands = brand?.brands;
  if (isNil(brands) || isEmpty(brands?.filter(x => x?.title !== 'untitled'))) {
    return undefined;
  }
  return brands?.map(i => i?.title);
};

export const getYouboraControllingChannel = (brand: Maybe<Show | Movie>) =>
  getControllingChannel(brand)?.join(',');

export const getYouboraBrandGenres = (brand: Maybe<Show | Movie>) =>
  getBrandGenres(brand)?.join(',');

// Specific for Segment
export const getSegmentSlotTitle = (slot: Maybe<LinearSlot> | undefined) =>
  // Episode title for Sport only, TV show (brand) title for TV Show, movie title for Movie
  getSlotTitle(slot, false, true);

export const getSegmentSlotTitleWithBrand = (
  slot: Maybe<LinearSlot> | undefined,
  isSportShow: boolean,
  brandTitle?: string,
) =>
  // Episode title for Sport only, TV show (brand) title for TV Show, movie title for Movie
  getSlotTitleWithBrand(slot, isSportShow, brandTitle, false, true);

/**
 * This function is trying to align the data type with VOD's controlling channel, should be only used for
 * VideoContentStart, VideoContentStop, recordUpgradeEncountered.
 * @param channel
 * @returns array with channel title
 */
export const getSegmentSlotChannel = (channel: Maybe<LinearChannel> | undefined) =>
  channel?.title ? [channel?.title] : undefined;

export const getSegmentSlotGenres = (slot: Maybe<LinearSlot> | undefined) => {
  const brand = isShowBySlot(slot) ? (slot?.programme as Episode).show : (slot?.programme as Movie);
  return getBrandGenres(brand);
};

export const getSegmentVodTitle = (brand: Maybe<Show | Movie>, episode?: Maybe<Episode>) =>
  // Episode title for Sport only, TV show (brand) title for TV Show, movie title for Movie
  getVodTitle(brand, episode, true);

export const getSegmentControllingChannel = (brand: Maybe<Show | Movie>) =>
  getControllingChannel(brand);

export const getSegmentBrandGenres = (brand: Maybe<Show | Movie>) => getBrandGenres(brand);

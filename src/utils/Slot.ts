import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { isEmpty, isNil } from 'ramda';

import { BrandType } from '@/types/enums/BrandType';
import { LiveStatus } from '@/types/enums/LiveStatus';
import { ShowType, LinearSlot, Maybe, Rating } from '@/types/graph-ql';
import { getSeasonEpisodeNumber } from './Title';
import { isNotNilOrEmpty } from './utils';

dayjs.extend(isBetween);

export const DEFAULT_SLOT_TITLE = 'Schedule unavailable at this time';

export const isShow = (slot?: Maybe<LinearSlot>) =>
  slot?.programme?.__typename === BrandType.Episode;

export const isSport = (slot?: Maybe<LinearSlot>) =>
  slot?.programme?.__typename === BrandType.Episode &&
  slot?.programme?.show?.type === ShowType.Sport;

export const isMovie = (slot?: Maybe<LinearSlot>) =>
  slot?.programme?.__typename === BrandType.Movie;

export const formatRating = (rating: Maybe<Rating> | undefined) => {
  return isNil(rating?.classification)
    ? ''
    : `${rating?.classification.replace(/[^0-9a-z]/gi, '')}${rating?.advisories?.join('') || ''}`;
};

// The query for slot detail doesn't contain programme.show, as the data is already included in brand.
export const getSlotTitleWithBrand = (
  slot: Maybe<LinearSlot> | undefined,
  isSportShow: boolean,
  brandTitle?: string,
  includeRating?: boolean,
  ignoreSeasonAndEpisode?: boolean,
) => {
  if (isNil(slot)) {
    return '';
  }
  if (isNil(slot.programme)) {
    return DEFAULT_SLOT_TITLE;
  }
  let title;
  if (slot.programme.__typename === BrandType.Episode && !isSportShow) {
    const seasonNumber = slot.programme.season?.number;
    const episodeNumber = slot.programme.number;
    const seasonEpisodeNumber = getSeasonEpisodeNumber(seasonNumber, episodeNumber);
    title =
      isEmpty(seasonEpisodeNumber) || ignoreSeasonAndEpisode
        ? brandTitle
        : `${brandTitle} ${seasonEpisodeNumber}`;
  } else {
    // Movie & Sport Episode will return episode title
    title = slot.programme?.title;
  }
  const rating = formatRating(slot.rating);
  return includeRating && rating ? `${title} (${rating})` : title;
};

export const getSlotTitle = (
  slot: Maybe<LinearSlot> | undefined,
  includeRating?: boolean,
  ignoreSeasonAndEpisode?: boolean,
) =>
  getSlotTitleWithBrand(
    slot,
    isSport(slot),
    slot?.programme?.__typename === BrandType.Episode
      ? slot?.programme?.show?.title
      : slot?.programme?.title,
    includeRating,
    ignoreSeasonAndEpisode,
  );

/**
 * Check slot LIVE status base on on-air status
 * @param slot
 * @param isProd if ENV is PROD, set to 4 hours time frame, otherwise 24 hours
 * @returns is LIVE or LIVE SOON, or no LIVE displaying
 */
export const getSportLiveStatusByTime = (slot?: Maybe<LinearSlot>, isProd = true): LiveStatus => {
  if (slot) {
    const { live, start, end } = slot;

    if (live) {
      const now = dayjs();

      if (now.isBetween(start, end)) {
        return LiveStatus.LIVE;
      }
      if (dayjs(start).isBetween(now, now.add(isProd ? 4 : 24, 'h'))) {
        return LiveStatus.LIVE_SOON;
      }
    }
  }

  return LiveStatus.NOT_LIVE;
};

export const isSlotOnAir = (slot?: LinearSlot): boolean => {
  if (slot?.start && slot?.end) {
    const now = dayjs();
    return now.isBetween(dayjs(slot.start), dayjs(slot.end));
  }
  return false;
};

export const isFinished = (slot?: LinearSlot) => {
  const now = dayjs();
  return slot?.end && now.isAfter(dayjs(slot.end));
};

export const isRecordable = (slot?: LinearSlot): boolean => {
  return isNotNilOrEmpty(slot?.recordOptions) && !isFinished(slot);
};

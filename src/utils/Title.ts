import { gt, isEmpty, isNil, join, pipe, pluck } from 'ramda';
import { BrandType } from '@/types/enums/BrandType';
import { WhatsOnTVTabType } from '@/types/enums/WhatsOnTVTabType';
import {
  Character,
  Episode,
  LinearContent,
  Maybe,
  Movie,
  Season,
  Show,
  ShowType,
} from '@/types/graph-ql';
import { isNilOrEmpty } from '@/utils/utils';

export const isShow = (brand?: Maybe<Show | Movie>): boolean =>
  brand?.__typename === BrandType.Show;

export const isSport = (brand?: Maybe<Show | Movie>): boolean =>
  brand?.__typename === BrandType.Show && brand.type === ShowType.Sport;

export const findEpisode = (seasons?: Maybe<Season>[], episodeId?: string) => {
  if (!isNil(seasons)) {
    for (let i = 0; i < seasons.length; i += 1) {
      const season = seasons[i];
      const episode = season?.episodes?.find(_episode => _episode?.id === episodeId);
      if (episode) {
        return episode;
      }
    }
  }
};

export const getProgrammeSynopsis = (
  programme?: Maybe<LinearContent>,
  brand?: Maybe<Show | Movie>,
): string => {
  // If passed in epg has synopsis already, no matter if it is Movie or ShowEpisode
  if (programme?.synopsis) {
    return programme.synopsis;
  }

  // if it is a Show
  if (brand?.__typename === BrandType.Show) {
    const episode = findEpisode(brand?.seasons, programme?.id);
    if (episode?.synopsis) {
      return episode?.synopsis;
    }
    // If no episodes, checking the EPG slots
    const epg = brand?.slots?.find(slot => slot.programme?.id === programme?.id);
    if (epg?.programme?.synopsis) {
      return epg?.programme?.synopsis;
    }
  }

  return brand?.synopsis || '';
};

export const getCharactersText = characters => {
  if (isNilOrEmpty(characters)) {
    return '';
  }
  return pipe<Character[], string[], string>(pluck('actorName'), join(', '))(characters);
};

export const getSeasonTitle = seasonsNumber => {
  if (isNilOrEmpty(seasonsNumber) || seasonsNumber === 0) {
    return null;
  }
  return gt(seasonsNumber, 1) ? `${seasonsNumber} Seasons` : `${seasonsNumber} Season`;
};

export const getDefaultWhatsOnTVTab = (brand: Show | Movie) => {
  if (brand.__typename === 'Show') {
    if (brand.type === ShowType.Sport) {
      // For Sport, the Upcoming rail will be the default state if there is content
      return !isNil(brand.slots) && !isEmpty(brand.slots)
        ? WhatsOnTVTabType.Upcoming
        : WhatsOnTVTabType.Recent;
    }
    return !isNil(brand.episodes) && !isEmpty(brand.episodes)
      ? WhatsOnTVTabType.Recent
      : WhatsOnTVTabType.Upcoming;
  }
  return WhatsOnTVTabType.Upcoming;
};

export const getFirstAvailableSlot = (brand: Show | Movie) => {
  if (brand.slots && !isEmpty(brand.slots)) {
    return brand.slots.reduce((a, b) => {
      return a.start <= b.start ? a : b;
    });
  }
  return undefined;
};

export const getSeasonEpisodeNumber = (
  seasonNumber?: Maybe<number>,
  episodeNumber?: Maybe<number>,
) => {
  if (!isNil(seasonNumber) && !isNil(episodeNumber)) {
    return `S${String(seasonNumber).padStart(1, '0')} E${String(episodeNumber).padStart(1, '0')}`;
  }
  return '';
};

export const getVodTitle = (
  brand: Maybe<Show | Movie>,
  episode?: Maybe<Episode>,
  ignoreSeasonAndEpisode?: boolean,
) => {
  const brandTitle = brand?.title;
  if (isShow(brand)) {
    if (isSport(brand)) {
      return episode?.title;
    }
    const seasonEpisodeNumber = getSeasonEpisodeNumber(episode?.season?.number, episode?.number);
    return isEmpty(seasonEpisodeNumber) || ignoreSeasonAndEpisode
      ? brandTitle
      : `${brandTitle} ${seasonEpisodeNumber}`;
  }
  return brandTitle;
};

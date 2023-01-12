import { IMAGE_RATIOS } from '@/utils/Images';
import {
  SCHEDULE_WITH_DATE_RANGE,
  SCHEDULES_SNIPPET,
  SCHEDULE_FRAGMENT,
  LOGOS_BRAND_SNIPPET,
  CHARACTER_SNIPPET,
} from '@/utils/queries/Fragments';

const DEFAULT_EPISODE_QUERY_CONTENT = (needSchedule = true, charactersLimit?: number) => `
  id
  season {
    id
    number
  }
  number
  duration
  watchProgress {
    complete
    position
  }
  asset {
    id
    duration
    hasParentalRestriction
  }
  ${needSchedule ? SCHEDULES_SNIPPET : ''}
  ${CHARACTER_SNIPPET(charactersLimit)}
`;

const EPISODE_FRAGMENT = `episodes(viewingContexts: CATCHUP, includeTypes:[REGULAR], sort: LATEST) {
  ...episodeFields
}`;

const HIGHLIGHTS_FRAGMENT = (nextPageSize?, after?) => {
  const paginationParam = nextPageSize
    ? `, first: ${nextPageSize}${after ? `, after: "${after}"` : ''}`
    : '';
  return `
    highlights: episodesPage(viewingContexts: VOD, includeTypes:[HIGHLIGHT], sort: LATEST ${paginationParam}) {
      pageInfo{
        startCursor
        endCursor
        hasNextPage
      }
      content{
        ...on Episode{
          ... episodeFields
          ${SCHEDULE_WITH_DATE_RANGE}
        }
      }
    }
    `;
};

const SCHEDULES = `
  mySchedule {
    ...schedule
  }
  schedule {
    ...schedule
  }
`;

const SLOT_FRAGMENT = (needSchedule = true) => `slots {
  channel {
    id
    title
    ${needSchedule ? SCHEDULES : ''}
  }
  hasParentalRestriction
  rating {
    classification
    advisories
  }
  start
  end
  live
  recordOptions
  programme {
    __typename
    ...on Episode {
      ...episodeFields
    }
  }
  payPerViewOffer {
    id
    price {
      amount
    }
    purchases {
      purchasedAt
      deviceId
      offer {
        slots {
          id
        }
      }
    }
  }
}`;

const EPISODES_FIELDS_FRAGMENT = (needSchedule = true) => `fragment episodeFields on Episode {
  id
  title
  synopsis
  duration
  rating {
    classification
    advisories
  }
  season {
    id
    number
  }
  image {
    uri
  }
  number
  watchProgress {
    complete
    position
  }
  asset {
    id
    duration
    hasParentalRestriction
  }
  ${needSchedule ? SCHEDULES_SNIPPET : ''}
}

${needSchedule ? SCHEDULE_FRAGMENT : ''}
`;

const SHOW_QUERY_CONTENT = (
  needEpisodes = true,
  needSlots = true,
  needSchedule = true,
  charactersLimit?: number,
  initialRailSize?: number,
) => `
  __typename
  ...on Title {
    id
    title
    synopsis
    onMyList
    rating {
      classification
      advisories
    }
    ${CHARACTER_SNIPPET(charactersLimit)}
    primaryGenres {
      title
    }
    allGenres {
      title
    }
    heroLandingWide: heroImage(aspectRatio: ${IMAGE_RATIOS.HORIZONTAL}) {
      uri
    }
    heroLandingSquare: heroImage(aspectRatio: ${IMAGE_RATIOS.VERTICAL}) {
      uri
    }
    contentTileHorizontal: tileImage(aspectRatio: ${IMAGE_RATIOS.HORIZONTAL}) {
      uri
    }
    contentTileVertical: tileImage(aspectRatio: ${IMAGE_RATIOS.VERTICAL}) {
      uri
    }
  }
  type
  numberOfSeasons
  ${
    needEpisodes
      ? `defaultEpisode {
    ${DEFAULT_EPISODE_QUERY_CONTENT(needSchedule, charactersLimit)}
  }`
      : ''
  }
  seasons(viewingContexts: VOD) {
    id
    number
    soundtrack{
      id
    }
    episodes(viewingContexts: VOD, includeTypes:[REGULAR]) {
      ...episodeFields
      ${SCHEDULE_WITH_DATE_RANGE}
    }
  }
  ${HIGHLIGHTS_FRAGMENT(initialRailSize)}
  ${LOGOS_BRAND_SNIPPET}
  ${needEpisodes ? EPISODE_FRAGMENT : ''}
  ${needSlots ? SLOT_FRAGMENT(needSchedule) : ''}
`;

export const GET_SHOW = (
  needEpisodes = true,
  needSlots = true,
  needSchedule = true,
  charactersLimit?: number,
  initialRailSize?: number,
) => `
  query GetShow($brandId: ID!) {
    show(id: $brandId) {
      ${SHOW_QUERY_CONTENT(needEpisodes, needSlots, needSchedule, charactersLimit, initialRailSize)}
    }
  }

  ${EPISODES_FIELDS_FRAGMENT(needSchedule)}`;

export const GET_SHOW_HIGHLIGHTS = (nextPageSize?: number, after?: string) => {
  return `
    query GetHightlights($brandId: ID!) {
      show(id: $brandId){
        __typename
        id
        ${HIGHLIGHTS_FRAGMENT(nextPageSize, after)}
      }
    }
    ${EPISODES_FIELDS_FRAGMENT(true)}`;
};

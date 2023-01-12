import gql from 'graphql-tag';
import { IMAGE_RATIOS } from '../Images';

export const SCHEDULE_FRAGMENT = `
  fragment schedule on Schedule {
    subscriptions {
      id
      title
    }
    tvodOffer {
      id
      price {
        amount
      }
      startingPeriod
      rentalPeriod
      expressRelease
      purchases {
        purchasedAt
        deviceId
        offer {
          content {
            ...on Movie {
              id
            }
          }
        }
      }
    }
  }
`;

export const SCHEDULE_WITH_DATE_RANGE = `
  schedule {
    ...schedule
    dateRange {
      start
    }
  }
`;

export const SCHEDULES_SNIPPET = `
  mySchedule {
    ...schedule
  }
  schedule {
    ...schedule
  }
  downloadSchedule: schedule(viewingContexts: DOWNLOAD) {
    ...schedule
  }
`;

export const PLAYBACK_SCHEDULE_SNIPPET = `
  ... on SubscriptionNeeded {
    subscriptions {
      id
      title
    }
  }
`;

export const PLAYBACK_SOURCES_SNIPPET = drmType => `
... on PlaybackSources {
  playbackSource(drmType: ${drmType}) {
    streamUri
    drmLicense {
      __typename
      licenseUri
        ... on FairplayLicense {
          certificateUri
      }
    }
    emeHeaders {
      name
      value
    }
  }
}
`;

export const LOGOS_BRAND_SNIPPET = `
  brands {
      id
      title
      logoImage {
        uri
      }
  }
`;

const heroImage = `
  heroLandingWide: heroImage(aspectRatio: ${IMAGE_RATIOS.HORIZONTAL}) {
    uri
  }
  contentTileHorizontal: tileImage(aspectRatio: ${IMAGE_RATIOS.HORIZONTAL}) {
    uri
  }
  contentTileVertical: tileImage(aspectRatio: ${IMAGE_RATIOS.VERTICAL}) {
    uri
  }
`;

const allGenres = `
  allGenres {
    title
  }
`;

const simpleSlots = `
  slots {
    programme {
      ... on Title {
        id
        synopsis
      }
      ... on Episode {
        id
        synopsis
      }
    }
  }
`;

export const LINEAR_CHANNEL_TILE_FRAGMENT = (needReverseEPG = false) => gql`
  fragment linearChannelTile on LinearChannel {
    id
    title
    contentTileHorizontal: tileImage(aspectRatio: ${IMAGE_RATIOS.HORIZONTAL}) { uri }
    contentTileVertical: tileImage(aspectRatio: ${IMAGE_RATIOS.VERTICAL}) { uri }
    slot {
      start
      end
      ${
        needReverseEPG
          ? `reverseEpgWindow
      allowPlayFromStart`
          : ``
      }
      hasParentalRestriction
      live
      rating {
        classification
        advisories
      }
      programme {
        __typename

        ... on Title {
          id
          title
        }
        ... on Movie {
          primaryGenres {
            title
          }
          year
        }
        ... on Episode {
          id
          title

          number
          show {
            __typename
            id
            title
            type
            primaryGenres {
              title
            }
          }
          season {
            id
            number
          }
        }
      }
    }
    mySchedule {
      subscriptions {
        id
        title
      }
    }
  }
`;

export const EPG_CONTENT_SNIPPET = config => {
  const {
    needSynopsis = false,
    needImage = false,
    needAllGenres = false,
    needSlots = false,
    needAsset = false,
    needShowDetail = true,
  } = config;
  return `
  ... on Title {
    id
    title
    ${needSynopsis ? 'synopsis' : ''}
    ${needImage ? heroImage : ''}
  }
  ... on Movie {
    ${
      needAsset
        ? `
    asset { id hasParentalRestriction }
    mySchedule {
      ...schedule
    }
    schedule {
      ...schedule
    }`
        : ''
    }
    primaryGenres {
      title
    }
    ${needAllGenres ? allGenres : ''}
    year
  }
  ... on Episode {
    id
    title
    ${needSynopsis ? 'synopsis' : ''}
    ${
      needAsset
        ? `
    asset { id hasParentalRestriction }
    mySchedule {
      ...schedule
    }
    schedule {
      ...schedule
    }`
        : ''
    }
    ${needImage ? 'image { uri }' : ''}
    number
    show {
      __typename
      id
      title
      type
      primaryGenres {
        title
      }
      ${needShowDetail && needSynopsis ? 'synopsis' : ''}
      ${needAllGenres ? allGenres : ''}
      ${needImage ? heroImage : ''}
      ${needSlots ? simpleSlots : ''}
    }
    season {
      id
      number
    }
  }
`;
};

export const SHOW_DEFAULT_EPISODE_FRAGMENT = gql`
  fragment showDefaultEpisode on Show {
    defaultEpisode {
      id
      season {
        number
      }
      number
      duration
      rating {
        classification
        advisories
      }
      watchProgress {
        complete
        position
      }
      asset {
        id
        hasParentalRestriction
      }
      mySchedule {
        ...schedule
      }
    }
  }
`;

export const CONTENT_PAGE_FRAGMENT = gql`
  fragment contentPageFragment on ContentPage {
    pageInfo {
      endCursor
      hasNextPage
    }
    content {
      __typename
      ... on Title {
        id
        title
        contentTileHorizontal: tileImage(aspectRatio: ${IMAGE_RATIOS.HORIZONTAL}) { uri }
        contentTileVertical: tileImage(aspectRatio: ${IMAGE_RATIOS.VERTICAL}) { uri }
      }
      ... on Show {
        primaryGenres {
          title
        }
        year
        numberOfSeasons
      }
      ... on Movie {
        primaryGenres {
          title
        }
        year
        duration
        rating {
          classification
          advisories
        }
      }
      ...linearChannelTile
      ... on Collection {
        id
        title
        contentTileHorizontal: tileImage(aspectRatio: ${IMAGE_RATIOS.HORIZONTAL}) { uri }
        contentTileVertical: tileImage(aspectRatio: ${IMAGE_RATIOS.VERTICAL}) { uri }
      }
      ... boxAppTile
    }
  }`;

export const BOX_APP_TILE_FRAGMENT = gql`
  fragment boxAppTile on BoxApp {
    id
    mandatory
    favourite
    lastOpened
    canUnfavourite
    suggestedTileImage(aspectRatio: ${IMAGE_RATIOS.HORIZONTAL}) {
      uri
    }
  }`;

export const CHANNEL_SNIPPET = `
  id
  title
  dvbTriplet
  tileImage {
    uri
  }
  mySchedule {
    ...schedule
  }
  schedule {
    ...schedule
  }
`;

const DEFAULT_CHARACTERS_LIMIT = 3;
// currently the API only returns actors in the characters field
export const CHARACTER_SNIPPET = (charactersLimit?: number) => {
  return `
  characters(limitTo: ${charactersLimit || DEFAULT_CHARACTERS_LIMIT}) {
            actorName
            characterName
        }
`;
};

export const RAIL_SNIPPET = (
  nextPageSize?: number,
  after?: string,
  ignoreContinueWatching?: boolean,
) => {
  const paginationParam = nextPageSize
    ? `(first: ${nextPageSize}${after ? ` after: "${after}"` : ''})`
    : '';
  return `
  id
  title
  layout
  ... on ContinueWatchingGroup {
    contentPage${ignoreContinueWatching ? '' : paginationParam} {
      ...contentPageFragment
      content {
        ... on Show {
          rating {
            classification
            advisories
          }
          ...showDefaultEpisode
        }
        ... on Movie {
          watchProgress {
            complete
            position
          }
          mySchedule {
            ...schedule
          }
          schedule {
            ...schedule
          }
          asset {
            id
            hasParentalRestriction
          }
        }
      }
    }
  }
  ... on PortraitRailGroup {
    contentPage${paginationParam} {
      ...contentPageFragment
    }
  }
  ${/*  Phone apps use portrait images even for landscape rails, so we retrieve both. */ ''}
  ${
    /*  This is wasteful, ideally we'd parameterise this query somehow, or define a separate native */ ''
  }
  ${/*  query rather than retrieving double the image urls for every rail.*/ ''}
  ... on LandscapeRailGroup {
    contentPage${paginationParam} {
      ...contentPageFragment
    }
  }
  ... on FavouriteAppsGroup {
    id
    presentation
    contentPage${paginationParam} {
      ...contentPageFragment
      content {
        __typename
        ...boxAppTile
      }
    }
  }
`;
};

export const HERO = `
  fragment hero on HeroContent {
      ... on Title {
          __typename
          title
          synopsis
          rating {
              classification
              advisories
          }
          primaryGenres {
              title
          }
          id
          heroLandingWide: heroImage(aspectRatio: ${IMAGE_RATIOS.HORIZONTAL}) {
              uri
          }
          heroLandingSquare: heroImage(aspectRatio: ${IMAGE_RATIOS.VERTICAL}) {
              uri
          }
          contentTileHorizontal: tileImage(aspectRatio: ${IMAGE_RATIOS.HORIZONTAL}) {
              uri
          }
      }
      ... on Movie {
          year
          duration
          watchProgress {
              complete
              position
          }
          asset {
              id
              hasParentalRestriction
          }
          mySchedule {
              ...schedule
          }
          slots {
            channel {
              id
              title
              mySchedule {
                ...schedule
              }
              schedule {
                ...schedule
              }
            }
            rating {
              classification
              advisories
            }
            recordOptions
            start
            end
          }
      }
      ... on Show {
          type
          numberOfSeasons
          ...showDefaultEpisode
          slots {
            channel {
              id
              title
              mySchedule {
                ...schedule
              }
              schedule {
                ...schedule
              }
            }
            rating {
              classification
              advisories
            }
            live
            recordOptions
            start
            end
            programme {
              __typename
              ... on Episode {
                synopsis
                image {
                  uri
                }
              }
            }
          }
      }
  }
`;

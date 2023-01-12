import { IMAGE_RATIOS } from '@/utils/Images';
import {
  SCHEDULES_SNIPPET,
  SCHEDULE_FRAGMENT,
  LOGOS_BRAND_SNIPPET,
  CHARACTER_SNIPPET,
} from '@/utils/queries/Fragments';

const GET_MOVIE = (needSchedule = true, charactersLimit?: number) => `
  query GetMovie($brandId: ID!) {
    movie(id: $brandId) {
      __typename
      ...on Title {
        ...movieFields
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
          hasParentalRestriction
          rating {
            classification
            advisories
          }
          start
          end
          recordOptions
          programme {
            ...on Movie {
              ...movieFields
            }
          }
        }
      }
    }
  }

  fragment movieFields on Movie {
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
    year
    duration
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
    soundtrack {
      id
    }
    watchProgress {
      complete
      position
    }
    asset {
      id
      duration
      hasParentalRestriction
    }
    ${LOGOS_BRAND_SNIPPET}
    ${needSchedule ? SCHEDULES_SNIPPET : ''}
  }

  ${SCHEDULE_FRAGMENT}
`;

export default GET_MOVIE;

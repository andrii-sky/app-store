import { ViewingContext } from '@/types/graph-ql';
import { IMAGE_RATIOS } from '@/utils/Images';
import {
  COLLECTION_FILTER_GENRE,
  COLLECTION_FILTER_SUBSCRIPTION,
  COLLECTION_FILTER_VIEWINGCONTEXT,
  COLLECTION_FILTER_SORT,
  COLLECTION_FILTER_VALUE_ALL,
  COLLECTION_FILTER_VALUE_MYSUBSCRIPTION,
  COLLECTION_FILTER_VALUE_ONDEMAND,
  COLLECTION_FILTER_VALUE_UPCOMING_ON_TV,
  COLLECTION_FILTER_VALUE_DOWNLOADABLE,
} from '../constants';

export type CollectionFilters = {
  [filterName: string]: string;
};
export type PageInfo = {
  after?: string;
  size?: number;
};

const FILTER_VIEWINGCONTEXT_MAP = {
  [COLLECTION_FILTER_VALUE_ALL]: [
    ViewingContext.Vod,
    ViewingContext.Catchup,
    ViewingContext.Linear,
  ],
  [COLLECTION_FILTER_VALUE_ONDEMAND]: [ViewingContext.Vod, ViewingContext.Catchup],
  [COLLECTION_FILTER_VALUE_UPCOMING_ON_TV]: ViewingContext.Linear,
  [COLLECTION_FILTER_VALUE_DOWNLOADABLE]: ViewingContext.Download,
};

export const GET_COLLECTION = (filters?: CollectionFilters, pageInfo?: PageInfo) => `
  query GetCollection($collectionId: ID!) {
    collection(id: $collectionId) {
      id
      title
      tileImage {
        uri
      }
      defaultContentFilter {
              viewingContextsByContentType {
                viewingContexts
                contentTypes
              }
            }
            defaultContentSort
      namedFilters{
        id
        title
      }
      contentPage ${
        pageInfo || filters
          ? `(
        ${pageInfo?.after ? `after: "${pageInfo.after}"` : ''}
        ${pageInfo?.size ? `first: ${pageInfo.size}` : ''}
        ${
          filters
            ? `filter: {
          onlyMyContent: ${
            filters[COLLECTION_FILTER_SUBSCRIPTION] === COLLECTION_FILTER_VALUE_MYSUBSCRIPTION
          }
          ${
            filters[COLLECTION_FILTER_VIEWINGCONTEXT]
              ? `viewingContextsByContentType: {
                viewingContexts: [${
                  FILTER_VIEWINGCONTEXT_MAP[filters[COLLECTION_FILTER_VIEWINGCONTEXT]]
                }]
              }`
              : ``
          }
        }
        ${
          filters[COLLECTION_FILTER_GENRE] !== COLLECTION_FILTER_VALUE_ALL
            ? `namedFilters: "${filters[COLLECTION_FILTER_GENRE]}"`
            : ''
        }
        ${filters[COLLECTION_FILTER_SORT] ? `sort: ${filters[COLLECTION_FILTER_SORT]}` : ''}`
            : ''
        }
      )`
          : ''
      }{
        pageInfo {
          endCursor
          hasNextPage
        }
        content {
          __typename
          ... on Title {
            id
            title
            rating {
              classification
              advisories
            }
            contentTileHorizontal: tileImage(aspectRatio: ${IMAGE_RATIOS.HORIZONTAL}) {
              uri
            }
            contentTileVertical: tileImage(aspectRatio: ${IMAGE_RATIOS.VERTICAL}) {
              uri
            }
            primaryGenres {
              title
            }
          }
          ... on Show {
            numberOfSeasons
          }
          ... on Movie {
            year
            duration
          }
          ... on LinearChannel {
            id
            title
            contentTileHorizontal: tileImage(aspectRatio: ${IMAGE_RATIOS.HORIZONTAL}) {
              uri
            }
            contentTileVertical: tileImage(aspectRatio: ${IMAGE_RATIOS.VERTICAL}) {
              uri
            }
          }
          ... on Collection {
            id
            title
            contentTileHorizontal: tileImage(aspectRatio: ${IMAGE_RATIOS.HORIZONTAL}) {
              uri
            }
            contentTileVertical: tileImage(aspectRatio: ${IMAGE_RATIOS.VERTICAL}) {
              uri
            }
          }
        }
      }
    }
  }
`;

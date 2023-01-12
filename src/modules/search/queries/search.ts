import { IMAGE_RATIOS } from '@/utils/Images';

const SEARCH_QUERY = `
  query search($term: String!) {
    search(term: $term) {
      groupResults {
        __typename
        ... on LandscapeRailGroup {
          id,
          title,
          contentPage {
              pageInfo {
                startCursor
                endCursor
                hasNextPage
                hasPreviousPage
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
            }
          }
        }
      }
    }
  }
`;

export default SEARCH_QUERY;

import { IMAGE_RATIOS } from '@/utils/Images';

const MY_LIST_QUERY = `
  query MyList {
    myList {
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
                asset {
                  id
                }
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
  }
}
`;

export default MY_LIST_QUERY;

import * as Fragments from '@/utils/queries/Fragments';
import { print } from 'graphql';

const GET_SECTION = (sectionName, initialRailSize?: number) => `#graphql
  query getSection {
    section(id: "${sectionName}") {
      id
      home {
        __typename
        ... on ContentHome {
          path
          groups {
            ${Fragments.RAIL_SNIPPET(initialRailSize, undefined)}
          }
        }
      }
    }
  }
  ${Fragments.SCHEDULE_FRAGMENT}
  ${print(Fragments.LINEAR_CHANNEL_TILE_FRAGMENT())}
  ${print(Fragments.CONTENT_PAGE_FRAGMENT)}
  ${print(Fragments.BOX_APP_TILE_FRAGMENT)}
  ${print(Fragments.SHOW_DEFAULT_EPISODE_FRAGMENT)}
`;

export default GET_SECTION;

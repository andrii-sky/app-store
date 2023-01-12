import * as Fragments from '@/utils/queries/Fragments';
import { print } from 'graphql';

const GET_HOME_PAGE = (
  initialRailSize?: number,
  includedRail?: { id: string; size: number },
  ignoreContinueWatching?: boolean,
  needReverseEPG?: boolean,
) => `#graphql
  query getHome${includedRail ? '($railId: ID!)' : ''} {
    section(id: "home") {
      id
      home {
        __typename
        ... on ContentHome {
          path
          heroSet {
            heroList {
              ...hero
            }
            displayTime
          }
          groups {
            ${Fragments.RAIL_SNIPPET(initialRailSize, undefined, ignoreContinueWatching)}
          }
        }
      }
    }
    ${
      includedRail
        ? `group(id: $railId) {
      ${Fragments.RAIL_SNIPPET(includedRail.size, undefined, ignoreContinueWatching)}
    }`
        : ''
    }
  }
  ${Fragments.SCHEDULE_FRAGMENT}
  ${Fragments.HERO}
  ${print(Fragments.LINEAR_CHANNEL_TILE_FRAGMENT(needReverseEPG))}
  ${print(Fragments.CONTENT_PAGE_FRAGMENT)}
  ${print(Fragments.BOX_APP_TILE_FRAGMENT)}
  ${print(Fragments.SHOW_DEFAULT_EPISODE_FRAGMENT)}
`;

export default GET_HOME_PAGE;

import * as Fragments from '@/utils/queries/Fragments';
import { print } from 'graphql';

const GET_RAIL = (nextPageSize?: number, after?: string) => `#graphql
  query GetGroup($railId: ID!) {
    group(id: $railId){
      ${Fragments.RAIL_SNIPPET(nextPageSize, after)}
    }
  }
  ${Fragments.SCHEDULE_FRAGMENT}
  ${print(Fragments.LINEAR_CHANNEL_TILE_FRAGMENT())}
  ${print(Fragments.CONTENT_PAGE_FRAGMENT)}
  ${print(Fragments.BOX_APP_TILE_FRAGMENT)}
  ${print(Fragments.SHOW_DEFAULT_EPISODE_FRAGMENT)}
`;

export default GET_RAIL;

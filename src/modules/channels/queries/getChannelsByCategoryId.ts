import { EPG_CONTENT_SNIPPET, SCHEDULE_FRAGMENT } from '@/utils/queries/Fragments';

const GET_CHANNELS_BY_CATEGORY_ID = `
  query linearChannelGroup($categoryId: ID!) {
    linearChannelGroup(id: $categoryId) {
      channels {
        __typename
        id
        title
        number
        dvbTriplet
        tileImage {
          uri
        }
        slot {
          start
          end
          hasParentalRestriction
          live
          rating {
            classification
            advisories
          }
          channel {
            id
          }
          programme {
            __typename
            ${EPG_CONTENT_SNIPPET({ needSynopsis: true })}
          }
        }
        mySchedule {
          ...schedule
        }
        schedule {
          ...schedule
        }
      }
    }
  }
  ${SCHEDULE_FRAGMENT}
`;

export default GET_CHANNELS_BY_CATEGORY_ID;

import { EPG_CONTENT_SNIPPET } from '@/utils/queries/Fragments';

const GET_SLOTS_BY_TIME_RANGE = (needDetail = false, needReverseEPG = false) => `
  query getSlots($from: DateTime!, $to: DateTime!) {
    channels {
      __typename
      ... on AppPromotionChannel {
        id
      }
      ... on LinearChannel {
        id
        title
        number
        tileImage {
          uri
        }
        slots(from: $from to: $to) {
          start
          end
          ${
            needReverseEPG
              ? `reverseEpgWindow
          allowPlayFromStart`
              : ``
          }
          live
          rating {
            classification
            advisories
          }
          hasParentalRestriction
          recordOptions
          programme {
            __typename
            ${EPG_CONTENT_SNIPPET({
              needSynopsis: needDetail,
              needImage: needDetail,
              needShowDetail: false,
            })}
          }
        }
      }
    }
  }
`;

export default GET_SLOTS_BY_TIME_RANGE;

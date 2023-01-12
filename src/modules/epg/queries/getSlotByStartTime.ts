import { EPG_CONTENT_SNIPPET, SCHEDULE_FRAGMENT } from '@/utils/queries/Fragments';

const GET_SLOT_BY_START_TIME = (needReverseEPG = false) => `
  query getSlot($channelId: ID!, $at: DateTime) {
    linearChannel(id: $channelId) {
      slot(at: $at) {
        start
        end
        ${
          needReverseEPG
            ? `reverseEpgWindow
        allowPlayFromStart`
            : ``
        }
        recordOptions
        hasParentalRestriction
        live
        rating {
          classification
          advisories
        }
        channel {
          id
          title
          number
          dvbTriplet
          mySchedule {
            ...schedule
          }
          schedule {
            ...schedule
          }
        }
        programme {
          __typename
          ${EPG_CONTENT_SNIPPET({
            needSynopsis: true,
            needImage: true,
            needAllGenres: true,
            needAsset: true,
          })}
        }
      }
    }
  }
  ${SCHEDULE_FRAGMENT}
`;

export default GET_SLOT_BY_START_TIME;

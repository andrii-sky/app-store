import { CHANNEL_SNIPPET, EPG_CONTENT_SNIPPET, SCHEDULE_FRAGMENT } from '@/utils/queries/Fragments';

const GET_CHANNEL_SLOTS = (needChannelDetail = false) => `
  query linearChannelGroup($channelId: ID!, $at: DateTime) {
    linearChannel(id: $channelId) {
      number
      ${needChannelDetail ? CHANNEL_SNIPPET : ''}
      slot(at: $at) {
        start
        end
        recordOptions
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
          ${EPG_CONTENT_SNIPPET({
            needSynopsis: needChannelDetail,
            needImage: true,
            needAllGenres: true,
          })}
        }
      }
    }
  }
  ${needChannelDetail ? SCHEDULE_FRAGMENT : ''}
`;

export default GET_CHANNEL_SLOTS;

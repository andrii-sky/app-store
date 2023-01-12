import { EPG_CONTENT_SNIPPET, SCHEDULE_FRAGMENT } from '@/utils/queries/Fragments';

const CHANNELS_SNIPPET = (needSlotDetail: boolean, needChannelImage: boolean) => `
  channels {
    __typename
    ... on AppPromotionChannel {
      id
      appId
      number
      title
      slotPromotionTitle
      slotPromotionSubtitle
      ${
        needChannelImage
          ? `
          tileImage {
            uri
          }
          `
          : ''
      }
      slotImage{
        uri
      }
      promotionBackgroundImage {
          uri
      }
  }

    ... on LinearChannel {
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
    ${
      needChannelImage
        ? `
        tileImage {
          uri
        }
        `
        : ''
    }
    ${
      needSlotDetail
        ? `
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
            ${EPG_CONTENT_SNIPPET({
              needSynopsis: true,
              needSlots: false,
            })}
          }
        }`
        : ''
    }
    }
  }
`;

const GET_CATEGORIES = (needSlotDetail: boolean, needChannelImage: boolean) => `
  query {
    channelGroups {
      id
      title
      ${CHANNELS_SNIPPET(needSlotDetail, needChannelImage)}
    }
  }
  ${SCHEDULE_FRAGMENT}
`;

export default GET_CATEGORIES;

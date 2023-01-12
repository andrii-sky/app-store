import { isEmpty, isNil } from 'ramda';
import { Maybe, LinearSlot, LinearChannel, SkySubscription, LinearContent } from '@/types/graph-ql';
import { isNilOrEmpty, isNotNilOrEmpty } from './utils';

export const getChannelSubscription = (
  channel?: LinearChannel,
): Array<Maybe<SkySubscription>> | undefined => {
  if (channel) {
    const isEntitled = !isNil(channel.mySchedule) && !isEmpty(channel.mySchedule);
    return isEntitled ? undefined : channel.schedule?.subscriptions;
  }
  return undefined;
};

export const getVodSubscription = (
  vodContent?: LinearContent,
): Array<Maybe<SkySubscription>> | undefined => {
  if (vodContent) {
    const isEntitled = isNotNilOrEmpty(vodContent.mySchedule);
    return isEntitled ? undefined : vodContent.schedule?.subscriptions;
  }
  return undefined;
};

export const getSlotSubscriptions = (
  slot?: LinearSlot,
): Array<Maybe<SkySubscription>> | undefined => {
  if (slot) {
    return getChannelSubscription(slot.channel);
  }
  return undefined;
};

export const isChannelEntitled = (channel?: LinearChannel): boolean => {
  const requiredSubscriptions = getChannelSubscription(channel);
  return isNilOrEmpty(requiredSubscriptions);
};

export const isVodEntitled = (vodContent?: LinearContent): boolean => {
  const requiredSubscriptions = getVodSubscription(vodContent);
  return isNilOrEmpty(requiredSubscriptions);
};

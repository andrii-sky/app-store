import { createSelector } from 'reselect';
import { values } from 'ramda';
import reducer from './reducer';

import memoize from '../../utils/fastMemoize';
import { namespace } from './constants';

export type State = {
  [namespace]: ReturnType<typeof reducer>;
};

export const categoriesIsLoading = createSelector(
  (state: State) => state.channels.categoryById.isLoading,
  isLoading => isLoading,
);
export const categoriesError = createSelector(
  (state: State) => state.channels.categoryById.error,
  error => error,
);
export const getCategory = createSelector(
  (state: State) => state.channels.categoryById.data,
  data => memoize(categoryId => data[categoryId]),
);

export const categories = createSelector(
  (state: State) => state.channels.categoryById.data,
  data => values(data),
);
export const selectedCategoryId = createSelector(
  (state: State) => state.channels.selectedCategoryId,
  id => id,
);
export const selectedCategory = createSelector(
  (state: State) => state.channels.selectedCategoryId,
  (state: State) => state.channels.categoryById?.data,
  (catId, c) => c && catId && c[catId],
);
export const channelsByCategoryIdIsLoading = createSelector(
  (state: State) => state.channels.channelsByCategoryId.isLoading,
  l => l,
);
export const channelsByCategoryIdError = createSelector(
  (state: State) => state.channels.channelsByCategoryId.error,
  e => e,
);
export const channels = createSelector(
  (state: State) => state.channels.channelById,
  channelById => values(channelById),
);
export const getChannel = createSelector(
  (state: State) => state.channels.channelById,
  channelById => memoize((channelId: string) => channelById[channelId]),
);
export const selectedChannelId = createSelector(
  (state: State) => state.channels.selectedChannelId,
  id => id,
);
export const selectedChannel = createSelector(
  (state: State) => state.channels.selectedChannelId,
  (state: State) => state.channels.channelById,
  (id, cbi) => id && cbi[id],
);
export const selectedChannelSlotState = createSelector(
  (state: State) => state.channels.selectedChannelSlot,
  slots => slots,
);
export const selectedChannelSlot = createSelector(
  (state: State) => state.channels.selectedChannelSlot?.data?.slot,
  slot => slot,
);
export const selectedChannelSlotIsLoading = createSelector(
  (state: State) => state.channels?.selectedChannelSlot?.isLoading,
  l => l,
);
export const getChannelsByCategoryId = createSelector(
  (state: State) => state.channels.channelsByCategoryId?.data,
  (state: State) => state.channels.channelById,
  (channelsByCategoryId, cid) =>
    memoize((categoryId: string) =>
      categoryId && channelsByCategoryId && cid
        ? channelsByCategoryId[categoryId]?.map((id: string) => cid[id]).filter((i: any) => i)
        : undefined,
    ),
);

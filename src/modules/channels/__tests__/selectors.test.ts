import { createApiInitialState } from '@/utils/api';
import { objFromListWith } from '@/utils/ObjFromListWith';
import { prop } from 'ramda';

import {
  selectedCategory,
  selectedChannelId,
  selectedChannel,
  getChannel,
  getCategory,
  categoriesIsLoading,
  categories,
  categoriesError,
  getChannelsByCategoryId,
  channelsByCategoryIdIsLoading,
  channelsByCategoryIdError,
  selectedChannelSlot,
  selectedChannelSlotIsLoading,
  selectedCategoryId,
  channels,
  selectedChannelSlotState as _selectedChannelSlotState,
} from '../selectors';

const category1 = {
  id: '/api/placeholders/plac_f1ec35c54e78493aacbf1d6d7f42486f/',
  title: 'Recent Channels',
};

const category2 = {
  id: '/api/sets/coll_02e60b21c23a4660b3833a48f6c72076/',
  title: 'All Channels',
};

const category3 = {
  id: '/api/sets/coll_d14f15b69c9141a099c0c22aad48428c/',
  title: 'Sports',
};

const categoriesResult = [category1, category2, category3];

const initialState = {
  channels: {
    channels: {
      data: [],
      error: undefined,
      isLoading: false,
    },
    selectedChannelId: undefined,
    selectedCategoryId: undefined,
    selectedChannelSlot: {
      data: {},
      isLoading: false,
    },
  },
} as any;

test('initial state selectors', () => {
  expect(selectedChannelId.resultFunc('id')).toEqual('id');
});

const channelA = {
  id: '1',
};
const channelB = {
  id: '2',
};

const recentChannel = {
  id: 'recentChannelId',
};

const validState = {
  channels: {
    channels: {
      data: [channelA.id, channelB.id],
      error: 'Exception',
      isLoading: true,
    },
    channelById: {
      [channelA.id]: channelA,
      [channelB.id]: channelB,
    },
    selectedChannelId: channelA.id,
    recentChannels: {
      data: [recentChannel],
      isLoading: false,
    },
  },
} as any;

describe('selectedCategoryId', () => {
  it('return undefined', () => {
    expect(selectedCategoryId(validState)).toEqual(undefined); // doing this for coverage
  });

  it('should return the id', () => {
    expect(selectedCategoryId.resultFunc('id')).toEqual('id');
  });
});

describe('channels', () => {
  it('should return a valid object', () => {
    expect(channels(validState)).toEqual(expect.anything());
  });
});

describe('selectedChannel', () => {
  it('should return a valid object', () => {
    expect(selectedChannel(validState)).toEqual(expect.anything());
  });
});

describe('selectedChannelSlotState', () => {
  it('should return a valid object', () => {
    expect(_selectedChannelSlotState(validState)).toEqual(undefined);
  });
});

describe('getChannel', () => {
  it('should return values', () => {
    expect(getChannel(validState)(channelA.id)).toEqual(expect.anything());
  });
});

test('valid state selectors', () => {
  expect(selectedChannelId(validState)).toEqual(expect.anything());
  expect(selectedChannelId.resultFunc(validState.channels.selectedChannelId)).toEqual(channelA.id);
  expect(selectedChannel.resultFunc(channelA.id, validState.channels.channelById)).toEqual(
    channelA,
  );
  expect(getChannel.resultFunc(validState.channels.channelById)(channelA.id)).toEqual(channelA);
});

test('categories', () => {
  // Given
  const mockState = {
    channels: {
      categoryById: createApiInitialState(objFromListWith(prop('id'), categoriesResult)),
      selectedCategoryId: category1.id,
    },
  } as any;

  // get selected category
  expect(selectedCategory(mockState)).toEqual(category1);

  // get all categories with order
  const categoriesList = categories(mockState);
  expect(categoriesList).toEqual([category1, category2, category3]);

  // get category by id
  const data = getCategory(mockState)(category1.id);
  expect(data).toEqual(category1);

  // get category by id
  const data1 = getCategory(mockState)('no_id');
  expect(data1).toBeUndefined();

  // isLoading, Error
  expect(categoriesIsLoading(mockState)).toEqual(false);
  expect(categoriesError(mockState)).toBeFalsy();
});

test('channels by category', () => {
  // Given
  const mockState = {
    channels: {
      channelsByCategoryId: createApiInitialState({
        [category1.id]: [channelA.id, channelB.id],
      }),
      channelById: objFromListWith(prop('id'), [channelA, channelB]),
    },
  } as any;

  // get all categories with order
  const channelList = getChannelsByCategoryId(mockState)(category1.id);
  expect(channelList).toEqual([channelA, channelB]);

  // isLoading, Error
  expect(channelsByCategoryIdIsLoading(mockState)).toEqual(false);
  expect(channelsByCategoryIdError(mockState)).toBeFalsy();
});

test('selectedChannelSlot', () => {
  // Given

  const selectedChannelSlotState = {
    channels: {
      selectedChannelSlot: {
        data: {
          slot: {
            start: '2020-07-24T00:31:10',
            end: '2020-07-24T01:31:10',
            programme: {
              __typename: 'LinearProgramme',
              title: 'The Breakdown S2020 E10',
              rating: {
                __typename: 'Rating',
                classification: '_G',
                advisories: [],
              },
            },
          },
        },
      },
    },
  } as any;

  // get selected channel slots
  expect(selectedChannelSlot(initialState)).toEqual(undefined);

  expect(selectedChannelSlot(selectedChannelSlotState)).toEqual(
    selectedChannelSlotState.channels.selectedChannelSlot.data.slot,
  );
  expect(selectedChannelSlotIsLoading(initialState)).toEqual(false);
});

test('selectedChannelSlot on empty slots', () => {
  // Given

  const selectedChannelSlotState = {
    channels: {
      selectedChannelSlot: {
        data: {},
      },
    },
  } as any;

  // get selected channel slots
  expect(selectedChannelSlot(initialState)).toEqual(undefined);

  expect(selectedChannelSlot(selectedChannelSlotState)).toEqual(undefined);
  expect(selectedChannelSlotIsLoading(initialState)).toEqual(false);
});

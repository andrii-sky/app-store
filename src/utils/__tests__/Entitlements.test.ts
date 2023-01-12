import { getChannelSubscription, getSlotSubscriptions, getVodSubscription } from '../Entitlements';

const mockChannel: any = {
  id: 'skylarkChannelUid|chan_8998eeabbe344d8698fd6be2127961eb',
  title: 'Sky Sport Pop-up 1',
  mySchedule: { subscriptions: [{ id: 'SPORTS', title: 'Sky Sport' }] },
  schedule: {
    subscriptions: [{ id: 'SPORTS', title: 'Sky Sport' }],
  },
};
const mockSlot: any = {
  start: '2020-07-24T02:31:10Z',
  end: '2020-07-24T03:31:10Z',
  channel: {
    id: 'skylarkChannelUid|chan_8998eeabbe344d8698fd6be2127961eb',
    title: 'Sky Sport Pop-up 1',
    mySchedule: { subscriptions: [{ id: 'SPORTS', title: 'Sky Sport' }] },
    schedule: {
      subscriptions: [{ id: 'SPORTS', title: 'Sky Sport' }],
    },
  },
  programme: {
    __typename: 'Episode',
    id: 'skylarkEpisodeUid|epis_354e77b42b8446b499520b2dff0fecc9',
    title: 'MLS LIVE Episode',
    show: {
      __typename: 'Show',
      id: 'skylarkBrandUid|bran_eb179d6b79084f4f86432f8305e2777a',
      title: 'MLS LIVE',
      primaryGenres: [],
    },
  },
};

const mockMovie: any = {
  __typename: 'Movie',
  title: 'Jumanji: The Next Level',
  mySchedule: { subscriptions: [{ id: 'SPORTS', title: 'Sky Sport' }] },
  schedule: {
    subscriptions: [{ id: 'SPORTS', title: 'Sky Sport' }],
  },
};

const mockEpisode: any = {
  __typename: 'Episode',
  id: 'skylarkEpisodeUid|epis_354e77b42b8446b499520b2dff0fecc9',
  title: 'MLS LIVE Episode',
  mySchedule: { subscriptions: [{ id: 'SPORTS', title: 'Sky Sport' }] },
  schedule: {
    subscriptions: [{ id: 'SPORTS', title: 'Sky Sport' }],
  },
};

test('get requiredSubscriptions for channel', () => {
  // Given
  const channel = { ...mockChannel };
  // when user is entitled
  let subscription = getChannelSubscription(channel as any);
  // Then
  expect(subscription).toBe(undefined);

  // when user is not entitled
  channel.mySchedule = null;
  subscription = getChannelSubscription(channel as any);
  // Then
  expect(subscription).toBe(channel.schedule.subscriptions);

  // when user does not have any entitlements
  channel.mySchedule = [];
  subscription = getChannelSubscription(channel as any);
  // Then
  expect(subscription).toBe(channel.schedule.subscriptions);

  // when channel is not passed
  subscription = getChannelSubscription();
  // Then
  expect(subscription).toBe(undefined);
});

test('get requiredSubscriptions for slot', () => {
  // Given
  const slot = { ...mockSlot };
  // when user is entitled
  let subscription = getSlotSubscriptions(slot as any);
  // Then
  expect(subscription).toBe(undefined);

  // when user is not entitled
  slot.channel.mySchedule = null;
  subscription = getSlotSubscriptions(slot as any);
  // Then
  expect(subscription).toBe(slot.channel.schedule.subscriptions);

  // when user does not have any entitlements
  slot.channel.mySchedule = [];
  subscription = getSlotSubscriptions(slot as any);
  // Then
  expect(subscription).toBe(slot.channel.schedule.subscriptions);

  // when channel is not passed
  subscription = getSlotSubscriptions();
  // Then
  expect(subscription).toBe(undefined);
});

test('get requiredSubscriptions for movie', () => {
  // Given
  const movie = { ...mockMovie };
  // when user is entitled
  let subscription = getVodSubscription(movie as any);
  // Then
  expect(subscription).toBe(undefined);

  // when user is not entitled
  movie.mySchedule = null;
  subscription = getVodSubscription(movie as any);
  // Then
  expect(subscription).toBe(movie.schedule.subscriptions);

  // when user does not have any entitlements
  movie.mySchedule = [];
  subscription = getVodSubscription(movie as any);
  // Then
  expect(subscription).toBe(movie.schedule.subscriptions);

  // when movie is not passed
  subscription = getVodSubscription();
  // Then
  expect(subscription).toBe(undefined);
});

test('get requiredSubscriptions for episode', () => {
  // Given
  const episode = { ...mockEpisode };
  // when user is entitled
  let subscription = getVodSubscription(episode as any);
  // Then
  expect(subscription).toBe(undefined);

  // when user is not entitled
  episode.mySchedule = null;
  subscription = getVodSubscription(episode as any);
  // Then
  expect(subscription).toBe(episode.schedule.subscriptions);

  // when user does not have any entitlements
  episode.mySchedule = [];
  subscription = getVodSubscription(episode as any);
  // Then
  expect(subscription).toBe(episode.schedule.subscriptions);
});

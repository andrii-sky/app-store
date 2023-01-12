import { RailItem } from '../RailItem';

const testChannel = {
  url: '/api/channels/chan_e461d91467db40f5b3ed29746a36aa27/',
  uid: 'chan_e461d91467db40f5b3ed29746a36aa27',
  title: 'Sky Sport 1',
  contentType: 'Channel',
  images: [
    {
      url:
        'https://images-dev.skyone.co.nz/media/images/stills/channel/5/fd1dfd651a418e1eb9ee9fe2500d4df2.png?impolicy=contentTileHorizontal',
      type: 'contentTileHorizontal',
    },
  ],
  channelSlotStart: '2020-06-18T01:31:10Z',
  channelSlotEnd: '2020-06-18T02:31:10Z',
  channelProgrammeName: 'The Breakdown S2020 E10',
};

test('Create an array of instances from plain objects', () => {
  const railItems = RailItem.createInstances([testChannel, testChannel]);
  expect(railItems).toBeInstanceOf(Array);
  expect(railItems[0]).toBeInstanceOf(RailItem);
});

test('Create a instance from plain object', () => {
  const railItem = RailItem.createInstance(testChannel);
  expect(railItem).toBeInstanceOf(RailItem);
  expect(railItem.url).toBe(testChannel.url);
  expect(railItem.uid).toBe(testChannel.uid);
  expect(railItem.title).toBe(testChannel.title);
});

test('Get the ids from uid', () => {
  const railItem = RailItem.createInstance(testChannel);
  expect(railItem.id).toBe('chan_e461d91467db40f5b3ed29746a36aa27');
});

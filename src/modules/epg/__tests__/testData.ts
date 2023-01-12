export const slots = [
  {
    start: '2020-08-03T07:31:10Z',
    end: '2020-08-03T08:31:10Z',
  },
  {
    start: '2020-08-03T08:31:10Z',
    end: '2020-08-03T09:31:10Z',
  },
  {
    start: '2020-08-03T09:31:10Z',
    end: '2020-08-03T10:31:10Z',
  },
];

export const futureSlots = [
  {
    start: '2020-08-03T09:31:10Z',
    end: '2020-08-03T10:31:10Z',
  },
  {
    start: '2020-08-03T11:31:10Z',
    end: '2020-08-03T12:31:10Z',
  },
  {
    start: '2020-08-03T12:31:10Z',
    end: '2020-08-03T13:31:10Z',
  },
];

export const channelsResult = {
  channels: [
    {
      __typename: 'LinearChannel',
      id: 'skylarkChannelUid|chan_e461d91467db40f5b3ed29746a36aa27',
      title: 'Sky Sport 1',
      tileImage: {
        uri:
          'https://images-dev.skyone.co.nz/media/images/stills/channel/5/fd1dfd651a418e1eb9ee9fe2500d4df2.png',
      },
      slots,
    },
    {
      __typename: 'LinearChannel',
      id: 'skylarkChannelUid|chan_c7928e0a07ab47118fdc0eed4eeaac66',
      title: 'Movies Premiere',
      tileImage: {
        uri:
          'https://images-dev.skyone.co.nz/media/images/stills/channel/71/bf2f011d7dc4417866107204a50e597c.png',
      },
      slots,
    },
  ],
};

export const slotResult = {
  linearChannel: {
    slot: {
      start: '2021-11-17T22:30:00Z',
      end: '2021-11-17T23:30:00Z',
      recordOptions: ['EPISODE', 'SERIES'],
      hasParentalRestriction: false,
      live: false,
      rating: {
        classification: '_G',
        advisories: [],
      },
      channel: {
        id: 'SKY1',
        mySchedule: {
          subscriptions: [
            {
              id: 'STARTER',
              title: 'Starter',
            },
          ],
        },
        schedule: {
          subscriptions: [
            {
              id: 'STARTER',
              title: 'Starter',
            },
          ],
        },
      },
      programme: {
        __typename: 'Episode',
        asset: {
          id: 'macAssetId|OT040664_HD_mac_10950060',
          hasParentalRestriction: false,
        },
        mySchedule: {
          subscriptions: [
            {
              id: 'FREE_TO_AIR',
              title: 'Prime',
            },
          ],
        },
        schedule: {
          subscriptions: [
            {
              id: 'FREE_TO_AIR',
              title: 'Prime',
            },
          ],
        },
        id: 'mac_11274119',
        title: 'Strike a Pose',
        synopsis:
          "Unprecedented guest numbers put Cliveden House hotel under pressure. Meanwhile, a Chinese wedding with a 13-strong camera crew sees tensions rise as the day's schedule goes out the window.",
        number: 3,
        show: {
          __typename: 'Show',
          id: 'mac_sh_70091',
          title: 'Cliveden: A Very British Country House',
          type: 'SERIES',
          primaryGenres: [
            {
              title: 'Documentary',
            },
          ],
          synopsis:
            "Set in the middle of a 376-acre National Trust estate, Grade I listed Cliveden House is one of the world's most exclusive country house hotels. Take a behind-the-scenes look at Cliveden House during its busiest summer season.",
          allGenres: [
            {
              title: 'Documentary',
            },
            {
              title: 'Reality',
            },
          ],
          heroLandingWide: {
            uri:
              'https://images.skyone.co.nz/media/images/stills/content/339868/d4f1c3aeba6b00bb4f0925b61b3909d1.jpg',
          },
          contentTileHorizontal: {
            uri:
              'https://images.skyone.co.nz/media/images/stills/content/339868/dabb9d4d50c926f0afb516db333aa018.jpg',
          },
        },
        season: {
          number: 1,
        },
      },
    },
  },
};

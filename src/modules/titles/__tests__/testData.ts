/* eslint-disable import/prefer-default-export */
export const mockMovieResponse = {
  movie: {
    __typename: 'Movie',
    title: 'Thor: The Dark World',
    synopsis:
      'Thor forms an alliance with treacherous Loki to save Earth and the Nine Realms from an ancient enemy that predates the universe itself, embarking on his most perilous and personal journey yet. Based on Marvel Comics characters.',
    rating: {
      classification: '_PG',
      advisories: ['V'],
    },
    characters: [
      {
        actorName: 'Sylvester Stallone',
        characterName: 'John Rambo',
      },
      {
        actorName: 'Paz Vega',
        characterName: 'Carmen',
      },
      {
        actorName: 'Sergio Peris-Mencheta',
        characterName: 'Hugo Martínez',
      },
    ],
    onMyList: false,
    genres: [
      {
        title: 'Action',
      },
    ],
    id: 'skylarkEpisodeUid|epis_9898e5793b2e4b16b3f059901c08920b',
    year: 2013,
    duration: 'PT1H47M25S',
    soundtrack: {
      id: '2dTEXpN7fg9cJPKCCyDJ1y',
      tracks: [
        {
          id: '5rQmuNRjKT6t33JlNJbc6I',
          name: 'Thor: The Dark World',
        },
        {
          id: '30YNIUsYOmHVM6oPIkLHin',
          name: 'Lokasenna',
        },
        {
          id: '5LuenPeo98IBXOUy8r4yC0',
          name: 'Asgard',
        },
        {
          id: '4s0ZHdP0ibPBvpkCWt8e2z',
          name: 'Battle of Vanaheim',
        },
        {
          id: '64swtmosGc0cZy3DZpmqb8',
          name: 'Origins',
        },
        {
          id: '13qV9OXC1cCFFn6ZLaCLJF',
          name: 'The Trial of Loki',
        },
        {
          id: '3lFhC79IaV9KKgusUYQt11',
          name: 'Into Eternity',
        },
        {
          id: '2Jk8y9QOrt89toDLg87ftI',
          name: 'Escaping the Realm',
        },
        {
          id: '6LaGW4hvMQxwbVLBD8kq7c',
          name: 'A Universe from Nothing',
        },
        {
          id: '3EBva3y64ThemePBtVjktp',
          name: 'Untouchable',
        },
        {
          id: '4wHZxRXjpuNTD7f9f4jpIq',
          name: 'Thor, Son of Odin',
        },
        {
          id: '3tm7mUuLLuIVsAt9hVREzD',
          name: 'Shadows of Loki',
        },
        {
          id: '6s1bzjIQhQYAjO9TzEdzmu',
          name: 'Sword and Council',
        },
        {
          id: '25eB3iJQvUpgg8Y2Lu8AUV',
          name: 'Invasion of Asgard',
        },
        {
          id: '5XTv8ICc2qAOhNGUFP7cLZ',
          name: 'Betrayal',
        },
        {
          id: '37zAefVFQrDon2iCMD5uWm',
          name: 'Journey to Asgard',
        },
        {
          id: '70fTfvr0iPTnS473jcVLn4',
          name: 'Uprising',
        },
        {
          id: '1G2PhshceVidCqieTBGxmG',
          name: 'Vortex',
        },
        {
          id: '6Fn94iOw2VvwXn0Bkl9TB1',
          name: 'An Unlikely Alliance',
        },
        {
          id: '2nNam8QXck3eiIPEdBlaqF',
          name: 'Convergence',
        },
      ],
    },
    watchProgress: {
      complete: false,
      position: 'PT17M58S',
    },
    asset: {
      id: 'skylarkMediaAssetUid|asse_17e52a9c13bd4cce9758429cb3fb4b0c',
    },
  },
};

export const mockShowResponse = {
  show: {
    __typename: 'Show',
    title: 'Chernobyl',
    synopsis:
      'Brave men and women act heroically to mitigate catastrophic damage when the Chernobyl Nuclear Power Plant suffers a nuclear accident on April 26, 1986.',
    rating: {
      classification: '_16',
      advisories: ['V', 'S', 'L'],
    },
    characters: [
      {
        actorName: 'Sylvester Stallone',
        characterName: 'John Rambo',
      },
      {
        actorName: 'Paz Vega',
        characterName: 'Carmen',
      },
      {
        actorName: 'Sergio Peris-Mencheta',
        characterName: 'Hugo Martínez',
      },
    ],
    genres: [],
    id: 'skylarkBrandUid|bran_ad6137678fff49beb1ff8f00103be9e7',
    numberOfSeasons: 1,
    defaultEpisode: {
      id: 'skylarkEpisodeUid|epis_605d418f1e684bc7b5928c26a095c386',
      season: {
        number: 2,
      },
      number: 1,
      watchProgress: null,
    },
    seasons: [
      {
        id: 'season-1',
        number: 1,
        episodes: [
          {
            id: 'skylarkEpisodeUid|epis_605d41if03684bc7b5928c2a095ch9et',
            title: 'Chernobyl S1 E1',
            synopsis:
              'Plant workers and firefighters put their lives on the line to control a catastrophic explosion at a Soviet nuclear power plant in 1986.',
            duration: 'PT56M28S',
            rating: {
              classification: '_16',
              advisories: ['V', 'S', 'L'],
            },
            season: {
              number: 1,
            },
            number: 1,
            watchProgress: null,
            asset: {
              id: 'skylarkMediaAssetUid|asse_93ef5ade740b44eaad9472d54e347387',
              duration: 'PT49M2S',
            },
          },
          {
            id: 'skylarkEpisodeUid|epis_d241f92daf8f4dcdbd2e09bcad0e7721',
            title: 'Chernobyl S1 E2',
            synopsis:
              'With untold millions at risk, nuclear physicist Ulana Khomyuk makes a desperate attempt to reach Valery Legasov, a leading Soviet nuclear physicist, and warn him about the threat of a second explosion that could devastate the continent.',
            duration: 'PT1H3M6S',
            rating: {
              classification: '_16',
              advisories: ['V', 'S', 'L'],
            },
            season: {
              number: 1,
            },
            number: 2,
            watchProgress: null,
            asset: {
              id: 'skylarkMediaAssetUid|asse_3ca8c85819ee4c90b7cbb1379e3d48b9',
              duration: 'PT51M58S',
            },
          },
        ],
        soundtrack: {
          id: '4YU2XJH8yVtQh5oPylvoDw',
          tracks: [
            {
              id: '4vVRdmiVXWeT0UxkF5Nenj',
              name: 'Cold Little Heart',
            },
            {
              id: '5n8kTIxonZzmM9jPrvXV5A',
              name: 'Victim Of Love',
            },
            {
              id: '0HLxYZsciDiAbuIZhGmQvO',
              name: 'Bloody Mother Fucking Asshole',
            },
            {
              id: '5aE6KBL9vjpgdzYlbC4AJY',
              name: 'River',
            },
            {
              id: '2YIsMYR9fVyGnai3zT3w2p',
              name: 'Queen Of Boredness',
            },
            {
              id: '7AM06OClnynrXURHyWwJlK',
              name: 'September Song',
            },
            {
              id: '0KKpTT8LkdarAs1kRmAvbW',
              name: 'This Feeling',
            },
            {
              id: '267FIAdcIXoVRlyIpdx48F',
              name: 'Changes',
            },
            {
              id: '5mk2tOGVtWutKzXSMREOEl',
              name: 'Straight From The Heart',
            },
            {
              id: '7na7OQHZZyrJnqcDC4e4D8',
              name: 'Nothing Arrived - Live',
            },
            {
              id: '22koI34FpNt6irOht3N8nJ',
              name: "Don't",
            },
            {
              id: '78tuHzwhY28c7ikM10hFYL',
              name: 'The Wonder Of You',
            },
            {
              id: '06KWxPWcaOBaKGIPhjPLLq',
              name: "How's The World Treating You",
            },
            {
              id: '3dpKu2UFGXm9VUXdMDKsEr',
              name: "You Can't Always Get What You Want",
            },
          ],
        },
      },
      {
        id: 'season-2',
        number: 2,
        episodes: [
          {
            id: 'skylarkEpisodeUid|epis_605d418f1e684bc7b5928c26a095c386',
            title: 'Chernobyl S2 E1',
            synopsis:
              'Plant workers and firefighters put their lives on the line to control a catastrophic explosion at a Soviet nuclear power plant in 1986.',
            duration: 'PT56M28S',
            rating: {
              classification: '_16',
              advisories: ['V', 'S', 'L'],
            },
            season: {
              number: 2,
            },
            number: 1,
            watchProgress: null,
            asset: {
              id: 'skylarkMediaAssetUid|asse_da11bc1de2d14aa1b0df7f9cdf3f8226',
              duration: 'PT49M36S',
            },
          },
          {
            id: 'skylarkEpisodeUid|epis_d241f92daf8ui3r8i3d2e09bcad0e7e81',
            title: 'Chernobyl S2 E2',
            synopsis:
              'With untold millions at risk, nuclear physicist Ulana Khomyuk makes a desperate attempt to reach Valery Legasov, a leading Soviet nuclear physicist, and warn him about the threat of a second explosion that could devastate the continent.',
            duration: 'PT1H3M6S',
            rating: {
              classification: '_16',
              advisories: ['V', 'S', 'L'],
            },
            season: {
              number: 2,
            },
            number: 2,
            watchProgress: null,
            asset: {
              id: 'skylarkMediaAssetUid|asse_0f74f0392dcc44038b3c2b19ba526bf4',
              duration: 'PT49M11S',
            },
          },
        ],
      },
    ],
    slots: [
      {
        channel: {
          title: 'SoHo',
        },
        start: '2020-09-15T03:55:00Z',
        end: '2020-09-15T04:50:00Z',
      },
    ],
    catchup: [
      {
        id: 'skylarkEpisodeUid|epis_605d418f1e684bc7b5928c26a095c386',
        season: {
          number: 2,
        },
        number: 1,
        watchProgress: null,
        availability: {
          end: '2020-09-15T04:50:00Z',
        },
      },
    ],
    highlights: {
      pageInfo: {
        startCursor: 'MA==',
        endCursor: 'MA==',
        hasNextPage: true,
      },
      content: [
        {
          id: 'mac_114480091',
          title: 'Law & Order: Special Victims Unit',
          synopsis:
            'S12E9 Gray: When a girl from the crowd at a university rape prevention lecture accuses another student of rape, Stabler and Detective Benson are assigned the case.',
          duration: 'PT1H',
          rating: {
            classification: '_16',
            advisories: [],
          },
          season: {
            id: 'mac_s_486426',
            number: 12,
          },
          image: {
            uri:
              'https://images.skyone.co.nz/media/images/stills/content/717499/150b79afa7e5f0e1926a995f0d473fde.jpg',
          },
          number: 9,
          watchProgress: null,
          asset: {
            id: 'macAssetId|OC212640_HD_mac_11448009',
            duration: 'PT1H',
            hasParentalRestriction: false,
          },
          mySchedule: {
            subscriptions: [
              {
                id: 'ENTERTAINMENT',
                title: 'Entertainment',
              },
            ],
          },
          schedule: {
            subscriptions: [
              {
                id: 'ENTERTAINMENT',
                title: 'Entertainment',
              },
            ],
          },
          downloadSchedule: null,
        },
      ],
    },
  },
};

export const mockHighlightsResponse = {
  show: {
    __typename: 'Show',
    id: 'mac_sh_105304',
    highlights: {
      pageInfo: {
        startCursor: 'MA==',
        endCursor: 'MA==',
        hasNextPage: true,
      },
      content: [
        {
          id: 'mac_114480091',
          title: 'Law & Order: Special Victims Unit',
          synopsis:
            'S12E9 Gray: When a girl from the crowd at a university rape prevention lecture accuses another student of rape, Stabler and Detective Benson are assigned the case.',
          duration: 'PT1H',
          rating: {
            classification: '_16',
            advisories: [],
          },
          season: {
            id: 'mac_s_486426',
            number: 12,
          },
          image: {
            uri:
              'https://images.skyone.co.nz/media/images/stills/content/717499/150b79afa7e5f0e1926a995f0d473fde.jpg',
          },
          number: 9,
          watchProgress: null,
          asset: {
            id: 'macAssetId|OC212640_HD_mac_11448009',
            duration: 'PT1H',
            hasParentalRestriction: false,
          },
          mySchedule: {
            subscriptions: [
              {
                id: 'ENTERTAINMENT',
                title: 'Entertainment',
              },
            ],
          },
          schedule: {
            subscriptions: [
              {
                id: 'ENTERTAINMENT',
                title: 'Entertainment',
              },
            ],
          },
          downloadSchedule: null,
        },
        {
          id: 'mac_114480001',
          title: 'Law & Order: Special Victims Unit',
          synopsis:
            'S12E8 Penetration: FBI Agent Dana Lewis is assaulted by a stranger and asks Detective Benson to have her rape kit tested.',
          duration: 'PT1H',
          rating: {
            classification: '_16',
            advisories: [],
          },
          season: {
            id: 'mac_s_486426',
            number: 12,
          },
          image: {
            uri:
              'https://images.skyone.co.nz/media/images/stills/content/717668/1f05de07a9f2e0d72899240cda0ff6b5.jpg',
          },
          number: 8,
          watchProgress: null,
          asset: {
            id: 'macAssetId|OC212632_HD_mac_11448000',
            duration: 'PT1H',
            hasParentalRestriction: false,
          },
          mySchedule: {
            subscriptions: [
              {
                id: 'ENTERTAINMENT',
                title: 'Entertainment',
              },
            ],
          },
          schedule: {
            subscriptions: [
              {
                id: 'ENTERTAINMENT',
                title: 'Entertainment',
              },
            ],
          },
          downloadSchedule: null,
        },
        {
          id: 'mac_1144801871',
          title: 'Law & Order: Special Victims Unit',
          synopsis:
            'S12E10 Rescue: With Calvin in her care, Benson continues the search for his drug-addict mother, but Detective Stabler notices a strong bond forming between Benson and the boy.',
          duration: 'PT1H',
          rating: {
            classification: '_16',
            advisories: [],
          },
          season: {
            id: 'mac_s_486426',
            number: 12,
          },
          image: {
            uri:
              'https://images.skyone.co.nz/media/images/stills/content/717669/4903ae83975580779936144129ba6301.jpg',
          },
          number: 7,
          watchProgress: null,
          asset: {
            id: 'macAssetId|OC212648_HD_mac_11448018',
            duration: 'PT1H',
            hasParentalRestriction: false,
          },
          mySchedule: {
            subscriptions: [
              {
                id: 'ENTERTAINMENT',
                title: 'Entertainment',
              },
            ],
          },
          schedule: {
            subscriptions: [
              {
                id: 'ENTERTAINMENT',
                title: 'Entertainment',
              },
            ],
          },
          downloadSchedule: null,
        },
        {
          id: 'mac_1144800961',
          title: 'Law & Order: Special Victims Unit',
          synopsis:
            'S12E9 Gray: When a girl from the crowd at a university rape prevention lecture accuses another student of rape, Stabler and Detective Benson are assigned the case.',
          duration: 'PT1H',
          rating: {
            classification: '_16',
            advisories: [],
          },
          season: {
            id: 'mac_s_486426',
            number: 12,
          },
          image: {
            uri:
              'https://images.skyone.co.nz/media/images/stills/content/717499/150b79afa7e5f0e1926a995f0d473fde.jpg',
          },
          number: 6,
          watchProgress: null,
          asset: {
            id: 'macAssetId|OC212640_HD_mac_11448009',
            duration: 'PT1H',
            hasParentalRestriction: false,
          },
          mySchedule: {
            subscriptions: [
              {
                id: 'ENTERTAINMENT',
                title: 'Entertainment',
              },
            ],
          },
          schedule: {
            subscriptions: [
              {
                id: 'ENTERTAINMENT',
                title: 'Entertainment',
              },
            ],
          },
          downloadSchedule: null,
        },
        {
          id: 'mac_1144800051',
          title: 'Law & Order: Special Victims Unit',
          synopsis:
            'S12E8 Penetration: FBI Agent Dana Lewis is assaulted by a stranger and asks Detective Benson to have her rape kit tested.',
          duration: 'PT1H',
          rating: {
            classification: '_16',
            advisories: [],
          },
          season: {
            id: 'mac_s_486426',
            number: 12,
          },
          image: {
            uri:
              'https://images.skyone.co.nz/media/images/stills/content/717668/1f05de07a9f2e0d72899240cda0ff6b5.jpg',
          },
          number: 5,
          watchProgress: null,
          asset: {
            id: 'macAssetId|OC212632_HD_mac_11448000',
            duration: 'PT1H',
            hasParentalRestriction: false,
          },
          mySchedule: {
            subscriptions: [
              {
                id: 'ENTERTAINMENT',
                title: 'Entertainment',
              },
            ],
          },
          schedule: {
            subscriptions: [
              {
                id: 'ENTERTAINMENT',
                title: 'Entertainment',
              },
            ],
          },
          downloadSchedule: null,
        },
      ],
    },
  },
};

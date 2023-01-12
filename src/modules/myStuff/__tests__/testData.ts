// eslint-disable-next-line import/prefer-default-export
import { VideoQualityType } from '@/types/enums/VideoQualityType';

export const myListResponse = {
  myList: [
    {
      __typename: 'Show',
      id: 'skylarkBrandUid|bran_7d55d1f1e9a94ef980c35fcf7d58a4d6',
      title: 'Big Little Lies',
      rating: {
        classification: '_16',
        advisories: [],
      },
      contentTileHorizontal: {
        uri:
          'https://images-dev.skyone.co.nz/media/images/stills/content/1332/3f911973844b5fbb17b740c08ad325d3.jpg',
      },
      contentTileVertical: {
        uri:
          'https://images-dev.skyone.co.nz/media/images/stills/content/1332/6042607107c029671ad8209c8a3b6681.jpg',
      },
      genres: [
        {
          title: 'Drama',
        },
      ],
      numberOfSeasons: 2,
    },
  ],
};

export const subscriptionExceedingProps = {
  contentId: 'contentId',
  contentTitle: 'Big Little Lies',
  contentType: 'Movie',
  subscriptionsRequired: [
    {
      id: 'id',
      title: 'SOHO',
    },
  ],
};

export const deviceVideoQualityResponse = {
  '1234567890123456789': VideoQualityType.AUTOMATIC,
};

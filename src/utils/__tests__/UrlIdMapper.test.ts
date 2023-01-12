import { urlToId, idToUrl } from '../UrlIdMapper';

describe('UrlIdMapper', () => {
  it('urlToId', () => {
    expect(urlToId('/api/brands/bran_7d55d1f1e9a94ef980c35fcf7d58a4d6/')).toBe(
      'bran_7d55d1f1e9a94ef980c35fcf7d58a4d6',
    );

    expect(urlToId('/api/seasons/seas_6a95fc5f09144d6f9cf9afd25da4c5fd/')).toBe(
      'seas_6a95fc5f09144d6f9cf9afd25da4c5fd',
    );

    expect(urlToId('/api/episodes/epis_80bf8ed4b6b24cb2a9f4f8c3454f5826/')).toBe(
      'epis_80bf8ed4b6b24cb2a9f4f8c3454f5826',
    );

    expect(urlToId('/api/assets/asse_6699bb4f0626490a8c5a68160f1fcb74/')).toBe(
      'asse_6699bb4f0626490a8c5a68160f1fcb74',
    );

    expect(urlToId('5fbhwqYYh4YwUoEs582mq5')).toBe('5fbhwqYYh4YwUoEs582mq5');
  });

  it('idToUrl', () => {
    expect(idToUrl('bran_7d55d1f1e9a94ef980c35fcf7d58a4d6')).toBe(
      '/api/brands/bran_7d55d1f1e9a94ef980c35fcf7d58a4d6/',
    );

    expect(idToUrl('seas_6a95fc5f09144d6f9cf9afd25da4c5fd')).toBe(
      '/api/seasons/seas_6a95fc5f09144d6f9cf9afd25da4c5fd/',
    );

    expect(idToUrl('epis_80bf8ed4b6b24cb2a9f4f8c3454f5826')).toBe(
      '/api/episodes/epis_80bf8ed4b6b24cb2a9f4f8c3454f5826/',
    );

    expect(idToUrl('asse_6699bb4f0626490a8c5a68160f1fcb74')).toBe(
      '/api/assets/asse_6699bb4f0626490a8c5a68160f1fcb74/',
    );

    expect(idToUrl('5fbhwqYYh4YwUoEs582mq5')).toBe('5fbhwqYYh4YwUoEs582mq5');
  });
});

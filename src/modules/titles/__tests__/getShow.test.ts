import { GET_SHOW } from '../queries/getShow';

describe('test get show queries variations', () => {
  test('retrieve get show full query', async () => {
    const getShowFullResponse = GET_SHOW();
    expect(GET_SHOW()).toEqual(getShowFullResponse);
  });

  test('retrieve get show no episodes', async () => {
    const getShowFullResponse = GET_SHOW();
    expect(GET_SHOW(false)).not.toEqual(getShowFullResponse);
  });

  test('retrieve get show no slots', async () => {
    const getShowFullResponse = GET_SHOW();
    expect(GET_SHOW(true, false)).not.toEqual(getShowFullResponse);
  });

  test('retrieve get show no schedules', async () => {
    const getShowFullResponse = GET_SHOW();
    expect(GET_SHOW(true, true, false)).not.toEqual(getShowFullResponse);
  });
});

import { useSelector } from 'react-redux';
import useBrandDetailsData from '../useBrandDetailsData';
import { showResult } from './testData';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
  useCallback: jest.fn(),
  useMemo: jest.fn(),
}));

describe('useBrandDetailsData', () => {
  it('return correct data', () => {
    useSelector
      // mock selectors.titles.getBrand
      .mockReturnValueOnce(() => showResult)
      // mock selectors.titles.brandIsLoading
      .mockReturnValueOnce(false)
      // mock selectors.titles.getSelectedSeason
      .mockReturnValueOnce(() => showResult.seasons[0])
      // mock selectors.titles.showHighlights
      .mockReturnValueOnce(() => showResult.highlights)
      // mock selectors.titles.brandIsLoading
      .mockReturnValueOnce(false)
      // mock selectors.titles.brandError
      .mockReturnValueOnce(null)
      // mock selectors.parentalPin.isLoading
      .mockReturnValueOnce(false);
    const {
      isLoading,
      brand,
      isSport,
      defaultSelectedSeason,
      highlights,
      synopsis,
      cast,
      paginationLoading,
      hasNextPage,
      brandIsLoading,
      brandError,
      parentalPinIsLoading,
    } = useBrandDetailsData('some_brand_id', false);
    expect(isLoading).toBeFalsy();
    expect(brand).toEqual(showResult);
    expect(isSport).toBeFalsy();
    expect(defaultSelectedSeason).toEqual(showResult.seasons[0]);
    expect(highlights).toEqual(showResult.highlights);
    expect(synopsis).toEqual(showResult.synopsis);
    expect(cast).toEqual('');

    expect(paginationLoading).toEqual(false);
    expect(hasNextPage).toEqual(true);

    expect(brandIsLoading).toEqual(false);
    expect(brandError).toEqual(null);
    expect(parentalPinIsLoading).toEqual(false);
  });

  it('return correct data for null brand', () => {
    useSelector
      // mock selectors.titles.getBrand
      .mockReturnValueOnce(() => null)
      // mock selectors.titles.brandIsLoading
      .mockReturnValueOnce(false)
      // mock selectors.titles.getSelectedSeason
      .mockReturnValueOnce(() => null)
      // mock selectors.titles.showHighlights
      .mockReturnValueOnce(() => null)
      // mock selectors.titles.brandIsLoading
      .mockReturnValueOnce(false)
      // mock selectors.titles.brandError
      .mockReturnValueOnce(null)
      // mock selectors.parentalPin.isLoading
      .mockReturnValueOnce(false);
    const {
      isLoading,
      brand,
      isSport,
      defaultSelectedSeason,
      highlights,
      synopsis,
      cast,
      paginationLoading,
      hasNextPage,
      brandIsLoading,
      brandError,
      parentalPinIsLoading,
    } = useBrandDetailsData('some_brand_id', true);
    expect(isLoading).toBeFalsy();
    expect(brand).toBeNull();
    expect(isSport).toBeFalsy();
    expect(defaultSelectedSeason).toBeNull();
    expect(highlights).toBeNull();
    expect(synopsis).toBeUndefined();
    expect(cast).toBeUndefined();

    expect(paginationLoading).toBeUndefined();
    expect(hasNextPage).toBeUndefined();

    expect(brandIsLoading).toBeFalsy();
    expect(brandError).toBeNull();
    expect(parentalPinIsLoading).toBeFalsy();
  });
});

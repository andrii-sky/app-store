import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useSelector from '@/hooks/useSelector';
import { EpisodesPage, Maybe, Movie, Scalars, Season, Show } from '@/types/graph-ql';
import utils from '@/utils';
import actions from '@/actions';
import selectors from '@/selectors';
import { WhatsOnTVTabType } from '@/types/enums';
import { isNotNilOrEmpty } from '@/utils/utils';

export interface BrandDetailsData {
  isLoading: boolean;
  brand: Movie | Show;
  isSport?: boolean;
  defaultSelectedSeason?: Maybe<Season>;
  highlights?: EpisodesPage;
  onHighlightsPaginate: Function;
  synopsis?: Maybe<Scalars['String']>;
  cast?: string;
  onSelectSeason?: Function;
  fetchBrand: () => any;
  brandIsLoading: boolean;
  brandError: any;
  parentalPinIsLoading: boolean;
  defaultWhatsOnTVTab?: WhatsOnTVTabType;
  hasNextPage?: boolean;
  paginationLoading?: boolean;
  getBrandImage: (param: string) => string;
}

const useBrandDetailsData = (
  brandId: string,
  isShow: boolean,
  initialRailSize?: number,
): BrandDetailsData => {
  const dispatch = useDispatch();

  const brand = useSelector(selectors.titles.getBrand)(brandId);
  const isLoading = useSelector(selectors.titles.brandIsLoading);
  const defaultSelectedSeason = useSelector(selectors.titles.getSelectedSeason)(brandId);
  const highlights = useSelector(selectors.titles.showHighlights)(brandId);
  const brandIsLoading = useSelector(selectors.titles.brandIsLoading);
  const brandError = useSelector(selectors.titles.brandError);
  const parentalPinIsLoading = useSelector(selectors.parentalPin.isLoading);

  const characters = isShow ? brand?.defaultEpisode?.characters : brand?.characters;

  let synopsis: Maybe<string> | undefined;
  let isSport: boolean | undefined;
  let cast: string | undefined;
  let defaultWhatsOnTVTab: WhatsOnTVTabType | undefined;
  let hasNextPage: boolean | undefined;
  let paginationLoading: boolean | undefined;

  if (isNotNilOrEmpty(brand)) {
    synopsis = utils.hero.getSynopsis(brand);
    isSport = utils.title.isSport(brand);
    cast = utils.title.getCharactersText(characters);
    defaultWhatsOnTVTab = utils.title.getDefaultWhatsOnTVTab(brand);
  }

  if (isNotNilOrEmpty(highlights?.content)) {
    hasNextPage = utils.pagination.hasNextPage(highlights);
    paginationLoading = utils.pagination.isLoading(highlights);
  }

  const onHighlightsPaginate = useCallback(
    nextPageSize => {
      dispatch(actions.titles.fetchShowHighlights(brandId, nextPageSize));
    },
    [brandId, dispatch],
  );

  const getBrandImage = useCallback(
    defaultBrandImage => brand && utils.hero.getImage(brand, defaultBrandImage),
    [brand],
  );

  useEffect(() => {
    if (brandId) {
      dispatch(actions.titles.fetchBrand(brandId, isShow, initialRailSize));
    }
  }, [brandId, isShow, dispatch, initialRailSize]);

  const fetchBrand = useCallback(() => dispatch(actions.titles.fetchBrand(brandId, isShow)), [
    brandId,
    isShow,
    dispatch,
  ]);

  const onSelectSeason = useCallback(
    seasonId => {
      dispatch(actions.titles.selectSeason(brandId, seasonId));
    },
    [brandId, dispatch],
  );

  return {
    isLoading,
    brand,
    isSport,
    defaultSelectedSeason,
    highlights,
    onHighlightsPaginate,
    synopsis,
    cast,
    onSelectSeason,
    fetchBrand,
    brandIsLoading,
    brandError,
    parentalPinIsLoading,
    defaultWhatsOnTVTab,
    hasNextPage,
    paginationLoading,
    getBrandImage,
  };
};

export default useBrandDetailsData;

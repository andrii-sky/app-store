import { ContentPage, EpisodesPage } from '@/types/graph-ql';
import { APImoduleStatus } from '@/utils/api/types';

type ContentPageExt = ContentPage & APImoduleStatus;
type EpisodesPageExt = EpisodesPage & APImoduleStatus;
type PaginationData = ContentPageExt | EpisodesPageExt;

// For the reducers
/* eslint-disable no-param-reassign */
export const reducerOnRequest = (state: PaginationData) => {
  state.isLoading = true;
};

export const reducerOnSuccess = (state: PaginationData, responseData: PaginationData) => {
  state.isLoading = false;
  // Nullify the error state on a successful api response so that user can scroll more rails
  // in subsequent attemtps. Enhance when implementing https://skynz.atlassian.net/browse/SAAA-4881
  state.error = null;
  state.pageInfo = responseData.pageInfo;
  console.log('BUGAGA 5: ', responseData?.content);
  if (Array.isArray(responseData?.content)) {
    state.content = state.content || [];
    state.content.push(...(responseData.content as any));
  }
};

export const reducerOnFailure = (state: PaginationData, error: any) => {
  state.isLoading = false;
  // UPDATE: due to implementation on native-app error somehow should be set to null after a shot pause
  // as there is no way for user to do it by scrolling back like in WEB
  state.error = error;
};
/* eslint-enable no-param-reassign */

export const getContent = (data?: PaginationData): any => data?.content;

export const isLoading = (data?: PaginationData): boolean => !!data?.isLoading;

export const isLoadingError = (data?: PaginationData): boolean => !!data?.error;

export const hasNextPage = (data?: PaginationData): boolean => !!data?.pageInfo.hasNextPage;

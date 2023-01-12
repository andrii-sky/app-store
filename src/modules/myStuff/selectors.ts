import { createSelector } from 'reselect';

import { VideoQualityType } from '@/types/enums/VideoQualityType';
import { user } from '@/modules/auth/selectors';
import { namespace } from './constants';
import reducer from './reducer';

const moduleState = rootState => rootState[namespace] as ReturnType<typeof reducer>;

const myListState = createSelector(moduleState, state => state.myList);

export const myList = createSelector(myListState, contentRoot => contentRoot.data);

export const myListIsLoading = createSelector(myListState, contentRoot => contentRoot.isLoading);

export const myListError = createSelector(myListState, contentRoot => contentRoot.error);

const deviceVideoQualityState = createSelector(moduleState, state => state.deviceVideoQuality);

export const deviceVideoQuality = createSelector(
  deviceVideoQualityState,
  user,
  (contentRoot, currentUser) => contentRoot.data[currentUser?.sub] || VideoQualityType.AUTOMATIC,
);

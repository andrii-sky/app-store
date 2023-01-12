import { createSelector } from 'reselect';
// eslint-disable-next-line @typescript-eslint/camelcase
import jwt_decode from 'jwt-decode';
import { isNilOrEmpty } from '@/utils/utils';
import { namespace } from './constants';
import reducer from './reducer';
import memoize from '../../utils/fastMemoize';

const moduleState = rootState => rootState[namespace] as ReturnType<typeof reducer>;

export const accessToken = createSelector(moduleState, state => state.accessToken);
export const user = createSelector(moduleState, state => state.user);
export const error = createSelector(moduleState, state => state.error);
export const getDecodeConfig = createSelector(accessToken, token =>
  memoize((configKey: string) => {
    if (!isNilOrEmpty(token)) {
      const decodedToken: any = jwt_decode(token);
      return decodedToken?.[configKey];
    }
  }),
);
export const config = createSelector(
  moduleState,
  state => state.config?.data?.experience?.config?.auth,
);

export const isAuthLoading = createSelector(moduleState, state => state.isLoading);

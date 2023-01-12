import { createSelector } from 'reselect';
import { parse, toSeconds } from 'iso8601-duration';
import { HeroContent } from '@/types/graph-ql';
import { isNotNilOrEmpty } from '@/utils/utils';
import { createRailsSelectors } from '@/utils/Rails';
import { namespace } from './constants';
import reducer from './reducer';

type State = {
  [namespace]: ReturnType<typeof reducer>;
};

// deprecated, use heroes instead
export const hero = createSelector(
  (state: State) => {
    const heroList = state.home.content.data?.heroSet?.heroList as Array<HeroContent>;
    return isNotNilOrEmpty(heroList) ? heroList[0] : undefined;
  },
  h => h,
);

export const heroes = createSelector(
  (state: State) => state.home.content.data?.heroSet?.heroList,
  h => h,
);

export const heroesDuration = createSelector(
  (state: State) => state.home.content.data?.heroSet?.displayTime,
  duration => (isNotNilOrEmpty(duration) ? toSeconds(parse(duration)) : 5),
);

export const {
  rails,
  rail,
  isLoading,
  error,
  railsShallow,
  continueWatchingRailId,
} = createRailsSelectors(namespace, reducer);

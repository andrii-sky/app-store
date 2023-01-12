import { createRailsSelectors } from '@/utils/Rails';
import { namespace } from './constants';
import reducer from './reducer';

export const {
  rails,
  rail,
  isLoading,
  error,
  railsShallow,
  continueWatchingRailId,
} = createRailsSelectors(namespace, reducer);

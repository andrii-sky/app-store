import { useSelector } from 'react-redux';
import isEqual from 'lodash.isequal';
// To prevents extra re-renders caused by useSelector hook this method deeply compaire store objects using lodash isEqual
// https://react-redux.js.org/api/hooks#stale-props-and-zombie-children
const useShallowEqualSelector = (selector: any) => {
  return useSelector(selector, isEqual);
};

export default useShallowEqualSelector;

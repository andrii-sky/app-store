import memoize from 'lodash.memoize';
import values from 'lodash.values';

export default function (fn: Function) {
  return memoize(fn, (...args: any[]) => values(args).join('_'));
}

import { curry, chain, map, zipObj } from 'ramda';

// eslint-disable-next-line import/prefer-default-export
export const objFromListWith = curry((fn, list) => chain(zipObj, map(fn))(list));

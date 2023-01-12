import { curry, values, sortWith, sortBy } from 'ramda';

export const listFromObjOrderby = curry((fn, obj) => sortBy(fn, values(obj)));

export const listFromObjOrderWith = curry((fns, obj) => sortWith(fns, values(obj)));

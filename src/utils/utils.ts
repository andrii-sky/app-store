import { isEmpty, isNil } from 'ramda';

export const isNilOrEmpty = obj => isNil(obj) || isEmpty(obj);

export const isNotNilOrEmpty = obj => !isNil(obj) && !isEmpty(obj);

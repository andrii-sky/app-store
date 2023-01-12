import { combineReducers } from 'redux';
import { getReducers } from '@/utils/Section';
import { namespace } from '@/modules/myHub/constants';

export default combineReducers(getReducers(namespace));

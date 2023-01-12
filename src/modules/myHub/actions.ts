import { rail } from '@/modules/myHub/selectors';
import { getActions } from '@/utils/Section';
import { namespace } from './constants';

export const { fetchContent, fetchRailById } = getActions(namespace, rail);

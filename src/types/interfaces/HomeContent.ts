import { Hero } from '../graph-ql';
import { PaginationGroup } from '../types/PaginationGroup';

export interface HomeContent {
  heroSet?: Hero;
  rails?: PaginationGroup[];
}

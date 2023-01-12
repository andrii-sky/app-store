import { Group } from '@/types/graph-ql';

export type PaginationGroup = Group & { isLoading?: boolean; error: any };

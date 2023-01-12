import { ChannelCategoryType } from '../enums/ChannelCategoryType';

export interface ChannelCategory {
  id: string;
  title: string;
  position: number;
  type: ChannelCategoryType;
}

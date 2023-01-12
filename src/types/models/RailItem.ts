import { Type, plainToClass } from 'class-transformer';

import { urlToId } from '../../utils/UrlIdMapper';
import { ImageAsset } from './ImageAsset';
import { BrandType } from '../enums/BrandType';

// eslint-disable-next-line import/prefer-default-export
export class RailItem {
  public static createInstance(plainObject: any): RailItem {
    return plainToClass(RailItem, plainObject);
  }

  public static createInstances(plainObjectArray: any[]): RailItem[] {
    return plainToClass(RailItem, plainObjectArray);
  }

  public url!: string;

  public uid!: string;

  public contentType!: BrandType;

  public title!: string;

  public synopsis!: string;

  public year!: string;

  public genres!: string[];

  public rank!: string;

  public images!: ImageAsset[];

  public numberOfSeasons!: number;

  public durationInSeconds?: number;

  public dataSourceId?: string;

  @Type(() => Date)
  public channelSlotStart?: Date;

  @Type(() => Date)
  public channelSlotEnd?: Date;

  public channelProgrammeName?: string;

  public get id(): string {
    return urlToId(this.url);
  }
}

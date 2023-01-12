import { Type, plainToClass } from 'class-transformer';

import { BrandType } from '../enums/BrandType';
import { Season } from './Season';
import { ImageAsset } from './ImageAsset';
import { Episode } from './Episode';
import { urlToId } from '../../utils/UrlIdMapper';

// eslint-disable-next-line import/prefer-default-export
export class Brand {
  public static createInstance(plainObject: any): Brand {
    return plainToClass(Brand, plainObject);
  }

  public static createInstances(plainObjectArray: any[]): Brand[] {
    return plainToClass(Brand, plainObjectArray);
  }

  public url!: string;

  public contentType!: BrandType;

  public title!: string;

  public synopsis!: string;

  public year!: string;

  public genres!: string[];

  public rank!: string;

  @Type(() => ImageAsset)
  public images!: ImageAsset[];

  public numberOfSeasons!: number;

  @Type(() => Season)
  public seasons?: Season[];

  public durationInSeconds?: number;

  /**
   * The season of the default episode to show or play
   *
   * @type {Season}
   * @memberof Brand
   */
  @Type(() => Season)
  public season?: Season;

  /**
   * Default episode to show or play
   *
   * @type {Episode}
   * @memberof Brand
   */
  @Type(() => Episode)
  public episode!: Episode;

  public get id(): string {
    return urlToId(this.url);
  }
}

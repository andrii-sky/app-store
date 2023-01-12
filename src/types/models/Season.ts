import { Type, plainToClass } from 'class-transformer';

import { ImageAsset } from './ImageAsset';
import { Episode } from './Episode';
import { AssetType } from '../enums/AssetType';
import { urlToId } from '../../utils/UrlIdMapper';

// eslint-disable-next-line import/prefer-default-export
export class Season {
  public static createInstance(plainObject: any): Season {
    return plainToClass(Season, plainObject);
  }

  public static createInstances(plainObjectArray: any[]): Season[] {
    return plainToClass(Season, plainObjectArray);
  }

  public url!: string;

  public contentType!: AssetType;

  public seasonNumber!: number;

  public title!: string;

  public synopsis!: string;

  public albumId!: string;

  public year!: string;

  public genres?: string[];

  @Type(() => ImageAsset)
  public images!: ImageAsset[];

  public parentUrl!: string;

  @Type(() => Episode)
  public episodes!: Episode[];

  public get id(): string {
    return urlToId(this.url);
  }

  public get brandId(): string {
    return urlToId(this.parentUrl);
  }
}

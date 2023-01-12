import { Type, plainToClass } from 'class-transformer';

import { urlToId } from '../../utils/UrlIdMapper';
import { AssetType } from '../enums/AssetType';
import { MediaAsset } from './MediaAsset';
import { ImageAsset } from './ImageAsset';

// eslint-disable-next-line import/prefer-default-export
export class Episode {
  public static createInstance(plainObject: any): Episode {
    return plainToClass(Episode, plainObject);
  }

  public static createInstances(plainObjectArray: any[]): Episode[] {
    return plainToClass(Episode, plainObjectArray);
  }

  public url!: string;

  public contentType!: AssetType;

  public number!: number;

  public title!: string;

  public synopsis!: string;

  public albumId!: string;

  public year!: string;

  public genres?: string[];

  public subtitle?: string;

  @Type(() => ImageAsset)
  public images!: ImageAsset[];

  public parentUrl!: string;

  @Type(() => MediaAsset)
  public mediaAssets!: MediaAsset[];

  public get id(): string {
    return urlToId(this.url);
  }

  public get seasonId(): string {
    return urlToId(this.parentUrl);
  }
}

import { plainToClass } from 'class-transformer';

import { urlToId } from '../../utils/UrlIdMapper';

// eslint-disable-next-line import/prefer-default-export
export class MediaAsset {
  public static createInstance(plainObject: any): MediaAsset {
    return plainToClass(MediaAsset, plainObject);
  }

  public static createInstances(plainObjectArray: any[]): MediaAsset[] {
    return plainToClass(MediaAsset, plainObjectArray);
  }

  public url!: string;

  public durationInSeconds!: number;

  public rendition!: string;

  public uid!: string;

  public dataSourceId!: string;

  public rating!: string;

  public get id(): string {
    return urlToId(this.url);
  }
}

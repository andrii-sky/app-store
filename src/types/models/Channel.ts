import { plainToClass, Type } from 'class-transformer';
import { ImageAsset } from './ImageAsset';
import { OVP } from './OVP';

// eslint-disable-next-line import/prefer-default-export
export class Channel {
  public static createInstance(plainObject: any): Channel {
    return plainToClass(Channel, plainObject);
  }

  public static createInstances(plainObjectArray: any[]): Channel[] {
    return plainToClass(Channel, plainObjectArray);
  }

  public uid!: string;

  public name!: string;

  public url!: string;

  public type!: string;

  @Type(() => OVP)
  public ovps!: OVP[];

  @Type(() => ImageAsset)
  public images!: ImageAsset[];

  public dataSourceId!: string;
}

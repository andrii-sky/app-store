import { plainToClass, Type } from 'class-transformer';
import { WatchStatus } from '../enums/WatchStatus';

// eslint-disable-next-line import/prefer-default-export
export class PlaybackPosition {
  public static createInstance(plainObject: any): PlaybackPosition {
    return plainToClass(PlaybackPosition, plainObject);
  }

  public static createInstances(plainObjectArray: any[]): PlaybackPosition[] {
    return plainToClass(PlaybackPosition, plainObjectArray);
  }

  public position!: number;

  public duration!: number;

  public contentId!: string;

  public watchStatus!: WatchStatus;

  @Type(() => Date)
  public created!: string;

  @Type(() => Date)
  public updated!: string;
}

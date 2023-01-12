import { plainToClass } from 'class-transformer';
import { LinearPlaybackSources, VodPlaybackSources } from '../graph-ql';

export class PlaybackMeta {
  public static createInstance(plainObject: any): PlaybackMeta {
    return plainToClass(PlaybackMeta, plainObject);
  }

  public static createInstances(plainObjectArray: any[]): PlaybackMeta[] {
    return plainToClass(PlaybackMeta, plainObjectArray);
  }

  public typename!: string;

  public mediaAssetId!: string;

  public id!: string;

  public linearSource!: LinearPlaybackSources;

  public vodSource!: VodPlaybackSources;
}
export interface KeySystems {
  [key: string]: any;
}

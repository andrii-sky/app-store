import { plainToClass, Type } from 'class-transformer';
import { Episode } from './Episode';

// eslint-disable-next-line import/prefer-default-export
export class EpgProgramme {
  public static createInstance(plainObject: any): EpgProgramme {
    return plainToClass(EpgProgramme, plainObject);
  }

  public static createInstances(plainObjectArray: any[]): EpgProgramme[] {
    return plainToClass(EpgProgramme, plainObjectArray);
  }

  public uid!: string;

  public dataSourceId?: string;

  public ratings?: any[];

  @Type(() => Episode)
  public episode?: Episode;
}

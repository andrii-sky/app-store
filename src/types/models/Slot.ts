import { plainToClass, Type } from 'class-transformer';
import { EpgProgramme } from './EpgProgramme';

// eslint-disable-next-line import/prefer-default-export
export class Slot {
  public static createInstance(plainObject: any): Slot {
    return plainToClass(Slot, plainObject);
  }

  public static createInstances(plainObjectArray: any[]): Slot[] {
    return plainToClass(Slot, plainObjectArray);
  }

  public uid!: string;

  @Type(() => Date)
  public start!: Date;

  @Type(() => Date)
  public end!: Date;

  @Type(() => EpgProgramme)
  public programme!: EpgProgramme;
}

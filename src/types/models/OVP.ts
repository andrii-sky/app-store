import { plainToClass } from 'class-transformer';

// eslint-disable-next-line import/prefer-default-export
export class OVP {
  public static createInstance(plainObject: any): OVP {
    return plainToClass(OVP, plainObject);
  }

  public static createInstances(plainObjectArray: any[]): OVP[] {
    return plainToClass(OVP, plainObjectArray);
  }

  public accountUrl!: string;

  public contentId!: string;
}

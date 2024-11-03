import { registerDecorator, ValidationOptions } from 'class-validator';
import { validate } from './class-validator-custom/time';

export function IsTimeFormat(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isTimeFormat',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: validate,
    });
  };
}

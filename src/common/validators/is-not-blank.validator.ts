import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

@ValidatorConstraint({ name: 'isNotBlank', async: false })
class IsNotBlankConstraint implements ValidatorConstraintInterface {
  validate(propertyValue: string, args: ValidationArguments) {
    return typeof propertyValue === 'string' && propertyValue.trim().length > 0;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must not contain empty spaces`;
  }
}

export const IsNotBlank: any = (property: string, validationOptions?: ValidationOptions) => {
  return (object: Record<string, unknown>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsNotBlankConstraint
    });
  };
};

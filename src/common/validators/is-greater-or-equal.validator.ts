import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

@ValidatorConstraint({ name: 'isGreaterOrEqual', async: false })
class IsGreaterOrEqualConstraint implements ValidatorConstraintInterface {
  validate(propertyValue: string, args: ValidationArguments) {
    return propertyValue >= args.object[args.constraints[0]];
  }

  defaultMessage(args: ValidationArguments) {
    return `"${args.property}" must be greaterOrEquals "${args.constraints[0]}"`;
  }
}

export const IsGreaterOrEqual = (property: string, validationOptions?: ValidationOptions) => {
  return (object: Record<string, unknown>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsGreaterOrEqualConstraint
    });
  };
};

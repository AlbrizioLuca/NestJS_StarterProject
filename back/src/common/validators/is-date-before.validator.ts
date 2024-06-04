import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsDateBefore(property: string, validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'IsDateBefore',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: string, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as { [key: string]: string })[relatedPropertyName];
                    if (relatedValue === undefined || value === null) {
                        return true;
                    }
                    const dateValue = Date.parse(value.split('-').reverse().join('-'));
                    const dateRelatedValue = Date.parse(relatedValue.split('-').reverse().join('-'));
                    return isNaN(dateValue) || isNaN(dateRelatedValue) ? false : dateValue < dateRelatedValue;
                }
            }
        })
    }
}
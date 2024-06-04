import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { IsUniqueConstraintInput } from './is-unique.validator';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {

    constructor(private readonly entityManager: EntityManager) { }
    async validate(
        value: any,
        args?: ValidationArguments
    ): Promise<boolean> {
        try {
            const { tableName, column }: IsUniqueConstraintInput = args.constraints[0];

            const result = await this.entityManager
                .getRepository(tableName)
                .createQueryBuilder(tableName)
                .where({ [column]: value })
                .getExists()

            return result ? false : true;
        } catch (error) {
            console.log("error: ", error);

        }
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        // return custom field message
        const field: string = validationArguments.property
        return `${field} already exists`
    }
}

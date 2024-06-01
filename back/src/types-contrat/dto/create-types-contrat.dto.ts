import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { TypeContratEnum } from '../enums/types-contrat.enum';

export class CreateTypesContratDTO {

    @ApiProperty({ example: 'Assurance Vehicule' })
    @IsNotEmpty()
    @IsIn(Object.values(TypeContratEnum))
    @IsString()
    type: TypeContratEnum;

    @ApiProperty({ example: '{ ... }' })
    @IsObject()
    informations_requises: string;

}
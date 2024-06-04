import { PartialType } from '@nestjs/mapped-types';
import { CreateAdresseDTO } from './create-adresse.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';
import { DepartementsFranceEnum, RegionsFranceEnum, TypeVoieEnum } from '../../enums';

export class UpdateAdresseDTO extends PartialType(CreateAdresseDTO) {

    @ApiProperty({ example: true })
    @IsNotEmpty()
    @IsBoolean()
    adresse_principale: boolean;

    @ApiProperty({ example: '14' })
    @IsNotEmpty()
    @IsNumberString()
    numero_voie: string;

    @ApiProperty({ example: 'Place' })
    @IsNotEmpty()
    @IsIn(Object.values(TypeVoieEnum))
    @IsString()
    type_voie: TypeVoieEnum;

    @ApiProperty({ example: 'de la Comédie' })
    @IsNotEmpty()
    @IsString()
    nom_voie: string;

    @ApiProperty({ example: '' })
    @IsOptional()
    @IsString()
    info_complementaires?: string;

    @ApiProperty({ example: 'Montpellier' })
    @IsNotEmpty()
    @IsString()
    ville: string

    @ApiProperty({ example: '34000' })
    @IsNotEmpty()
    @IsNumberString()
    code_postal: string;

    @ApiProperty({ example: 'Hérault' })
    @IsNotEmpty()
    @IsIn(Object.values(DepartementsFranceEnum))
    @IsString()
    departement: DepartementsFranceEnum;

    @ApiProperty({ example: 'Occitanie' })
    @IsNotEmpty()
    @IsString()
    @IsIn(Object.values(RegionsFranceEnum))
    region: RegionsFranceEnum

    @ApiProperty({ example: 'France' })
    @IsNotEmpty()
    @IsString()
    pays: string;
}

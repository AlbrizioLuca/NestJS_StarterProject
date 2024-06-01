import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, IsNotEmpty, IsNumberString, IsOptional, IsString, Matches, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SituationFamilialeEnum, GenreEnum } from '../../enums';
import { CreateAdresseDTO } from '../adresse/create-adresse.dto';

export class CreateProfilDTO {
    @ApiProperty({ example: 'Monsieur' })
    @IsNotEmpty()
    @IsIn(Object.values(GenreEnum))
    @IsString()
    genre: GenreEnum;

    @ApiProperty({ example: 'Juste' })
    @IsNotEmpty()
    @IsString()
    @Matches(/^(?![- ])[a-zA-ZÀ-ÿ-]*[^-]$/,
        { message: 'The firstname must not contain special characters or numbers' })
    nom: string;

    @ApiProperty({ example: 'Leblanc' })
    @IsNotEmpty()
    @IsString()
    @Matches(/^(?![- ])[a-zA-ZÀ-ÿ-]*[^-]$/,
        { message: 'The lastname must not contain special characters or numbers' })
    prenom: string;

    @ApiProperty({ example: '0612345789' })
    @IsNotEmpty()
    @IsNumberString()
    @Matches(/^0\d{9}$/,
        { message: 'In the expected French format, the phone number must be 10 digits long and begin with 0' })
    telephone: string;

    @ApiProperty({ example: '11/07/1982' })
    @IsNotEmpty()
    @IsString()
    @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
        { message: 'Expected french format, so the date format must be DD/MM/YYYY' })
    date_naissance: string;

    @ApiProperty({ example: 'Cadre' })
    @IsNotEmpty()
    @IsString()
    profession: string;

    @ApiProperty({ example: 'Célibataire' })
    @IsNotEmpty()
    @IsIn(Object.values(SituationFamilialeEnum))
    @IsString()
    situation_familiale: string;

    @ApiProperty({ type: [CreateAdresseDTO] })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateAdresseDTO)
    adresses?: CreateAdresseDTO[];
}
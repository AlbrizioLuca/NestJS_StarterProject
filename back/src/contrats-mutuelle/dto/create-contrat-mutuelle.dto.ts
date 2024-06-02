import { IsNumber, IsNumberString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContratMutuelleDTO {

    @ApiProperty({ example: '1 82 07 34 789 845' })
    @IsNumberString()
    numero_securite_sociale: string;

    @ApiProperty({ example: 2 })
    @IsNumber()
    nombre_personnes: number;

    // @ApiProperty({ type: () => ConjointDTO })
    // @IsOptional()
    // @ValidateNested()
    // @Type(() => ConjointDTO)
    // conjoint: ConjointDTO;

    // @ApiProperty({ type: () => [EnfantDTO] })
    // @IsOptional()
    // @ValidateNested({ each: true })
    // @Type(() => EnfantDTO)
    // enfants: EnfantDTO[];

    @ApiProperty({ example: 'Oui' })
    @IsString()
    depassement_honoraires: string;

    @ApiProperty({ example: 'Oui' })
    @IsString()
    hospitalisation: string;

    @ApiProperty({ example: 'Oui' })
    @IsString()
    optique: string;

    @ApiProperty({ example: 'Oui' })
    @IsString()
    dentaire: string;

    @ApiProperty({ example: 'Oui' })
    @IsString()
    aide_auditive: string;
}

// export class ConjointDTO {
//     @ApiProperty({ example: GenreEnum.MADAME })
//     @IsString()
//     genre: GenreEnum;

//     @ApiProperty({ example: 'Marlène' })
//     @IsString()
//     prenom: string;

//     @ApiProperty({ example: 'Sassoeur' })
//     @IsString()
//     nom: string;

//     @ApiProperty({ example: '23/08/1985' })
//     @IsString()
//     date_naissance: string;

//     @ApiProperty({ example: '2 85 08 34 123 845' })
//     @IsNumberString()
//     numero_securite_sociale: string;

//     @ApiProperty({ example: 'Professeure des écoles' })
//     @IsString()
//     profession: string;
// }

// export class EnfantDTO {
//     @ApiProperty({ example: GenreEnum.FILLE })
//     @IsString()
//     genre: GenreEnum;

//     @ApiProperty({ example: 'Lucia' })
//     @IsString()
//     prenom: string;

//     @ApiProperty({ example: 'Leblanc' })
//     @IsString()
//     nom: string;

//     @ApiProperty({ example: '10/07/2018' })
//     @IsString()
//     date_naissance: string;

//     @ApiProperty({ example: '2 18 07 34 123 456' })
//     @IsString()
//     numero_securite_sociale: string;
// }

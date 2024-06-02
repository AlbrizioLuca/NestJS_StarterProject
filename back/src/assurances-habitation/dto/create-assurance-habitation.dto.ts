import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsDate, IsPositive } from 'class-validator';

export class CreateAssuranceHabitationDTO {
    @ApiProperty({ example: 'Appartement' })
    @IsString()
    type_logement: string;

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsPositive()
    etage_appartement: number;

    @ApiProperty({ example: '2022-01-01' })
    @IsDate()
    date_enmenagement: string;

    @ApiProperty({ example: true })
    @IsBoolean()
    proprietaire: boolean;

    @ApiProperty({ example: false })
    @IsBoolean()
    locataire: boolean;

    @ApiProperty({ example: true })
    @IsBoolean()
    residence_principale: boolean;

    @ApiProperty({ example: false })
    @IsBoolean()
    residence_secondaire: boolean;

    @ApiProperty({ example: '12 mois' })
    @IsString()
    periode_inhabitation: string;

    @ApiProperty({ example: 150000 })
    @IsNumber()
    @IsPositive()
    estimation_capital: number;

    @ApiProperty({ example: true })
    @IsBoolean()
    resiliation_3_dernieres_annees: boolean;

    @ApiProperty({ example: 2 })
    @IsNumber()
    @IsPositive()
    nombre_sinistres_3_dernieres_annees: number;

    @ApiProperty({ example: false })
    @IsBoolean()
    logement_professionnel: boolean;

    @ApiProperty({ example: 3 })
    @IsNumber()
    @IsPositive()
    personnes_foyer: number;

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsPositive()
    enfants_foyer: number;

    @ApiProperty({ example: 5 })
    @IsNumber()
    @IsPositive()
    anciennete_logement: number;

    @ApiProperty({ example: 65 })
    @IsNumber()
    @IsPositive()
    surface_habitable: number;

    @ApiProperty({ example: 3 })
    @IsNumber()
    @IsPositive()
    nombre_pieces: number;

    @ApiProperty({ example: 'Chauffage central' })
    @IsString()
    type_chauffage: string;

    @ApiProperty({ example: 'Alarme, Caméras de surveillance' })
    @IsString()
    equipement_protection: string;

    @ApiProperty({ example: 'Cuisine équipée, Meubles intégrés' })
    @IsString()
    equipement_logement: string;

}

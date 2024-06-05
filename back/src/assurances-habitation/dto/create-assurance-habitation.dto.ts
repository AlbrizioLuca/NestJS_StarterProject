import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsPositive, IsNotEmpty, IsIn, IsInt, IsArray, ValidateIf, Matches } from 'class-validator';
import { TypeLogementEnum, EtageAppartementEnum, StatutOccupantEnum, EquipementsLogementEnum, EquipementsProtectionEnum, TypeChauffageEnum, TypeResidenceEnum } from '../enums';

export class CreateAssuranceHabitationDTO {

    @ApiProperty({ example: TypeLogementEnum.APPARTEMENT })
    @IsNotEmpty()
    @IsIn(Object.values(TypeLogementEnum))
    @IsString()
    type_logement: TypeLogementEnum;

    @ApiProperty({ example: EtageAppartementEnum.DEUXIEME })
    @ValidateIf((o) => o.type_logement === TypeLogementEnum.APPARTEMENT)
    @IsIn(Object.values(EtageAppartementEnum))
    @IsString()
    etage_appartement: EtageAppartementEnum;

    @ApiProperty({ example: '01-01-2022' })
    @IsString()
    @Matches(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
        { message: 'Le format de date attendu est JJ-MM-AAAA' })
    date_enmenagement: string;

    @ApiProperty({ example: StatutOccupantEnum.PROPRIETAIRE })
    @IsIn(Object.values(StatutOccupantEnum))
    @IsString()
    statut_occupant: StatutOccupantEnum;

    @ApiProperty({ example: TypeResidenceEnum.PRINCIPALE })
    @IsIn(Object.values(TypeResidenceEnum))
    @IsString()
    type_residence: TypeResidenceEnum;

    @ApiProperty()
    @ValidateIf((o) => o.type_residence === TypeResidenceEnum.SECONDAIRE)
    @IsString()
    periode_inhabitation?: string;

    @ApiProperty({ example: 150000 })
    @IsNumber()
    @IsPositive()
    estimation_capital: number;

    @ApiProperty({ example: true })
    @IsBoolean()
    resiliation_3_dernieres_annees: boolean;

    @ApiProperty({ example: 2 })
    @IsInt()
    @IsPositive()
    nombre_sinistres_3_dernieres_annees?: number;

    @ApiProperty({ example: 3 })
    @IsInt()
    @IsPositive()
    personnes_foyer: number;

    @ApiProperty({ example: 1 })
    @IsInt()
    @IsPositive()
    enfants_foyer?: number;

    @ApiProperty({ example: 5 })
    @IsInt()
    @IsPositive()
    anciennete_logement: number;

    @ApiProperty({ example: 65 })
    @IsNumber()
    @IsPositive()
    surface_habitable: number;

    @ApiProperty({ example: 3 })
    @IsInt()
    @IsPositive()
    nombre_pieces: number;

    @ApiProperty({ example: TypeChauffageEnum.ELECTRIQUE })
    @IsIn(Object.values(TypeChauffageEnum))
    @IsString()
    type_chauffage: TypeChauffageEnum;

    @ApiProperty({ example: true })
    @IsBoolean()
    chauffage_collectif: boolean;

    @ApiProperty({ example: [EquipementsProtectionEnum.ALARME, EquipementsProtectionEnum.CAMERA] })
    @IsArray()
    equipement_protection: EquipementsProtectionEnum[];

    @ApiProperty({ example: [EquipementsLogementEnum.LAVE_VAISSELLE, EquipementsLogementEnum.LAVE_LINGE] })
    @IsArray()
    equipement_logement: EquipementsLogementEnum[];

}

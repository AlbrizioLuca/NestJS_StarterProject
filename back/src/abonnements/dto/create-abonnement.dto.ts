import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsNumberString, IsString, Matches, ValidateIf } from 'class-validator';
import { ChoixPaiementEnum, TypeContratEnum } from '../enums';

export class CreateAbonnementDTO {
    @ApiProperty({ example: '30/05/2024' })
    @IsNotEmpty()
    @IsString()
    @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
        { message: 'Expected french format, so the date format must be DD/MM/YYYY' })
    date_debut: string;

    @ApiProperty({ example: '30/05/2025' })
    @IsNotEmpty()
    @IsString()
    @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
        { message: 'Expected french format, so the date format must be DD/MM/YYYY' })
    date_fin: string;

    @ApiProperty({ example: '1 an' })
    @IsNotEmpty()
    @IsString()
    duree: string;

    @ApiProperty({ example: 'Direct-Assurance' })
    @IsNotEmpty()
    @IsString()
    entreprise: string;

    @ApiProperty({ example: '796' })
    @IsNotEmpty()
    @IsNumberString()
    montant: string;

    @ApiProperty({ example: ChoixPaiementEnum.MENSUEL })
    @IsNotEmpty()
    @IsString()
    @IsIn(Object.values(ChoixPaiementEnum))
    choix_paiement: ChoixPaiementEnum;

    @ValidateIf((o) => o.type === ChoixPaiementEnum.MENSUEL)
    @ApiProperty({ example: '66.33' })
    @IsNotEmpty()
    @IsString()
    mensualites?: string;

    @ApiProperty({ example: TypeContratEnum.ASSURANCE_VEHICULE })
    @IsNotEmpty()
    @IsString()
    @IsIn(Object.values(TypeContratEnum))
    type: TypeContratEnum;

    @ApiProperty({ example: 'abc-123-def-456-ghi-789' })
    @IsNotEmpty()
    @IsString()
    reference_contrat: string;
}

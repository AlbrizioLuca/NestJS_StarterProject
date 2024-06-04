import { PartialType } from '@nestjs/mapped-types';
import { CreateAbonnementDTO } from './create-abonnement.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsNumberString, IsString, Matches, ValidateIf } from 'class-validator';
import { ChoixPaiementEnum } from '../enums';
import { IsDateBefore } from 'src/common/validators/is-date-before.validator';

export class UpdateAbonnementDTO extends PartialType(CreateAbonnementDTO) {
    @ApiProperty({ example: '30-05-2024' })
    @IsNotEmpty()
    @IsString()
    @IsDateBefore('date_fin', { message: 'La date de début ne peut pas être supérieure à la date de fin' })
    @Matches(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
        { message: 'Le format de date attendu est JJ-MM-AAAA' })
    date_debut: string;

    @ApiProperty({ example: '30-05-2025' })
    @IsNotEmpty()
    @IsString()
    @Matches(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
        { message: 'Le format de date attendu est JJ-MM-AAAA' })
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

    @ApiProperty({ example: '66.33' })
    @ValidateIf((o) => o.type === ChoixPaiementEnum.MENSUEL)
    @IsNotEmpty()
    @IsString()
    mensualites?: string;

    @ApiProperty({ example: 'abc-123-def-456-ghi-789' })
    @IsNotEmpty()
    @IsString()
    reference_contrat: string;
}

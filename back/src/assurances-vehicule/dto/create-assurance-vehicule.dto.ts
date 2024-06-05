import { IsString, IsNumber, IsBoolean, IsArray, ValidateNested, IsOptional, Matches, IsNotEmpty, IsIn, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GenreEnum } from 'src/profils/enums';
import { CategoriePermisEnum } from '../enums/categorie-permis.enum';

export class InfosConducteur {

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

    @ApiProperty({ example: '11-07-1982' })
    @IsNotEmpty()
    @IsString()
    @Matches(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
        { message: 'Le format de date attendu est JJ-MM-AAAA' })
    date_naissance: string;

    @ApiProperty({ example: CategoriePermisEnum.PERMIS_B })
    @IsNotEmpty()
    @IsString()
    @IsIn(Object.values(CategoriePermisEnum))
    @IsString()
    categorie_permis: CategoriePermisEnum;

    @ApiProperty({ example: '11-12-2000' })
    @IsNotEmpty()
    @IsString()
    @Matches(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
        { message: 'Le format de date attendu est JJ-MM-AAAA' })
    date_obtention_permis: number;

    @ApiProperty({ example: 0.5 })
    @IsNumber()
    bonus_malus: number;

    @ApiProperty({ example: false })
    @IsBoolean()
    suspension_5_dernieres_annees: boolean;

    @ApiProperty({ example: false })
    @IsBoolean()
    annulation_5_dernieres_annees: boolean;

    @ApiProperty({ example: 2 })
    @IsNumber()
    nombre_sinistres_24_derniers_mois: number;

    @ApiProperty({ example: '' })
    @ValidateIf((o) => o.nombre_sinistres_24_derniers_mois > 0)
    @IsNotEmpty()
    @IsArray()
    @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
        { message: 'Expected french format, so the date format must be DD/MM/YYYY' })
    date_derniers_sinistres?: string[];

    @ApiProperty({ example: 'Accident' })
    @IsString()
    nature_sinistre: string;
}

export class AutresConducteurs {
    @ApiProperty({ type: InfosConducteur })
    @ValidateNested()
    infos_conducteur: InfosConducteur[];
}

export class CreateAssuranceVehiculeDTO {
    @ApiProperty({ example: 'Voiture' })
    @IsNotEmpty()
    @IsString()
    type_vehicule: string;

    @ApiProperty({ example: 'Alfa Romeo' })
    @IsNotEmpty()
    @IsString()
    marque: string;

    @ApiProperty({ example: '159' })
    @IsNotEmpty()
    @IsString()
    modele: string;

    @ApiProperty({ example: 'Rouge' })
    @IsNotEmpty()
    @IsString()
    couleur_carrosserie: string;

    @ApiProperty({ example: 'AB123CD' })
    @IsNotEmpty()
    @IsString()
    immatriculation: string;

    @ApiProperty({ example: '01-01-2008' })
    @IsNotEmpty()
    @IsString()
    @Matches(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
        { message: 'Le format de date attendu est JJ-MM-AAAA' })
    date_mise_en_circulation: string;

    @ApiProperty({ example: '05/04/2010' })
    @IsNotEmpty()
    @IsString()
    @Matches(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
        { message: 'Le format de date attendu est JJ-MM-AAAA' })
    date_achat: string;

    @ApiProperty({ example: 5 })
    @IsNotEmpty()
    @IsNumber()
    chevaux_fiscaux: number;

    @ApiProperty({ example: 200 })
    @IsNotEmpty()
    @IsNumber()
    puissance: number;

    @ApiProperty({ example: 'Essence' })
    @IsNotEmpty()
    @IsString()
    energie: string;

    @ApiProperty({ example: 'Privé' })
    @IsNotEmpty()
    @IsString()
    usage: string;

    @ApiProperty({ example: 15000 })
    @IsNotEmpty()
    @IsNumber()
    kilometrage_annuel: number;

    @ApiProperty({ example: 85000 })
    @IsNotEmpty()
    @IsNumber()
    kilometrage_actuel: number;

    @ApiProperty({ example: 'Garage' })
    @IsNotEmpty()
    @IsString()
    lieu_stationnement: string;

    @ApiProperty({ type: InfosConducteur })
    @IsNotEmpty()
    @ValidateNested()
    conducteur_principal: InfosConducteur;

    @ApiProperty({ type: [AutresConducteurs] })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    conducteurs_secondaires: AutresConducteurs[];

    @ApiProperty({ example: 'Tous risques' })
    @IsNotEmpty()
    @IsString()
    formule_choisie: string;

    @ApiProperty({ example: 'Moyen' })
    @IsNotEmpty()
    @IsString()
    franchise: string;

    @ApiProperty({ example: '50km' })
    @IsNotEmpty()
    @IsString()
    assistance: string
}
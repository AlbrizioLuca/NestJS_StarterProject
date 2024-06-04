import {
    DepartementsFranceEnum,
    RegionsFranceEnum,
    TypeVoieEnum
} from '../enums';
export type Adresses = Adresse[];

export interface Adresse {
    adresse_principale: boolean;
    numero_voie: string;
    type_voie: TypeVoieEnum;
    nom_voie: string;
    info_complementaires?: string;
    ville: string;
    code_postal: string;
    departement: DepartementsFranceEnum;
    region: RegionsFranceEnum;
    pays: string;
}

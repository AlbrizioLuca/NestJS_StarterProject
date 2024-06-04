import { TypeLogementEnum, EtageAppartementEnum, StatutOccupantEnum, TypeResidenceEnum, TypeChauffageEnum, EquipementsProtectionEnum, EquipementsLogementEnum } from "../enums";


export interface InfosAssuranceHabitation {
    type_logement: TypeLogementEnum;
    etage_appartement?: EtageAppartementEnum;
    date_enmenagement: string;
    statut_occupant: StatutOccupantEnum;
    type_residence: TypeResidenceEnum;
    periode_inhabitation?: string;
    estimation_capital: number;
    resiliation_3_dernieres_annees: boolean;
    nombre_sinistres_3_dernieres_annees?: number;
    personnes_foyer: number;
    enfants_foyer?: number;
    anciennete_logement: number;
    surface_habitable: number;
    nombre_pieces: number;
    type_chauffage: TypeChauffageEnum;
    chauffage_collectif: boolean;
    equipement_protection: EquipementsProtectionEnum[];
    equipement_logement: EquipementsLogementEnum[];
}

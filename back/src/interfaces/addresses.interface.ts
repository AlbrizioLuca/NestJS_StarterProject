export type Adresses = Adresse[];

export interface Adresse {
    "adresse_principale": boolean,
    "numero_voie": string
    "type_voie": string,
    "nom_voie": string,
    "info_complementaires": string,
    "ville": string,
    "code_postal": string,
    "departement": string,
    "region": string,
    "pays": string,
}
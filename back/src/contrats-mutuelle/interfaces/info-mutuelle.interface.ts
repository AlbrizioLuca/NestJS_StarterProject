
export interface InfosContratMutuelle {
    "nombre_personnes": number,
    "conjoint": ConjointInterface,
    "enfants": EnfantsInterface,
    "depassement_honoraires": string,
    "hospitalisation": string,
    "optique": string,
    "dentaire": string,
    "aide_auditive": string,
}

interface ConjointInterface {
    "genre": string,
    "nom": string,
    "prenom": string,
    "date_naissance": string,
    "numero_securite_sociale": string,
    "profession": string,
}

interface EnfantsInterface {
    "genre": string,
    "nom": string,
    "prenom": string,
    "date_naissance": string,
    "numero_securite_sociale": string,
}
import {
    Abonnement
} from "src/abonnements/entities/abonnement.entity";
import { InfosContratRequises } from "src/interfaces";
import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { TypeContratEnum } from "../enums/types-contrat.enum";

@Entity('types_contrat')
export class TypesContrat {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: TypeContratEnum
    })
    type: TypeContratEnum;

    @Column({ type: 'json' })
    informations_requises: InfosContratRequises

    @ManyToOne(
        type => Abonnement,
        abonnement => abonnement.typesContrat
    )
    abonnement: Abonnement;
}

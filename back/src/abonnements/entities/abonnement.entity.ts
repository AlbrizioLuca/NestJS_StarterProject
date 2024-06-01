import {
    User
} from "../../users/entities/user.entity";
import { TypesContrat } from "../../types-contrat/entities/types-contrat.entity";

import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { InfosContratRequises } from "src/interfaces";
import { TypeContratEnum } from "src/types-contrat/enums/types-contrat.enum";

@Entity('abonnement')
export class Abonnement {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    date_debut: string;

    @Column()
    date_fin: string;

    @Column()
    duree: string;

    @Column()
    entreprise: string;

    @Column()
    montant: string;

    @Column()
    choix_paiement: string;

    @Column()
    mensualites: string;

    @Column()
    reference_contrat: string;

    @Column({
        type: 'enum',
        enum: TypeContratEnum
    })
    type: TypeContratEnum;

    @OneToOne(() => TypesContrat)
    @JoinColumn({ name: "informations_contrat" })
    typesContrat: TypesContrat;
    @Column({ type: 'json' })
    informations_contrat: InfosContratRequises;

    @OneToOne(() => User)
    @JoinColumn({ name: "userId" })
    user: User;
    @Column({
        type: 'uuid',
        length: 36,
        nullable: true
    })
    userId: string;
}
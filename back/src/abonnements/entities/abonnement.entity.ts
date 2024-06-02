import {
    User
} from "../../users/entities/user.entity";

import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { TypeContratEnum } from "../enums/types-contrat.enum";
import { AssuranceVehicule } from "src/assurances-vehicule/entities/assurance-vehicule.entity";
import { AssuranceHabitation } from "src/assurances-habitation/entities/assurances-habitation.entity";
import { ContratElectricite } from "src/contrats-electricite/entities/contrats-electricite.entity";
import { ContratMutuelle } from "src/contrats-mutuelle/entities/contrats-mutuelle.entity";

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

    @OneToOne(() => User)
    @JoinColumn({ name: "userId" })
    user: User;
    @Column({
        type: 'uuid',
        length: 36,
        nullable: true
    })
    userId: string;

    @OneToOne(() => AssuranceVehicule, assuranceVehicule => assuranceVehicule.informations_contrat)
    assuranceVehicule: AssuranceVehicule;

    @OneToOne(() => AssuranceHabitation, assuranceHabitation => assuranceHabitation.informations_contrat)
    assuranceHabitation: AssuranceHabitation;

    @OneToOne(() => ContratElectricite, contratElectricite => contratElectricite.informations_contrat)
    contratElectricite: ContratElectricite;

    @OneToOne(() => ContratMutuelle, contratMutuelle => contratMutuelle.informations_contrat)
    contratMutuelle: ContratMutuelle;
}
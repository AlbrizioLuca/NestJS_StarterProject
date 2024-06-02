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

    @OneToOne(() => AssuranceVehicule)
    @JoinColumn({ name: "assuranceVehiculeId" })
    assuranceVehicule: AssuranceVehicule;
    @Column({
        type: 'uuid',
        length: 36,
        nullable: true
    })
    assuranceVehiculeId: string;

    @OneToOne(() => AssuranceHabitation)
    @JoinColumn({ name: "assuranceHabitationId" })
    assuranceHabitation: AssuranceHabitation;
    @Column({
        type: 'uuid',
        length: 36,
        nullable: true
    })
    assuranceHabitationId: string;

    @OneToOne(() => ContratElectricite)
    @JoinColumn({ name: "contratElectriciteId" })
    contratElectricite: ContratElectricite;
    @Column({
        type: 'uuid',
        length: 36,
        nullable: true
    })
    contratElectriciteId: string;

    @OneToOne(() => ContratMutuelle)
    @JoinColumn({ name: "contratMutuelleId" })
    contratMutuelle: ContratMutuelle;
    @Column({
        type: 'uuid',
        length: 36,
        nullable: true
    })
    contratMutuelleId: string;
}
import {
    Entity,
    Column,
    OneToOne,
    JoinColumn,
    PrimaryColumn
} from "typeorm";
import { Abonnement } from "src/abonnements/entities/abonnement.entity";
import { InfosAssuranceHabitation } from "../interfaces/info-assurance-habitation.interface";

@Entity('assurance_habitation')
export class AssuranceHabitation {
    @PrimaryColumn({ type: 'uuid' })
    abonnementId: string;

    @Column({ type: 'json', nullable: true })
    informations_contrat: InfosAssuranceHabitation;

    @Column({ type: 'uuid', length: 36 })
    userId: string;

    @OneToOne(() => Abonnement)
    @JoinColumn({ name: "abonnementId" })
    abonnement: Abonnement;
}

import {
    Entity,
    Column,
    OneToOne,
    JoinColumn,
    PrimaryColumn
} from "typeorm";
import { Abonnement } from "src/abonnements/entities/abonnement.entity";
import { InfosAssuranceVehicule } from "../interfaces/info-assurance-vehicule.interface";

@Entity('assurance_vehicule')
export class AssuranceVehicule {
    @PrimaryColumn({ type: 'uuid' })
    abonnementId: string;

    @Column({ type: 'json', nullable: true })
    informations_contrat: InfosAssuranceVehicule;

    @Column({ type: 'uuid', length: 36 })
    userId: string;

    @OneToOne(() => Abonnement)
    @JoinColumn({ name: "abonnementId" })
    abonnement: Abonnement;
}

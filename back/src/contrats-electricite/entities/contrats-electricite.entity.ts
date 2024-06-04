import {
    Entity,
    Column,
    OneToOne,
    JoinColumn,
    PrimaryColumn
} from "typeorm";
import { Abonnement } from "src/abonnements/entities/abonnement.entity";
import { InfosContratElectricite } from "../interfaces/info-contrat-electricite.interface";

@Entity('contrat_electricite')
export class ContratElectricite {
    @PrimaryColumn({ type: 'uuid' })
    abonnementId: string;

    @Column({ type: 'json', nullable: true })
    informations_contrat: InfosContratElectricite;

    @Column({ type: 'uuid', length: 36 })
    userId: string;

    @OneToOne(() => Abonnement)
    @JoinColumn({ name: "abonnementId" })
    abonnement: Abonnement;
}

import {
    Entity,
    Column,
    OneToOne,
    JoinColumn,
    PrimaryColumn
} from "typeorm";
import { Abonnement } from "src/abonnements/entities/abonnement.entity";
import { InfosContratMutuelle } from "../interfaces/info-mutuelle.interface";

@Entity('contrat_mutuelle')
export class ContratMutuelle {
    @PrimaryColumn({ type: 'uuid' })
    abonnementId: string;

    @Column({ type: 'json', nullable: true })
    informations_contrat: InfosContratMutuelle;

    @Column({ type: 'uuid', length: 36 })
    userId: string;

    @OneToOne(() => Abonnement)
    @JoinColumn({ name: "abonnementId" })
    abonnement: Abonnement;
}

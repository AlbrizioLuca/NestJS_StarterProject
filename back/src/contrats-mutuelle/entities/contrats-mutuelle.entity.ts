import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn
} from "typeorm";
import { Abonnement } from "src/abonnements/entities/abonnement.entity";
import { InfosContratMutuelle } from "../interfaces/info-mutuelle.interface";

@Entity('contrat_mutuelle')
export class ContratMutuelle {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'json' })
    informations_contrat: InfosContratMutuelle

    @Column({
        type: 'uuid',
        length: 36,
        nullable: true
    })
    userId: string;

    @OneToOne(() => Abonnement)
    @JoinColumn({ name: "abonnementId" })
    abonnement: Abonnement;
    @Column({
        type: 'uuid',
        length: 36,
        nullable: true
    })
    abonnementId: string;
}

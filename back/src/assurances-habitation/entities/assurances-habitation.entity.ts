import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn
} from "typeorm";
import { Abonnement } from "src/abonnements/entities/abonnement.entity";
import { InfosAssuranceHabitation } from "../interfaces/info-assurance-habitation.interface";

@Entity('assurance_habitation')
export class AssuranceHabitation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'json' })
    informations_contrat: InfosAssuranceHabitation

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

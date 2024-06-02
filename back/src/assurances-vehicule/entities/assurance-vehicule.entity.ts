import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn
} from "typeorm";
import { Abonnement } from "src/abonnements/entities/abonnement.entity";
import { InfosAssuranceVehicule } from "../interfaces/info-assurance-vehicule.interface";

@Entity('assurance_vehicule')
export class AssuranceVehicule {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'json' })
    informations_contrat: InfosAssuranceVehicule

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

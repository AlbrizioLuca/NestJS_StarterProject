import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne
} from "typeorm";
import { Abonnement } from "src/abonnements/entities/abonnement.entity";
import { InfosContratElectricite } from "../interfaces/info-contrat-electricite.interface";

@Entity('contrat_electricite')
export class ContratElectricite {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'json' })
    informations_contrat: InfosContratElectricite

    @Column({
        type: 'uuid',
        length: 36,
        nullable: true
    })
    userId: string;

    @OneToOne(() => Abonnement, abonnement => abonnement.assuranceVehicule)
    abonnement: Abonnement;
}

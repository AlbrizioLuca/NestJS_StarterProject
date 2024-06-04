import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RoleUserEnum } from "../enums/role-user.enum";
import { Abonnement } from "src/abonnements/entities/abonnement.entity";
import { Profil } from "../../profils/entities/profil.entity";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: RoleUserEnum,
        default: RoleUserEnum.CUSTOMER
    })
    role: RoleUserEnum;

    @OneToOne(
        type => Profil, profil => profil.user, { onDelete: 'CASCADE' })
    profil: Profil;

    @OneToMany(type => Abonnement, abonnement => abonnement.user, { onDelete: 'CASCADE' })
    abonnement: Abonnement;
}

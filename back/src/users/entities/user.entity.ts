import {
    Profil
} from "../../profils/entities/profil.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RoleUserEnum } from "../enums/role-user.enum";

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
        type => Profil,
        profil => profil.user
    )
    profil: Profil;
}

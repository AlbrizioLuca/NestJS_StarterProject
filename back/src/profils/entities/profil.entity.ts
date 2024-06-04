import { User } from "../../users/entities/user.entity";
import { GenreEnum } from "../enums";
import { Adresses } from "../interfaces/addresse.interface";
import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryColumn,
} from "typeorm";

@Entity('profil')
export class Profil {
    @PrimaryColumn({
        type: 'uuid'
    })
    userId: string;

    @Column({
        type: 'enum',
        enum: GenreEnum,
        nullable: true
    })
    genre: GenreEnum;

    @Column({
        nullable: true
    })
    nom: string;

    @Column({
        nullable: true
    })
    prenom: string;

    @Column({
        nullable: true
    })
    telephone: string;

    @Column({
        nullable: true
    })
    date_naissance: string;

    @Column({
        nullable: true
    })
    profession: string;

    @Column({
        nullable: true
    })
    situation_familiale: string;

    @Column({
        type: 'json',
        nullable: true
    })
    adresses: Adresses;

    @OneToOne(() => User, { cascade: true })
    @JoinColumn({ name: "userId" })
    user: User;
}

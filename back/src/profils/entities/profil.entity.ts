import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { GenreEnum } from "../enums";
import { Adresses } from "../interfaces/addresse.interface";

@Entity('profil')
export class Profil {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: GenreEnum
    })
    genre: GenreEnum;

    @Column()
    nom: string;

    @Column()
    prenom: string;

    @Column()
    telephone: string;

    @Column()
    date_naissance: string;

    @Column()
    profession: string;

    @Column()
    situation_familiale: string;

    @Column({
        type: 'json',
        nullable: true
    })
    adresses: Adresses;

    @OneToOne(() => User)
    @JoinColumn({ name: "userId" })
    user: User;
    @Column({
        type: 'uuid',
        length: 36,
        nullable: true
    })
    userId: string;
}

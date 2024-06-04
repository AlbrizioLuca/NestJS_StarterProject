import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hash } from 'bcryptjs';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { AuthService } from 'src/common/auth/auth.service';
import { Profil } from 'src/profils/entities/profil.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Profil)
    private profileRepository: Repository<Profil>,
    private authService: AuthService,
  ) { }

  async create(createUserDTO: CreateUserDTO) {
    // Encoder le mot de passe
    createUserDTO.password = await hash(createUserDTO.password, 10);
    // Enregistrer le nouvel utilisateur en base de données 
    const newUser = await this.usersRepository.save(createUserDTO);

    //Enregistrer également une entrée dans la table profil
    const profilUtilisateur = new Profil();
    profilUtilisateur.userId = newUser.id;
    await this.profileRepository.save(profilUtilisateur);

    // Retourner un message de succès et les données de l'utilisateur
    return { message: 'Utilisateur créé avec succès', data: newUser };
  }

  async findAll(token: string) {
    // Vérifier si l'utilisateur authentifié a les permissions
    await this.authService.checkPermissions(token)
    // Si l'utilisateur authentifié a les permissions, retourner les données
    const users = await this.usersRepository.find();
    return users;
  }

  async findOne(id: string, token: string) {
    // Récupérer et vérifier si un utilisateur existe avec l'ID fourni
    const user = await this.usersRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(
        `Aucun utilisateur trouvé avec l'ID fourni : ${id}`,
      );
    }
    // Comparer avec l'ID de l'utilisateur authentifié
    const userId: string = user.id;
    // Vérifier si l'utilisateur authentifié a les permissions
    await this.authService.checkPermissions(token, userId)
    // Si oui, retourner les données
    return user;
  }

  async update(id: string, updateUserDTO: UpdateUserDTO, token: string) {
    // Attendre le retour de la méthode findOne pour vérifier si l'utilisateur est autorisé
    const user = await this.findOne(id, token);
    // Si l'utilisateur est autorisé, mettre à jour les données de l'utilisateur
    await this.usersRepository.update(id, updateUserDTO);
    // Vérifier si l'e-mail a été mis à jour et s'il est différent de l'e-mail actuel de l'utilisateur
    if (updateUserDTO.email && updateUserDTO.email !== user.email) {
      // Vérifier si le nouvel e-mail existe déjà
      const userWithSameEmail = await this.usersRepository.findOne({ where: { email: updateUserDTO.email } });
      // Si l'e-mail existe déjà, retourner une erreur
      if (userWithSameEmail && userWithSameEmail.id !== user.id) {
        throw new ConflictException("L'e-mail est déjà utilisé, veuillez en choisir un autre");
      }
    }

    // Vérifier si le mot de passe a été mis à jour
    if (updateUserDTO.password && updateUserDTO.password !== user.password) {
      // Si le mot de passe a été modifié, hasher le nouveau mot de passe
      updateUserDTO.password = await hash(updateUserDTO.password, 10);
    } else {
      // Sinon, conserver l'ancien mot de passe
      updateUserDTO.password = user.password;
    }
    return { message: 'Utilisateur mis à jour avec succès', data: { id, ...updateUserDTO } };
  }

  async remove(id: string, token: string) {
    // Attendre le retour de la méthode findOne pour vérifier si l'utilisateur est autorisé
    const user = await this.findOne(id, token);
    // Procéder à la suppression si l'utilisateur est autorisé
    await this.usersRepository.delete(id);
    return { message: 'Utilisateur supprimé avec succès', data: user };
  }
}

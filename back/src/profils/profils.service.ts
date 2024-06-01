import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profil } from './entities/profil.entity';
import { CreateProfilDTO } from './dto/profil/create-profil.dto';
import { UpdateProfilDTO } from './dto/profil/update-profil.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/common/auth/auth.service';

@Injectable()
export class ProfilsService {
  constructor(
    @InjectRepository(Profil)
    private profilesRepository: Repository<Profil>,
    private authService: AuthService,
    private jwtService: JwtService,
  ) { }

  async create(createProfilDTO: CreateProfilDTO, token: string) {
    // Décoder le jeton pour récupérer l'ID de l'utilisateur
    const decodedToken = this.jwtService.decode(token);
    // Enregistrer les données présentes dans la charge utile du jeton
    const authUserId: string = decodedToken.sub;
    // Vérifier si un profil existe déjà avec le même authUserId
    const existingProfile = await this.profilesRepository.findOne({ where: { userId: authUserId } });
    if (existingProfile) {
      throw new UnauthorizedException('Un profil existe déjà pour ce compte utilisateur');
    }
    // Créer un nouvel objet profil en combinant les données reçues et l'ID de l'utilisateur
    const newProfile = { ...createProfilDTO, userId: authUserId };
    // Enregistrer le nouveau profil dans la base de données
    await this.profilesRepository.save(newProfile);
    return { message: 'Profil créé avec succès', data: newProfile };
  }

  async findAll(token: string) {
    // Récupérer l'ID de l'utilisateur authentifié et son rôle
    const { authenticatedUserID, authenticatedUserRole } = await this.authService.decodedToken(token)
    let profiles = []
    // Vérifier si l'utilisateur authentifié est un administrateur pour renvoyer tous les profils
    if (authenticatedUserRole === 'Admin') {
      profiles = await this.profilesRepository.find();
      // sinon renvoyer uniquement les profils de l'utilisateur authentifié
    } else {
      profiles = await this.profilesRepository.find({ where: { userId: authenticatedUserID } });
    }
    return profiles;
  }

  async findOne(id: string, token: string) {
    // Récupérer et vérifier si un profil existe avec l'ID fourni
    const profile = await this.profilesRepository.findOne({ where: { id: id } });
    if (!profile) {
      throw new NotFoundException(
        `Aucun profil trouvé avec l'ID fourni : ${id}`,
      );
    }
    // Obtenir l'ID de l'utilisateur pour le comparer à l'ID de l'utilisateur authentifié
    const userId: string = profile.userId;
    // Vérifier si l'utilisateur authentifié a les permissions nécessaires
    await this.authService.checkPermissions(token, userId)
    // Renvoyer les données si l'utilisateur authentifié a les permissions nécessaires
    return profile;
  }

  async update(id: string, updateProfilDTO: UpdateProfilDTO, token: string) {
    // Attendre le retour de la méthode findOne pour vérifier si l'utilisateur est autorisé
    await this.findOne(id, token);
    // Procéder à la mise à jour si l'utilisateur est autorisé
    await this.profilesRepository.update(id, updateProfilDTO);
    return { message: 'Profil mis à jour avec succès', data: { id, ...updateProfilDTO } };
  }

  async remove(id: string, token: string) {
    // Attendre le retour de la méthode findOne pour vérifier si l'utilisateur est autorisé
    const profile = await this.findOne(id, token);
    // Procéder à la suppression si l'utilisateur est autorisé
    await this.profilesRepository.delete(id);
    return { message: 'Profil supprimé avec succès', data: profile };
  }
}

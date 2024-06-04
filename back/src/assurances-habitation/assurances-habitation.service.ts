import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssuranceHabitationDTO } from './dto/create-assurance-habitation.dto';
import { AssuranceHabitation } from './entities/assurances-habitation.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/common/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateAssuranceHabitationDTO } from './dto/update-assurance-habitation.dto';

@Injectable()
export class AssurancesHabitationService {
  constructor(
    @InjectRepository(AssuranceHabitation)
    private assurancesHabitationRepository: Repository<AssuranceHabitation>,
    private authService: AuthService,
    private jwtService: JwtService,
  ) { }

  async create(createAssuranceHabitationDTO: CreateAssuranceHabitationDTO, token: string) {
    // Décoder le jeton pour récupérer l'ID de l'utilisateur
    const decodedToken = this.jwtService.decode(token);
    // Enregistrer les données présentes dans la charge utile du jeton
    const authUserId: string = decodedToken.sub;
    // Créer un nouvel objet abonnement en combinant les données reçues et l'ID de l'utilisateur
    const newAssurance = { ...createAssuranceHabitationDTO, userId: authUserId }
    // Enregistrer le nouvel abonnement dans la base de données
    await this.assurancesHabitationRepository.save(newAssurance);
    return { message: 'Assurance véhicule créé avec succès', data: newAssurance };
  }

  async findAll(token: string) {
    // Récupérer l'ID de l'utilisateur authentifié et le rôle de l'utilisateur authentifié
    const { authenticatedUserID, authenticatedUserRole } = await this.authService.decodedToken(token)
    let assurancesHabitation = []
    // Vérifier si l'utilisateur authentifié est un administrateur pour renvoyer tous les assurances
    if (authenticatedUserRole === 'Admin') {
      assurancesHabitation = await this.assurancesHabitationRepository.find();
      // Sinon, renvoyer uniquement les assurances de l'utilisateur authentifié
    } else {
      assurancesHabitation = await this.assurancesHabitationRepository.find({ where: { userId: authenticatedUserID } });
    }
    return assurancesHabitation;
  }

  async findOne(id: string, token: string) {
    // Récupérer et vérifier si un abonnement existe avec l'ID fourni
    const assuranceHabitation = await this.assurancesHabitationRepository.findOne({ where: { abonnementId: id } });
    if (!assuranceHabitation) {
      throw new NotFoundException(
        `Aucun abonnement trouvé avec l'ID fourni : ${id}`,
      );
    }
    // Obtenir l'ID de l'utilisateur pour le comparer à l'ID de l'utilisateur authentifié
    const userId: string = assuranceHabitation.userId;
    // Vérifier si l'utilisateur authentifié a les autorisations nécessaires
    await this.authService.checkPermissions(token, userId)
    // Renvoyer les données si l'utilisateur authentifié a les autorisations nécessaires
    return assuranceHabitation;
  }

  async update(id: string, updateAssuranceHabitationDTO: UpdateAssuranceHabitationDTO, token: string) {
    // Attendre le retour de la méthode findOne pour vérifier si l'utilisateur est autorisé
    await this.findOne(id, token);
    // Procéder à la mise à jour si l'utilisateur est autorisé
    await this.assurancesHabitationRepository.update(id, updateAssuranceHabitationDTO);
    return { message: 'Assurance véhicule mis à jour avec succès', data: { id, ...updateAssuranceHabitationDTO } };
  }

  async remove(id: string, token: string) {
    // Attendre le retour de la méthode findOne pour vérifier si l'utilisateur est autorisé
    const assuranceHabitation = await this.findOne(id, token);
    // Procéder à la suppression si l'utilisateur est autorisé
    await this.assurancesHabitationRepository.delete(id);
    return { message: 'Assurance véhicule supprimé avec succès', data: assuranceHabitation };
  }
}

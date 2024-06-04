import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssuranceVehiculeDTO } from './dto/create-assurance-vehicule.dto';
import { UpdateAssuranceVehiculeDTO } from './dto/update-assurance-vehicule.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/common/auth/auth.service';
import { Repository } from 'typeorm';
import { AssuranceVehicule } from './entities/assurance-vehicule.entity';

@Injectable()
export class AssurancesVehiculeService {
  constructor(
    @InjectRepository(AssuranceVehicule)
    private assurancesVehiculeRepository: Repository<AssuranceVehicule>,
    private authService: AuthService,
    private jwtService: JwtService,
  ) { }

  async create(createAssuranceVehiculeDTO: CreateAssuranceVehiculeDTO, token: string) {
    // Décoder le jeton pour récupérer l'ID de l'utilisateur
    const decodedToken = this.jwtService.decode(token);
    // Enregistrer les données présentes dans la charge utile du jeton
    const authUserId: string = decodedToken.sub;
    // Créer un nouvel objet abonnement en combinant les données reçues et l'ID de l'utilisateur
    const newAssurance = { ...createAssuranceVehiculeDTO, userId: authUserId }
    // Enregistrer le nouvel abonnement dans la base de données
    await this.assurancesVehiculeRepository.save(newAssurance);
    return { message: 'Assurance véhicule créé avec succès', data: newAssurance };
  }

  async findAll(token: string) {
    // Récupérer l'ID de l'utilisateur authentifié et le rôle de l'utilisateur authentifié
    const { authenticatedUserID, authenticatedUserRole } = await this.authService.decodedToken(token)
    let assurancesVehicule = []
    // Vérifier si l'utilisateur authentifié est un administrateur pour renvoyer tous les assurances
    if (authenticatedUserRole === 'Admin') {
      assurancesVehicule = await this.assurancesVehiculeRepository.find();
      // Sinon, renvoyer uniquement les assurances de l'utilisateur authentifié
    } else {
      assurancesVehicule = await this.assurancesVehiculeRepository.find({ where: { userId: authenticatedUserID } });
    }
    return assurancesVehicule;
  }

  async findOne(id: string, token: string) {
    // Récupérer et vérifier si un abonnement existe avec l'ID fourni
    const assuranceVehicule = await this.assurancesVehiculeRepository.findOne({ where: { abonnementId: id } });
    if (!assuranceVehicule) {
      throw new NotFoundException(
        `Aucun abonnement trouvé avec l'ID fourni : ${id}`,
      );
    }
    // Obtenir l'ID de l'utilisateur pour le comparer à l'ID de l'utilisateur authentifié
    const userId: string = assuranceVehicule.userId;
    // Vérifier si l'utilisateur authentifié a les autorisations nécessaires
    await this.authService.checkPermissions(token, userId)
    // Renvoyer les données si l'utilisateur authentifié a les autorisations nécessaires
    return assuranceVehicule;
  }

  async update(id: string, updateAssuranceVehiculeDTO: UpdateAssuranceVehiculeDTO, token: string) {
    // Attendre le retour de la méthode findOne pour vérifier si l'utilisateur est autorisé
    await this.findOne(id, token);
    // Procéder à la mise à jour si l'utilisateur est autorisé
    //! await this.assurancesVehiculeRepository.update(id, { informations_contrat: updateAssuranceVehiculeDTO });
    return { message: 'Assurance véhicule mis à jour avec succès', data: { id, ...updateAssuranceVehiculeDTO } };
  }

  async remove(id: string, token: string) {
    // Attendre le retour de la méthode findOne pour vérifier si l'utilisateur est autorisé
    const assuranceVehicule = await this.findOne(id, token);
    // Procéder à la suppression si l'utilisateur est autorisé
    await this.assurancesVehiculeRepository.delete(id);
    return { message: 'Assurance véhicule supprimé avec succès', data: assuranceVehicule };
  }
}



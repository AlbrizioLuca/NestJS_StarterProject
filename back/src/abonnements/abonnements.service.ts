import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateAbonnementDTO } from './dto/create-abonnement.dto';
import { UpdateAbonnementDTO } from './dto/update-abonnement.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/common/auth/auth.service';
import { DeepPartial, Repository } from 'typeorm';
import { TypeContratEnum } from './enums';

import { Abonnement } from './entities/abonnement.entity';
import { AssuranceVehicule } from 'src/assurances-vehicule/entities/assurance-vehicule.entity';
import { AssuranceHabitation } from 'src/assurances-habitation/entities/assurances-habitation.entity';
import { ContratElectricite } from 'src/contrats-electricite/entities/contrats-electricite.entity';
import { ContratMutuelle } from 'src/contrats-mutuelle/entities/contrats-mutuelle.entity';

@Injectable()
export class AbonnementsService {
  constructor(
    @InjectRepository(Abonnement)
    private abonnementsRepository: Repository<Abonnement>,

    @InjectRepository(AssuranceVehicule)
    private assuranceVehiculeRepository: Repository<AssuranceVehicule>,

    @InjectRepository(AssuranceHabitation)
    private assuranceHabitationRepository: Repository<AssuranceHabitation>,

    @InjectRepository(ContratElectricite)
    private contratElectriciteRepository: Repository<ContratElectricite>,

    @InjectRepository(ContratMutuelle)
    private contratMutuelleRepository: Repository<ContratMutuelle>,

    private authService: AuthService,
    private jwtService: JwtService,
  ) { }

  async create(createAbonnementDTO: CreateAbonnementDTO, type: TypeContratEnum, token: string) {
    // Décoder le jeton pour récupérer l'ID de l'utilisateur
    const decodedToken = this.jwtService.decode(token);
    // Enregistrer les données présentes dans la charge utile du jeton
    const authUserId: string = decodedToken.sub;
    // Créer un nouvel objet abonnement en combinant les données reçues et l'ID de l'utilisateur
    const abonnement = { ...createAbonnementDTO, userId: authUserId, type: type };
    // Enregistrer le nouvel abonnement dans la base de données
    const nouvelAbonnement = await this.abonnementsRepository.save(abonnement);

    switch (abonnement.type) {
      case TypeContratEnum.ASSURANCE_VEHICULE:
        const assuranceVehicule = new AssuranceVehicule()
        assuranceVehicule.abonnementId = nouvelAbonnement.id;
        assuranceVehicule.userId = nouvelAbonnement.userId;

        await this.assuranceVehiculeRepository.save(assuranceVehicule);
        break;

      case TypeContratEnum.ASSURANCE_HABITATION:
        const assuranceHabitation = new AssuranceHabitation()
        assuranceHabitation.abonnementId = nouvelAbonnement.id;
        assuranceHabitation.userId = nouvelAbonnement.userId;

        await this.assuranceHabitationRepository.save(assuranceHabitation);
        break;

      case TypeContratEnum.FOURNISSEUR_ELECTRICITE:
        const contratElectricite = new ContratElectricite()
        contratElectricite.abonnementId = nouvelAbonnement.id;
        contratElectricite.userId = nouvelAbonnement.userId;

        await this.contratElectriciteRepository.save(contratElectricite);
        break;

      case TypeContratEnum.MUTUELLE:
        const contratMutuelle = new ContratMutuelle()
        contratMutuelle.abonnementId = nouvelAbonnement.id;
        contratMutuelle.userId = nouvelAbonnement.userId;

        await this.contratMutuelleRepository.save(contratMutuelle);
        break;
    }

    return { message: 'Abonnement créé avec succès', data: nouvelAbonnement };
  }

  async findAll(token: string) {
    // Récupérer l'ID de l'utilisateur authentifié et le rôle de l'utilisateur authentifié
    const { authenticatedUserID, authenticatedUserRole } = await this.authService.decodedToken(token)
    let subscriptions = []
    // Vérifier si l'utilisateur authentifié est un administrateur pour renvoyer tous les abonnements
    if (authenticatedUserRole === 'Admin') {
      subscriptions = await this.abonnementsRepository.find();
      // Sinon, renvoyer uniquement les abonnements de l'utilisateur authentifié
    } else {
      subscriptions = await this.abonnementsRepository.find({ where: { userId: authenticatedUserID } });
    }
    return subscriptions;
  }

  async findOne(id: string, token: string) {
    // Récupérer et vérifier si un abonnement existe avec l'ID fourni
    const subscription = await this.abonnementsRepository.findOne({ where: { id: id } });
    if (!subscription) {
      throw new NotFoundException(
        `Aucun abonnement trouvé avec l'ID fourni : ${id}`,
      );
    }
    // Obtenir l'ID de l'utilisateur pour le comparer à l'ID de l'utilisateur authentifié
    const userId: string = subscription.userId;
    // Vérifier si l'utilisateur authentifié a les autorisations nécessaires
    await this.authService.checkPermissions(token, userId)
    // Renvoyer les données si l'utilisateur authentifié a les autorisations nécessaires
    return subscription;
  }

  async update(id: string, updateAbonnementDTO: UpdateAbonnementDTO, token: string) {
    // Attendre le retour de la méthode findOne pour vérifier si l'utilisateur est autorisé
    await this.findOne(id, token);
    // Procéder à la mise à jour si l'utilisateur est autorisé
    await this.abonnementsRepository.update(id, updateAbonnementDTO);
    return { message: 'Abonnement mis à jour avec succès', data: { id, ...updateAbonnementDTO } };
  }

  async remove(id: string, token: string) {
    // Attendre le retour de la méthode findOne pour vérifier si l'utilisateur est autorisé
    const subscription = await this.findOne(id, token);
    // Procéder à la suppression si l'utilisateur est autorisé
    await this.abonnementsRepository.delete(id);
    return { message: 'Abonnement supprimé avec succès', data: subscription };
  }
}

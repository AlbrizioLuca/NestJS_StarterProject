import { CreateContratMutuelleDTO } from './dto/create-contrat-mutuelle.dto';
import { UpdateContratMutuelleDTO } from './dto/update-contrat-mutuelle.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/common/auth/auth.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ContratMutuelle } from './entities/contrats-mutuelle.entity';


@Injectable()
export class ContratsMutuelleService {
  constructor(
    @InjectRepository(ContratMutuelle)
    private contratsMutuelleContratMutuelleRepository: Repository<ContratMutuelle>,
    private authService: AuthService,
    private jwtService: JwtService,
  ) { }

  async create(createContratMutuelleDTO: CreateContratMutuelleDTO, token: string) {
    // Décoder le jeton pour récupérer l'ID de l'utilisateur
    const decodedToken = this.jwtService.decode(token);
    // Enregistrer les données présentes dans la charge utile du jeton
    const authUserId: string = decodedToken.sub;
    // Créer un nouvel objet contrat en combinant les données reçues et l'ID de l'utilisateur
    const newContrat = { ...createContratMutuelleDTO, userId: authUserId }
    // Enregistrer le nouvel contrat dans la base de données
    await this.contratsMutuelleContratMutuelleRepository.save(newContrat);
    return { message: 'Contrat mutuelle créé avec succès', data: newContrat };
  }

  async findAll(token: string) {
    // Récupérer l'ID de l'utilisateur authentifié et le rôle de l'utilisateur authentifié
    const { authenticatedUserID, authenticatedUserRole } = await this.authService.decodedToken(token)
    let contratsMutuelleContratMutuelle = []
    // Vérifier si l'utilisateur authentifié est un administrateur pour renvoyer tous les assurances
    if (authenticatedUserRole === 'Admin') {
      contratsMutuelleContratMutuelle = await this.contratsMutuelleContratMutuelleRepository.find();
      // Sinon, renvoyer uniquement les assurances de l'utilisateur authentifié
    } else {
      contratsMutuelleContratMutuelle = await this.contratsMutuelleContratMutuelleRepository.find({ where: { userId: authenticatedUserID } });
    }
    return contratsMutuelleContratMutuelle;
  }

  async findOne(id: string, token: string) {
    // Récupérer et vérifier si un contrat existe avec l'ID fourni
    const contrat = await this.contratsMutuelleContratMutuelleRepository.findOne({ where: { abonnementId: id } });
    if (!contrat) {
      throw new NotFoundException(
        `Aucun contrat trouvé avec l'ID fourni : ${id}`,
      );
    }
    // Obtenir l'ID de l'utilisateur pour le comparer à l'ID de l'utilisateur authentifié
    const userId: string = contrat.userId;
    // Vérifier si l'utilisateur authentifié a les autorisations nécessaires
    await this.authService.checkPermissions(token, userId)
    // Renvoyer les données si l'utilisateur authentifié a les autorisations nécessaires
    return contrat;
  }

  async update(id: string, updateContratMutuelleDTO: UpdateContratMutuelleDTO, token: string) {
    // Attendre le retour de la méthode findOne pour vérifier si l'utilisateur est autorisé
    await this.findOne(id, token);
    // Procéder à la mise à jour si l'utilisateur est autorisé
    await this.contratsMutuelleContratMutuelleRepository.update(id, { informations_contrat: updateContratMutuelleDTO });
    return { message: 'Contrat mutuelle mis à jour avec succès', data: { id, ...updateContratMutuelleDTO } };
  }

  async remove(id: string, token: string) {
    // Attendre le retour de la méthode findOne pour vérifier si l'utilisateur est autorisé
    const contrat = await this.findOne(id, token);
    // Procéder à la suppression si l'utilisateur est autorisé
    await this.contratsMutuelleContratMutuelleRepository.delete(id);
    return { message: 'Contrat mutuelle supprimé avec succès', data: contrat };
  }
}

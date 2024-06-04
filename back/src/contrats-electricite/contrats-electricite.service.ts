import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContratElectriciteDTO } from './dto/create-contrat-electricite.dto';
import { UpdateContratElectriciteDTO } from './dto/update-contrat-electricite.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/common/auth/auth.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ContratElectricite } from './entities/contrats-electricite.entity';

@Injectable()
export class ContratsElectriciteService {
  constructor(
    @InjectRepository(ContratElectricite)
    private contratsElectriciteRepository: Repository<ContratElectricite>,
    private authService: AuthService,
    private jwtService: JwtService,
  ) { }

  async create(createContratElectriciteDTO: CreateContratElectriciteDTO, token: string) {
    // Décoder le jeton pour récupérer l'ID de l'utilisateur
    const decodedToken = this.jwtService.decode(token);
    // Enregistrer les données présentes dans la charge utile du jeton
    const authUserId: string = decodedToken.sub;
    // Créer un nouvel objet contrat en combinant les données reçues et l'ID de l'utilisateur
    const newContrat = { ...createContratElectriciteDTO, userId: authUserId }
    // Enregistrer le nouvel contrat dans la base de données
    await this.contratsElectriciteRepository.save(newContrat);
    return { message: 'Contrat électrique créé avec succès', data: newContrat };
  }

  async findAll(token: string) {
    // Récupérer l'ID de l'utilisateur authentifié et le rôle de l'utilisateur authentifié
    const { authenticatedUserID, authenticatedUserRole } = await this.authService.decodedToken(token)
    let contratsElectricite = []
    // Vérifier si l'utilisateur authentifié est un administrateur pour renvoyer tous les assurances
    if (authenticatedUserRole === 'Admin') {
      contratsElectricite = await this.contratsElectriciteRepository.find();
      // Sinon, renvoyer uniquement les assurances de l'utilisateur authentifié
    } else {
      contratsElectricite = await this.contratsElectriciteRepository.find({ where: { userId: authenticatedUserID } });
    }
    return contratsElectricite;
  }

  async findOne(id: string, token: string) {
    // Récupérer et vérifier si un contrat existe avec l'ID fourni
    const contrat = await this.contratsElectriciteRepository.findOne({ where: { abonnementId: id } });
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

  async update(id: string, updateContratElectriciteDTO: UpdateContratElectriciteDTO, token: string) {
    // Attendre le retour de la méthode findOne pour vérifier si l'utilisateur est autorisé
    await this.findOne(id, token);
    // Procéder à la mise à jour si l'utilisateur est autorisé
    //! await this.contratsElectriciteRepository.update(id, updateContratElectriciteDTO);
    return { message: 'Contrat électrique mis à jour avec succès', data: { id, ...updateContratElectriciteDTO } };
  }

  async remove(id: string, token: string) {
    // Attendre le retour de la méthode findOne pour vérifier si l'utilisateur est autorisé
    const contrat = await this.findOne(id, token);
    // Procéder à la suppression si l'utilisateur est autorisé
    await this.contratsElectriciteRepository.delete(id);
    return { message: 'Contrat électrique supprimé avec succès', data: contrat };
  }
}

import { Module } from '@nestjs/common';
import { AbonnementsService } from './abonnements.service';
import { AbonnementsController } from './abonnements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Abonnement } from './entities/abonnement.entity';
import { AuthService } from 'src/common/auth/auth.service';
import { UsersModule } from 'src/users/users.module';
import { AssuranceVehicule } from 'src/assurances-vehicule/entities/assurance-vehicule.entity';
import { AssuranceHabitation } from 'src/assurances-habitation/entities/assurances-habitation.entity';
import { ContratElectricite } from 'src/contrats-electricite/entities/contrats-electricite.entity';
import { ContratMutuelle } from 'src/contrats-mutuelle/entities/contrats-mutuelle.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Abonnement,
        AssuranceVehicule,
        AssuranceHabitation,
        ContratElectricite,
        ContratMutuelle
      ]
    ),
    UsersModule,
  ],
  controllers: [AbonnementsController],
  providers: [
    AbonnementsService,
    AuthService
  ],
  exports: [AbonnementsService, TypeOrmModule],
})
export class AbonnementsModule { }

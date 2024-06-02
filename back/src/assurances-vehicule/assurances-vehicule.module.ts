import { Module } from '@nestjs/common';
import { AssurancesVehiculeService } from './assurances-vehicule.service';
import { AssurancesVehiculeController } from './assurances-vehicule.controller';
import { AssuranceVehicule } from './entities/assurance-vehicule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbonnementsModule } from 'src/abonnements/abonnements.module';
import { AuthService } from 'src/common/auth/auth.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssuranceVehicule]),
    AbonnementsModule,
    UsersModule,
  ],
  controllers: [AssurancesVehiculeController],
  providers: [AssurancesVehiculeService, AuthService],
  exports: [AssurancesVehiculeService],

})
export class AssurancesVehiculeModule { }

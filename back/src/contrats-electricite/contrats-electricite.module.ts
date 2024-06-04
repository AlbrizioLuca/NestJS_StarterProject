import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbonnementsModule } from 'src/abonnements/abonnements.module';
import { AuthService } from 'src/common/auth/auth.service';
import { UsersModule } from 'src/users/users.module';
import { ContratsElectriciteService } from './contrats-electricite.service';
import { ContratsElectriciteController } from './contrats-electricite.controller';
import { ContratElectricite } from './entities/contrats-electricite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContratElectricite]),
    AbonnementsModule,
    UsersModule,
  ],
  controllers: [ContratsElectriciteController],
  providers: [ContratsElectriciteService, AuthService],
  exports: [ContratsElectriciteService, TypeOrmModule],

})
export class ContratsElectriciteModule { }
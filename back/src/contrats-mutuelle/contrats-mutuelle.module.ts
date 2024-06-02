import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbonnementsModule } from 'src/abonnements/abonnements.module';
import { AuthService } from 'src/common/auth/auth.service';
import { UsersModule } from 'src/users/users.module';
import { ContratsMutuelleService } from './contrats-mutuelle.service';
import { ContratsMutuelleController } from './contrats-mutuelle.controller';
import { ContratMutuelle } from './entities/contrats-mutuelle.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContratMutuelle]),
    AbonnementsModule,
    UsersModule,
  ],
  controllers: [ContratsMutuelleController],
  providers: [ContratsMutuelleService, AuthService],
  exports: [ContratsMutuelleService],

})
export class ContratsMutuelleModule { }
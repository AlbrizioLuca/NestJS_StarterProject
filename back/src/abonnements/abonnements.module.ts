import { Module } from '@nestjs/common';
import { AbonnementsService } from './abonnements.service';
import { AbonnementsController } from './abonnements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Abonnement } from './entities/abonnement.entity';
import { AuthService } from 'src/common/auth/auth.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Abonnement]),
    UsersModule,
  ],
  controllers: [AbonnementsController],
  providers: [
    AbonnementsService,
    AuthService
  ],
  exports: [AbonnementsService],
})
export class AbonnementsModule { }

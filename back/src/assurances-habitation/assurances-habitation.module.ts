import { Module } from '@nestjs/common';
import { AssurancesHabitationService } from './assurances-habitation.service';
import { AssurancesHabitationController } from './assurances-habitation.controller';
import { AuthService } from 'src/common/auth/auth.service';
import { UsersModule } from 'src/users/users.module';
import { AbonnementsModule } from 'src/abonnements/abonnements.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssuranceHabitation } from './entities/assurances-habitation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssuranceHabitation]),
    AbonnementsModule,
    UsersModule,
  ],
  controllers: [AssurancesHabitationController],
  providers: [AssurancesHabitationService, AuthService],
  exports: [AssurancesHabitationService],

})
export class AssurancesHabitationModule { }

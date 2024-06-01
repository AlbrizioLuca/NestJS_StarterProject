import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilsController } from './profils.controller';
import { Profil } from './entities/profil.entity';
import { AuthService } from '../common/auth/auth.service';
import { UsersModule } from '../users/users.module';
import { ProfilsService } from './profils.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profil]),
    UsersModule,
  ],
  controllers: [ProfilsController],
  providers: [
    ProfilsService,
    AuthService
  ],
  exports: [ProfilsService],
})
export class ProfilsModule { }

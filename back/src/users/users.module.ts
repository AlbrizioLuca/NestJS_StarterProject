import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from 'src/common/auth/auth.service';
import { Profil } from 'src/profils/entities/profil.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profil]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
  ],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule { }
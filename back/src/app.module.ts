import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CustomConfigModule } from './common/config/config.module';
import { AuthModule } from './common/auth/auth.module';
import { UsersModule } from './users/users.module';
import { IsUniqueConstraint } from './common/validators/is-unique-constraint';
import { ProfilsModule } from './profils/profils.module';
import { AbonnementsModule } from './abonnements/abonnements.module';
import { AssurancesVehiculeModule } from './assurances-vehicule/assurances-vehicule.module';
import { AssurancesHabitationModule } from './assurances-habitation/assurances-habitation.module';
import { ContratsMutuelleModule } from './contrats-mutuelle/contrats-mutuelle.module';
import { ContratsElectriciteModule } from './contrats-electricite/contrats-electricite.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      // @ts-ignore
      useFactory: async (configService: ConfigService) => ({
        type: configService.get('DATABASE_TYPE') as
          | TypeOrmModuleOptions
          | Promise<TypeOrmModuleOptions>,
        database: configService.get('DATABASE_NAME'),
        host: configService.get('DATABASE_URL'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CustomConfigModule,
    AuthModule,
    UsersModule,
    ProfilsModule,
    AbonnementsModule,
    AssurancesVehiculeModule,
    AssurancesHabitationModule,
    ContratsMutuelleModule,
    ContratsElectriciteModule,
  ],
  providers: [IsUniqueConstraint]
})

export class AppModule { }

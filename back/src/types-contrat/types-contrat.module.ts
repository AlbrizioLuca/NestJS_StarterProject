import { Module } from '@nestjs/common';
import { TypesContratService } from './types-contrat.service';
import { TypesContratController } from './types-contrat.controller';
import { TypesContrat } from './entities/types-contrat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypesContrat]),
  ],
  controllers: [TypesContratController],
  providers: [TypesContratService],
  exports: [TypesContratService, TypeOrmModule],

})
export class TypesContratModule { }

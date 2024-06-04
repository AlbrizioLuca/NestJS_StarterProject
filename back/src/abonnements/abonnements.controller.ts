import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { AbonnementsService } from './abonnements.service';
import { CreateAbonnementDTO } from './dto/create-abonnement.dto';
import { UpdateAbonnementDTO } from './dto/update-abonnement.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ExtractToken } from '../common/decorators/extract-token.decorator';
import { AuthGuard } from '../common/auth/auth.guard';
import { TypeContratEnum } from './enums';

@ApiTags('Abonnements')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('abonnements')

export class AbonnementsController {
  constructor(
    private readonly abonnementsService: AbonnementsService
  ) { }

  @ApiOperation({ summary: 'Enregistrer UN abonnement' })
  @ApiQuery({
    name: 'type',
    enum: TypeContratEnum,
    required: true,
  })
  @Post()
  create(@Query('type') type: TypeContratEnum, @Body() createAbonnementDTO: CreateAbonnementDTO, @ExtractToken() token: string) {
    return this.abonnementsService.create(createAbonnementDTO, type, token);
  }

  @ApiOperation({ summary: 'Récupérer TOUS les abonnements' })
  @Get()
  findAll(@ExtractToken() token: string) {
    return this.abonnementsService.findAll(token);
  }

  @ApiOperation({ summary: 'Trouver UN abonnement via son id' })
  @Get(':id')
  findOne(@Param('id') id: string, @ExtractToken() token: string) {
    return this.abonnementsService.findOne(id, token);
  }

  @ApiOperation({ summary: 'Modifier UN abonnement' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAbonnementDTO: UpdateAbonnementDTO, @ExtractToken() token: string) {
    return this.abonnementsService.update(id, updateAbonnementDTO, token);
  }

  @ApiOperation({ summary: 'Supprimer UN abonnement' })
  @Delete(':id')
  remove(@Param('id') id: string, @ExtractToken() token: string) {
    return this.abonnementsService.remove(id, token);
  }
}

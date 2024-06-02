import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AssurancesVehiculeService } from './assurances-vehicule.service';
import { CreateAssuranceVehiculeDTO } from './dto/create-assurance-vehicule.dto';
import { UpdateAssuranceVehiculeDTO } from './dto/update-assurance-vehicule.dto';
import { ExtractToken } from 'src/common/decorators/extract-token.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/auth/auth.guard';

@ApiTags('Assurances Véhicule')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('assurances-vehicule')
export class AssurancesVehiculeController {
  constructor(private readonly assurancesVehiculeService: AssurancesVehiculeService) { }

  @ApiOperation({ summary: `Enregistrer les infos d'UNE assurance véhicule` })
  @Post()
  create(@Body() createAssuranceVehiculeDTO: CreateAssuranceVehiculeDTO, @ExtractToken() token: string) {
    return this.assurancesVehiculeService.create(createAssuranceVehiculeDTO, token);
  }

  @ApiOperation({ summary: 'Récupérer TOUTES les assurances vehicule' })
  @Get()
  findAll(@ExtractToken() token: string) {
    return this.assurancesVehiculeService.findAll(token);
  }

  @ApiOperation({ summary: `Trouver les infos d'UNE assurance véhicule via son id` })
  @Get(':id')
  findOne(@Param('id') id: string, @ExtractToken() token: string) {
    return this.assurancesVehiculeService.findOne(id, token);
  }

  @ApiOperation({ summary: `Modifier les infos d'UNE assurance véhicule` })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssuranceVehiculeDTO: UpdateAssuranceVehiculeDTO, @ExtractToken() token: string) {
    return this.assurancesVehiculeService.update(id, updateAssuranceVehiculeDTO, token);
  }

  @ApiOperation({ summary: `Supprimer les infos d'UNE assurance véhicule` })
  @Delete(':id')
  remove(@Param('id') id: string, @ExtractToken() token: string) {
    return this.assurancesVehiculeService.remove(id, token);
  }
}
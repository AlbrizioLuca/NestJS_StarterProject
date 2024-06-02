import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AssurancesHabitationService } from './assurances-habitation.service';
import { CreateAssuranceHabitationDTO } from './dto/create-assurance-habitation.dto';
import { UpdateAssuranceHabitationDTO } from './dto/update-assurance-habitation.dto';
import { ExtractToken } from 'src/common/decorators/extract-token.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/auth/auth.guard';

@ApiTags('Assurances Habitation')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('assurances-habitation')
export class AssurancesHabitationController {
  constructor(private readonly assurancesHabitationService: AssurancesHabitationService) { }

  @ApiOperation({ summary: `Enregistrer les infos d'UNE assurance habitation` })
  @Post()
  create(@Body() createAssuranceHabitationDTO: CreateAssuranceHabitationDTO, @ExtractToken() token: string) {
    return this.assurancesHabitationService.create(createAssuranceHabitationDTO, token);
  }

  @ApiOperation({ summary: 'Récupérer TOUTES les assurances habitation' })
  @Get()
  findAll(@ExtractToken() token: string) {
    return this.assurancesHabitationService.findAll(token);
  }

  @ApiOperation({ summary: `Trouver les infos d'UNE assurance habitation via son id` })
  @Get(':id')
  findOne(@Param('id') id: string, @ExtractToken() token: string) {
    return this.assurancesHabitationService.findOne(id, token);
  }

  @ApiOperation({ summary: `Modifier les infos d'UNE assurance habitation` })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssuranceHabitationDTO: UpdateAssuranceHabitationDTO, @ExtractToken() token: string) {
    return this.assurancesHabitationService.update(id, updateAssuranceHabitationDTO, token);
  }

  @ApiOperation({ summary: `Supprimer les infos d'UNE assurance habitation` })
  @Delete(':id')
  remove(@Param('id') id: string, @ExtractToken() token: string) {
    return this.assurancesHabitationService.remove(id, token);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ContratsMutuelleService } from './contrats-mutuelle.service';
import { CreateContratMutuelleDTO } from './dto/create-contrat-mutuelle.dto';
import { UpdateContratMutuelleDTO } from './dto/update-contrat-mutuelle.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/auth/auth.guard';
import { ExtractToken } from 'src/common/decorators/extract-token.decorator';

@ApiTags('Contrats Mutuelle')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('contrats-mutuelle')
export class ContratsMutuelleController {
  constructor(private readonly contratsMutuelleService: ContratsMutuelleService) { }

  @ApiOperation({ summary: `Enregistrer les infos d'UN contrat mutuelle` })
  @Post()
  create(@Body() createContratMutuelleDTO: CreateContratMutuelleDTO, @ExtractToken() token: string) {
    return this.contratsMutuelleService.create(createContratMutuelleDTO, token);
  }

  @ApiOperation({ summary: 'Récupérer TOUS les contrats mutuelles' })
  @Get()
  findAll(@ExtractToken() token: string) {
    return this.contratsMutuelleService.findAll(token);
  }

  @ApiOperation({ summary: `Trouver les infos d'UN contrat mutuelle via son id` })
  @Get(':id')
  findOne(@Param('id') id: string, @ExtractToken() token: string) {
    return this.contratsMutuelleService.findOne(id, token);
  }

  @ApiOperation({ summary: `Modifier les infos d'UN contrat mutuelle` })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContratMutuelleDTO: UpdateContratMutuelleDTO, @ExtractToken() token: string) {
    return this.contratsMutuelleService.update(id, updateContratMutuelleDTO, token);
  }

  @ApiOperation({ summary: `Supprimer les infos d'UN contrat mutuelle` })
  @Delete(':id')
  remove(@Param('id') id: string, @ExtractToken() token: string) {
    return this.contratsMutuelleService.remove(id, token);
  }
}

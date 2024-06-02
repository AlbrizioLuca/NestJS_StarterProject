import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ContratsElectriciteService } from './contrats-electricite.service';
import { CreateContratElectriciteDTO } from './dto/create-contrat-electricite.dto';
import { UpdateContratElectriciteDTO } from './dto/update-contrat-electricite.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/auth/auth.guard';
import { ExtractToken } from 'src/common/decorators/extract-token.decorator';

@ApiTags('Contrats Electricité')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('contrats-electricite')
export class ContratsElectriciteController {
  constructor(private readonly contratsElectriciteService: ContratsElectriciteService) { }

  @ApiOperation({ summary: `Enregistrer les infos d'UN contrat électricité` })
  @Post()
  create(@Body() createContratElectriciteDTO: CreateContratElectriciteDTO, @ExtractToken() token: string) {
    return this.contratsElectriciteService.create(createContratElectriciteDTO, token);
  }

  @ApiOperation({ summary: 'Récupérer TOUS les contrats électricité' })
  @Get()
  findAll(@ExtractToken() token: string) {
    return this.contratsElectriciteService.findAll(token);
  }

  @ApiOperation({ summary: `Trouver les infos d'UN contrat électricité via son id` })
  @Get(':id')
  findOne(@Param('id') id: string, @ExtractToken() token: string) {
    return this.contratsElectriciteService.findOne(id, token);
  }

  @ApiOperation({ summary: `Modifier les infos d'UN contrat électricité` })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContratElectriciteDTO: UpdateContratElectriciteDTO, @ExtractToken() token: string) {
    return this.contratsElectriciteService.update(id, updateContratElectriciteDTO, token);
  }

  @ApiOperation({ summary: `Supprimer les infos d'UN contrat électricité` })
  @Delete(':id')
  remove(@Param('id') id: string, @ExtractToken() token: string) {
    return this.contratsElectriciteService.remove(id, token);
  }
}

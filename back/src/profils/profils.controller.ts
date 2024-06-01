import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ProfilsService } from './profils.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../common/auth/auth.guard';
import { CreateProfilDTO } from './dto/profil/create-profil.dto';
import { UpdateProfilDTO } from './dto/profil/update-profil.dto';
import { ExtractToken } from '../common/decorators/extract-token.decorator';

@ApiTags('Profils')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('profils')

export class ProfilsController {
  constructor(
    private readonly profilsService: ProfilsService,
  ) { }

  @ApiOperation({ summary: 'Enregistrer UN profil' })
  @Post()
  create(@Body(ValidationPipe) createProfilDTO: CreateProfilDTO, @ExtractToken() token: string
  ) {
    return this.profilsService.create(createProfilDTO, token);
  }

  @ApiOperation({ summary: 'Récupérer TOUS les profils' })
  @Get()
  findAll(@ExtractToken() token: string,
  ) {
    return this.profilsService.findAll(token);
  }

  @ApiOperation({ summary: 'Trouver UN profil via son id' })
  @Get(':id')
  findOne(@Param('id') id: string, @ExtractToken() token: string) {
    return this.profilsService.findOne(id, token);
  }

  @ApiOperation({ summary: 'Modifier UN profil' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfilDTO: UpdateProfilDTO, @ExtractToken() token: string
  ) {
    return this.profilsService.update(id, updateProfilDTO, token);
  }

  @ApiOperation({ summary: 'Supprimer UN profil' })
  @Delete(':id')
  remove(@Param('id') id: string, @ExtractToken() token: string
  ) {
    return this.profilsService.remove(id, token);
  }
}

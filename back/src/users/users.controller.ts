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
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../common/auth/auth.guard';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ExtractToken } from 'src/common/decorators/extract-token.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @ApiOperation({ summary: 'Enregistrer UN user ' })
  @Post()
  create(@Body(ValidationPipe) createUserDTO: CreateUserDTO) {
    return this.usersService.create(createUserDTO);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Recupérer TOUS les users' })
  @Get()
  findAll(@ExtractToken() token: string) {
    return this.usersService.findAll(token);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Trouver UN user via son id' })
  @Get(':id')
  findOne(@Param('id') id: string, @ExtractToken() token: string) {
    return this.usersService.findOne(id, token);
  }
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Modifier UN user ' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDTO: UpdateUserDTO, @ExtractToken() token: string
  ) {
    return this.usersService.update(id, updateUserDTO, token);
  }
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer UN user' })
  @Delete(':id')
  remove(@Param('id') id: string, @ExtractToken() token: string
  ) {
    return this.usersService.remove(id, token);
  }
}

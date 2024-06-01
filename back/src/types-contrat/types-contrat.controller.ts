import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypesContratService } from './types-contrat.service';
import { CreateTypesContratDTO } from './dto/create-types-contrat.dto';
import { UpdateTypesContratDTO } from './dto/update-types-contrat.dto';

@Controller('types-contrat')
export class TypesContratController {
  constructor(private readonly typesContratService: TypesContratService) { }

  @Post()
  create(@Body() createTypesContratDTO: CreateTypesContratDTO) {
    return this.typesContratService.create(createTypesContratDTO);
  }

  @Get()
  findAll() {
    return this.typesContratService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typesContratService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypesContratDTO: UpdateTypesContratDTO) {
    return this.typesContratService.update(+id, updateTypesContratDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typesContratService.remove(+id);
  }
}

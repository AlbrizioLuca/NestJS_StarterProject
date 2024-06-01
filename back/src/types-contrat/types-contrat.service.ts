import { Injectable } from '@nestjs/common';
import { CreateTypesContratDTO } from './dto/create-types-contrat.dto';
import { UpdateTypesContratDTO } from './dto/update-types-contrat.dto';

@Injectable()
export class TypesContratService {
  create(createTypesContratDTO: CreateTypesContratDTO) {
    return 'This action adds a new typesContrat';
  }

  findAll() {
    return `This action returns all typesContrat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typesContrat`;
  }

  update(id: number, updateTypesContratDTO: UpdateTypesContratDTO) {
    return `This action updates a #${id} typesContrat`;
  }

  remove(id: number) {
    return `This action removes a #${id} typesContrat`;
  }
}

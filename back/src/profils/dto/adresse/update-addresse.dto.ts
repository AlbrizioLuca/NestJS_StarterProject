import { PartialType } from '@nestjs/mapped-types';
import { CreateAdresseDTO } from './create-adresse.dto';

export class UpdateAdresseDTO extends PartialType(CreateAdresseDTO) { }

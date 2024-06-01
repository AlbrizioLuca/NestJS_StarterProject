import { PartialType } from '@nestjs/swagger';
import { CreateTypesContratDTO } from './create-types-contrat.dto';

export class UpdateTypesContratDTO extends PartialType(CreateTypesContratDTO) { }

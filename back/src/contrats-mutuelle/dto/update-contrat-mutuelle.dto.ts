import { PartialType } from '@nestjs/swagger';
import { CreateContratMutuelleDTO } from './create-contrat-mutuelle.dto';

export class UpdateContratMutuelleDTO extends PartialType(CreateContratMutuelleDTO) { }

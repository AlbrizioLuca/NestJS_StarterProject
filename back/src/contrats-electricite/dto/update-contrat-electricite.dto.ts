import { PartialType } from '@nestjs/swagger';
import { CreateContratElectriciteDTO } from './create-contrat-electricite.dto';

export class UpdateContratElectriciteDTO extends PartialType(CreateContratElectriciteDTO) { }

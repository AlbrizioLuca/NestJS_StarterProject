import { PartialType } from '@nestjs/swagger';
import { CreateAssuranceVehiculeDTO } from './create-assurance-vehicule.dto';

export class UpdateAssuranceVehiculeDTO extends PartialType(CreateAssuranceVehiculeDTO) { }

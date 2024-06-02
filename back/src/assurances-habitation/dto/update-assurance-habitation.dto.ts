import { PartialType } from '@nestjs/swagger';
import { CreateAssuranceHabitationDTO } from './create-assurance-habitation.dto';

export class UpdateAssuranceHabitationDTO extends PartialType(CreateAssuranceHabitationDTO) { }

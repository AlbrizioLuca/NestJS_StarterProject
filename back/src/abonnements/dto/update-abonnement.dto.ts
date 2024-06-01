import { PartialType } from '@nestjs/mapped-types';
import { CreateAbonnementDTO } from './create-abonnement.dto';

export class UpdateAbonnementDTO extends PartialType(CreateAbonnementDTO) { }

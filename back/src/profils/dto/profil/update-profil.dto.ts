import { PartialType } from '@nestjs/swagger';
import { CreateProfilDTO } from './create-profil.dto';

export class UpdateProfilDTO extends PartialType(CreateProfilDTO) { }

import { IsBoolean, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContratElectriciteDTO {
    @ApiProperty({ example: true })
    @IsBoolean()
    conso_annuelle: boolean;

    @ApiProperty({ example: 'appartement' })
    @IsString()
    type_logement: string;

    @ApiProperty({ example: 80 })
    @IsNumber()
    surface_logement: number;

    @ApiProperty({ example: 2 })
    @IsNumber()
    personnes_foyer: number;

    @ApiProperty({ example: 'électrique' })
    @IsString()
    type_chauffage: string;

    @ApiProperty({ example: 'chaudière' })
    @IsString()
    eau_chaude: string;

    @ApiProperty({ example: 'cuisinière' })
    @IsString()
    equipements_cuisine: string;
}

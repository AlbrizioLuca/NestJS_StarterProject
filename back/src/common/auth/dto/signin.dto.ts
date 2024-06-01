import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class SigninDto {
  @ApiProperty({ example: 'juste.leblanc@mail.com' })
  @IsNotEmpty()
  @IsEmail()
  @Matches(/(^[a-zA-Z0-9_.]+[@]{1}[a-z0-9]+[\.][a-z]+$)/mg,
    { message: `L'adresse e-mail doit être valide` })
  email: string;

  @ApiProperty({ example: '1MotdePasse?' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~]).{8,}$/,
    { message: 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un caractère spécial et un nombre' })
  password: string;
}
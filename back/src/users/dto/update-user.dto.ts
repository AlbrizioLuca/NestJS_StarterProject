
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDTO } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
    @ApiProperty({ example: 'juste.leblanc@mail.com', required: false })
    @IsEmail()
    @Matches(/(^[a-zA-Z0-9_.]+[@]{1}[a-z0-9]+[\.][a-z]+$)/mg, { message: `The email address must be valid`, each: true })
    email?: string;

    @ApiProperty({ example: '1MotdePasse?', minLength: 8 })
    @IsNotEmpty()
    @IsString()
    @Length(8, 255)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~]).{8,}$/,
        { "message": "The password must contain at least one uppercase letter, one lowercase letter, one special character, one number, and must be a minimum length of 8 characters" }
    )
    password?: string;
}
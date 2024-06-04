import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, Length, Matches } from 'class-validator';
import { IsUnique } from '../../common/validators/is-unique.validator';

export class CreateUserDTO {
    @ApiProperty({ example: 'juste.leblanc@mail.com' })
    @IsNotEmpty()
    @IsEmail()
    @IsUnique({ tableName: 'user', column: 'email' })
    @Matches(/(^[a-zA-Z0-9_.]+[@]{1}[a-z0-9]+[\.][a-z]+$)/mg,
        { message: `The email address must be valid` })
    email: string;

    @ApiProperty({ example: '1MotdePasse?', minLength: 8 })
    @IsNotEmpty()
    @IsString()
    @Length(8, 255)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~]).{8,}$/,
        { "message": "The password must contain at least one uppercase letter, one lowercase letter, one special character, one number, and must be a minimum length of 8 characters" }
    )
    password: string;
}

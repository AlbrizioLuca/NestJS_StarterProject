import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService) { }

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersRepository.findOne({ where: { email: email } });
        if (!user) {
            throw new NotFoundException(
                `No user found with the provided email: ${email}`,
            );
        }

        if (!user) {
            throw new UnauthorizedException();
        }

        if (!await bcrypt.compare(pass, user.password)) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, role: user.role };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    // Private function to check permissions
    async checkPermissions(token: string, userId?: string) {
        const { authenticatedUserID, authenticatedUserRole } = await this.decodedToken(token)
        // Throw a forbidden Exception if the user is not Admin and he try to make CRUD requests to other data than himself
        if (userId !== authenticatedUserID && authenticatedUserRole !== 'Admin') {
            throw new ForbiddenException('You can only read, modify, or delete data concerning your own account.');
        }
    }

    async decodedToken(token: string) {
        // Decode the token to recover userID and userRole
        const decodedToken = this.jwtService.decode(token);
        // Save data present in the token payload
        const authenticatedUserID = decodedToken.sub;
        const authenticatedUserRole = decodedToken.role;
        //! Debugging don't forget to remove ! 
        console.log("authenticatedUserID: ", authenticatedUserID);
        console.log("authenticatedUserRole: ", authenticatedUserRole);
        return { authenticatedUserID, authenticatedUserRole };
    }
}

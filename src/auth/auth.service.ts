import { HttpException, Injectable } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { hash, compare } from 'bcrypt';
import { UserService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    public constructor(
        private userService: UserService,
        private jwtService: JwtService
        ) {

    }

    public async registerUser(registrationDto: RegistrationDto) {
        const userExists = await this.userService.userExists(registrationDto.email);

        if (userExists) {
            throw new HttpException({
                status: false,
                message: `A user already exists with the given email`,
                field: 'email'
            }, 200);
        }

        if (registrationDto.password !== registrationDto.passwordAgain) {
            throw new HttpException({
                status: false,
                message: 'The provided password do not match',
                field: 'password'
            }, 200);
        }

        if (registrationDto.password.length < 8) {
            throw new HttpException({
                status: false,
                message: 'The provided password is too weak',
                field: 'passoword'
            }, 200);
        }

        const passwordHash = await hash(registrationDto.password, 10);

        const user = await this.userService.create({
            firstName: registrationDto.firstName,
            lastName: registrationDto.lastName,
            email: registrationDto.email,
            password: passwordHash
        });
    }

    public async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);

        if (!user) {
            return null;
        }

        const passwordMatches = await compare(password, user.password);
        if (!passwordMatches) {
            return null;
        }

        const userData = user.toObject();
        delete userData.password;

        //remove the password from the user representation
        return userData;
    }

    public async login(user: any) {
        const payload = {
            email: user.email,
            sub: user._id
        }

        return {
            token: this.jwtService.sign(payload)
        }
    }
}

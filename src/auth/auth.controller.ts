import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { BodyValidationPipe } from 'src/pipes/body-validation.pipe';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {

    public constructor(private authService: AuthService) {

    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    public login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('signup')
    public async registration(@Body(new BodyValidationPipe()) registrationDto: RegistrationDto) {
        await this.authService.registerUser(registrationDto);
        return {
            status: true,
            message: 'Registration successful'
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get('is-authenticated')
    public authorize() {
        return {
            status: true
        }
    }
}

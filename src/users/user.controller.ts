import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {

    public constructor() {

    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    public profile(@Request() req) {
        return req.user;
    }
}

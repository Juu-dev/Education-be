import {Body, Controller, Post, UseInterceptors} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {AuthClaims} from '@n-decorators';
import {CookieInterceptor} from '@n-interceptors';

import {AuthService} from './auth.service';
import {LoginDto, RegisterDto} from './dtos';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('register')
    async register(@Body() registrationData: RegisterDto) {
        return this.authService.register(registrationData);
    }

    @Post('login')
    @UseInterceptors(CookieInterceptor)
    async logIn(@Body() loginData: LoginDto) {
        return this.authService.login(loginData);
    }
}

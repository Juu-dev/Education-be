import {
  Body, Controller, Get, Post, Req, UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthClaims, AuthToken, GetUser } from '@n-decorators';
import { ClearCookieInterceptor, CookieInterceptor } from '@n-interceptors';
import { Request } from 'express';

import { Permission } from '@n-constants';
import { AuthService } from './auth.service';
import {
  ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto,
} from './dtos';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('register/student')
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.registerForStudent(registrationData);
  }

  @Post('login')
  @UseInterceptors(CookieInterceptor)
  async logIn(@Body() loginData: LoginDto) {
    return this.authService.login(loginData);
  }

  @Post('refresh-token')
  @UseInterceptors(CookieInterceptor)
  async refresh(@Req() request: Request) {
    const { refreshToken } = request.cookies;
    return this.authService.refresh(refreshToken);
  }

  @Get('get-me')
  @AuthClaims()
  @UseInterceptors(CookieInterceptor)
  async getMe(
    @GetUser() user: any,
  ) {
    return this.authService.getMe(user?.username);
  }

  @Post('logout')
  @AuthToken()
  @UseInterceptors(ClearCookieInterceptor)
  async logOut(@Req() request) {
    return this.authService.logOut(request?.user?.refreshTokenId);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body);
  }

  @Post('reset-password')
  @AuthToken()
  async resetPassword(@Body() body: ResetPasswordDto, @Req() request) {
    await this.authService.resetPassword(body, request.user.id);
  }
}

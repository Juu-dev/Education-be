import {
  Body,
  Req,
  Controller,
  Post,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthClaims, AuthToken, Permissions } from '@n-decorators';
import { CookieInterceptor, ClearCookieInterceptor } from '@n-interceptors';
import { Request } from 'express';

import { Permission } from '@n-constants';
import { AuthService } from './auth.service';
import {
  LoginDto,
  RegisterDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from './dtos';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Permissions([Permission.CREATE_USER])
  @AuthClaims()
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }

  @Post('login')
  @UseInterceptors(CookieInterceptor)
  async logIn(@Body() loginData: LoginDto) {
    return this.authService.login(loginData);
  }

  @Get('refresh-token')
  async refresh(@Req() request: Request) {
    const { refreshToken } = request.cookies;
    return this.authService.refresh(refreshToken);
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

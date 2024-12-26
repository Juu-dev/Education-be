import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { COMMON_CONSTANT, Errors, PrismaError } from '@n-constants';
import { Prisma } from '@prisma/client';
import { BaseException } from '@n-exceptions';
import { JwtPayloadModel } from '@n-models';
import { RefreshTokensRepository } from './refresh-tokens.repository';
import { UsersRepository } from '../users/users.repository';
import { StudentsRepository } from '../../education-service/students/students.repository';
import { ClassesRepository } from './../../education-service/classes/classes.repository';
import {
  ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto,
} from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly classesRepository: ClassesRepository,
    private readonly refreshTokensRepository: RefreshTokensRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
  }

  public async registerForStudent(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(
      registrationData.password,
      COMMON_CONSTANT.SALT_ROUND,
    );
    const indentClass = await this.classesRepository.findByClassName(registrationData.className);

    const data= {
      username: registrationData.email,
      password: hashedPassword,
      email: registrationData.email,
      roles: {
        create: [
          {
            role: {
              connect: {
                name: "student",
              },
            },
          },
        ],
      },
      Student: {
        create: {
          classId: indentClass.id,
          parentName: "Nguyễn Văn B",
          name: "Nguyễn Văn A",
        },
      }
    }

    return await this.usersRepository.create(data as any);
  }

  public async login(loginData: LoginDto) {
    const {
      username,
      password,
    } = loginData;
    // User authentication
    const user = await this.getAuthenticatedUser(username, password);

    // Generate token
    const {
      accessToken,
      refreshToken,
    } = await this.generateToken({
      id: user.id,
      username: user.username,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        ...user,
      },
    };
  }

  public async refresh(refreshToken: string | null) {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get('app.refreshTokenSecret'),
    });

    delete payload.iat;
    delete payload.exp;

    // Check refreshToken in white list
    const foundedRefreshToken = await this.refreshTokensRepository.findByValue(
      refreshToken,
    );

    if (!foundedRefreshToken) {
      throw new BaseException(Errors.AUTH.INVALID_REFRESH_TOKEN);
    }

    const user = await this.usersRepository.findByUsername(
      payload.username,
    );

    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      username: user.username,
      refreshTokenId: foundedRefreshToken.id,
    });

    return {
        data: {
          accessToken,
          user: {
            ...user,
          },
        }
      };
  }

  public async logOut(refreshTokenId: string) {
    return this.refreshTokensRepository.deleteById(refreshTokenId);
  }

  public async forgotPassword(body: ForgotPasswordDto) {
    const { username } = body;

    const user = await this.usersRepository.findByUsername(username);

    if (!user) {
      throw new BaseException(Errors.AUTH.USER_NOT_FOUND);
    }

    const dataUser: any = {
      otpExpiredAt: new Date(Date.now() + 60000),
    };

    return this.usersRepository.updateById(user.id, dataUser);
  }

  public async resetPassword(body: ResetPasswordDto, userId: string) {
    const { newPassword } = body;
    const hashedPassword = await bcrypt.hash(
      newPassword,
      COMMON_CONSTANT.SALT_ROUND,
    );

    const dataUser: any = {
      password: hashedPassword,
    };

    await this.usersRepository.updateById(userId, dataUser);
  }

  private async generateToken(
    payload: JwtPayloadModel,
  ) {
    // Generate refreshToken
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('app.refreshTokenSecret'),
      expiresIn: `${this.configService.get('app.refreshTokenExpTime')}`,
    });

    const refreshTokenData: any = {
      value: refreshToken,
      userId: payload.id,
    };
    const newRefreshToken = await this.refreshTokensRepository.create(refreshTokenData);

    // Generate accessToken with payload have refreshTokenId
    const accessToken = await this.jwtService.signAsync({
      ...payload,
      refreshTokenId: newRefreshToken.id,
    }, {
      secret: this.configService.get('app.accessTokenSecret'),
      expiresIn: `${this.configService.get('app.accessTokenExpTime')}`,
    });

    return {
      refreshToken,
      accessToken,
    };
  }

  private async getAuthenticatedUser(
    username: string,
    plainTextPassword: string,
  ) {
    const user = await this.usersRepository.findByUsername(
      username,
    );

    if (!user) throw new BaseException(Errors.AUTH.WRONG_CREDENTIALS);

    const checkPassword = await bcrypt.compare(
      plainTextPassword,
      user.password,
    );

    if (!checkPassword) {
      throw new BaseException(Errors.AUTH.WRONG_CREDENTIALS);
    }

    user.password = undefined;
    return user;
  }
}

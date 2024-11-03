import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import {COMMON_CONSTANT, Errors, PrismaError} from '@n-constants';
import {Prisma} from '@prisma/client';
import {BaseException} from '@n-exceptions';
import {JwtPayloadModel} from '@n-models';
import {UsersRepository} from '../users/users.repository';

import {LoginDto, RegisterDto,} from './dtos';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {
    }

    public async register(registrationData: RegisterDto) {
        const hashedPassword = await bcrypt.hash(
            registrationData.password,
            COMMON_CONSTANT.SALT_ROUND,
        );

        const dataUser: any = {
            ...registrationData,
            password: hashedPassword,
        };

        try {
            const createdUser = await this.usersRepository.create(dataUser);
            createdUser.password = undefined;
            return createdUser;
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error?.code === PrismaError.UniqueConstraintFailed
            ) {
                throw new BaseException(Errors.AUTH.PHONE_EXISTED);
            }
            throw new BaseException(Errors.DEFAULT);
        }
    }

    public async login(loginData: LoginDto) {
        const {
            username,
            password
        } = loginData;

        // User authentication
        const user = await this.getAuthenticatedUser(username, password);

        // Generate token
        const {
            accessToken,
            refreshToken
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

    private async generateToken(
        payload: JwtPayloadModel,
    ) {
        // Generate refreshToken
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('app.refreshTokenSecret'),
            expiresIn: `${this.configService.get('app.refreshTokenExpTime')}`,
        });

        // Generate accessToken with payload have refreshTokenId
        const accessToken = await this.jwtService.signAsync({
            ...payload,
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
        const user = await this.usersRepository.findByUsername(username);

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

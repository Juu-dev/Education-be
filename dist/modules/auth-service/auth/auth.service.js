"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcryptjs"));
const _n_constants_1 = require("../../../constants/index");
const _n_exceptions_1 = require("../../../filter-exceptions/index");
const refresh_tokens_repository_1 = require("./refresh-tokens.repository");
const users_repository_1 = require("../users/users.repository");
const classes_repository_1 = require("./../../education-service/classes/classes.repository");
let AuthService = class AuthService {
    constructor(usersRepository, classesRepository, refreshTokensRepository, jwtService, configService) {
        this.usersRepository = usersRepository;
        this.classesRepository = classesRepository;
        this.refreshTokensRepository = refreshTokensRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async registerForStudent(registrationData) {
        const { password } = registrationData;
        const hashedPassword = await bcrypt.hash(password, _n_constants_1.COMMON_CONSTANT.SALT_ROUND);
        const data = {
            ...registrationData,
            password: hashedPassword,
        };
        return this.usersRepository.createStudent(data);
    }
    async login(loginData) {
        const { username, password, } = loginData;
        const user = await this.getAuthenticatedUser(username, password);
        const { accessToken, refreshToken, } = await this.generateToken({
            id: user.id,
            username: user.username,
            classId: user.class.id
        });
        return {
            accessToken,
            refreshToken,
            user: {
                ...user,
            },
        };
    }
    async refresh(refreshToken) {
        const payload = await this.jwtService.verifyAsync(refreshToken, {
            secret: this.configService.get('app.refreshTokenSecret'),
        });
        delete payload.iat;
        delete payload.exp;
        const foundedRefreshToken = await this.refreshTokensRepository.findByValue(refreshToken);
        if (!foundedRefreshToken) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.AUTH.INVALID_REFRESH_TOKEN);
        }
        const user = await this.usersRepository.findByUsername(payload.username);
        const accessToken = await this.jwtService.signAsync({
            id: user.id,
            username: user.username,
            refreshTokenId: foundedRefreshToken.id,
            classId: user.class.id
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
    async logOut(refreshTokenId) {
        return this.refreshTokensRepository.hardDeleteById(refreshTokenId);
    }
    async forgotPassword(body) {
        const { username } = body;
        const user = await this.usersRepository.findByUsername(username);
        if (!user) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.AUTH.USER_NOT_FOUND);
        }
        const dataUser = {
            otpExpiredAt: new Date(Date.now() + 60000),
        };
        return this.usersRepository.updateById(user.id, dataUser);
    }
    async resetPassword(body, userId) {
        const { newPassword } = body;
        const hashedPassword = await bcrypt.hash(newPassword, _n_constants_1.COMMON_CONSTANT.SALT_ROUND);
        const dataUser = {
            password: hashedPassword,
        };
        await this.usersRepository.updateById(userId, dataUser);
    }
    async generateToken(payload) {
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('app.refreshTokenSecret'),
            expiresIn: `${this.configService.get('app.refreshTokenExpTime')}`,
        });
        const refreshTokenData = {
            value: refreshToken,
            userId: payload.id,
        };
        const newRefreshToken = await this.refreshTokensRepository.create(refreshTokenData);
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
    async getAuthenticatedUser(username, plainTextPassword) {
        const user = await this.usersRepository.findByUsername(username);
        if (!user)
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.AUTH.WRONG_CREDENTIALS);
        const checkPassword = await bcrypt.compare(plainTextPassword, user.password);
        if (!checkPassword) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.AUTH.WRONG_CREDENTIALS);
        }
        user.password = undefined;
        return user;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        classes_repository_1.ClassesRepository,
        refresh_tokens_repository_1.RefreshTokensRepository,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
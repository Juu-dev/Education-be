"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const passport_1 = require("@nestjs/passport");
const module_configs_1 = require("../../../configs/module-configs");
const prisma_module_1 = require("../../../database/prisma/prisma.module");
const users_repository_1 = require("../users/users.repository");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const roles_module_1 = require("../roles/roles.module");
const roles_repository_1 = require("../roles/roles.repository");
const users_module_1 = require("../users/users.module");
const students_repository_1 = require("../../education-service/students/students.repository");
const students_module_1 = require("../../education-service/students/students.module");
const classes_repository_1 = require("../../education-service/classes/classes.repository");
const classes_module_1 = require("./../../education-service/classes/classes.module");
const refresh_tokens_repository_1 = require("./refresh-tokens.repository");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            users_module_1.UsersModule,
            students_module_1.StudentsModule,
            roles_module_1.RolesModule,
            passport_1.PassportModule,
            classes_module_1.ClassesModule,
            cache_manager_1.CacheModule.registerAsync(module_configs_1.RedisOptions),
        ],
        providers: [
            auth_service_1.AuthService,
            users_repository_1.UsersRepository,
            students_repository_1.StudentsRepository,
            roles_repository_1.RolesRepository,
            classes_repository_1.ClassesRepository,
            refresh_tokens_repository_1.RefreshTokensRepository,
        ],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map
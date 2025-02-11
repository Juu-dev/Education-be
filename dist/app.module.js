"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const nestjs_pino_1 = require("nestjs-pino");
const app_config_1 = __importDefault(require("./configs/env/app.config"));
const database_config_1 = __importDefault(require("./configs/env/database.config"));
const email_config_1 = __importDefault(require("./configs/env/email.config"));
const env_validation_1 = __importDefault(require("./configs/env/env.validation"));
const redis_config_1 = __importDefault(require("./configs/env/redis.config"));
const module_configs_1 = require("./configs/module-configs");
const prisma_module_1 = require("./database/prisma/prisma.module");
const _n_exceptions_1 = require("./filter-exceptions/index");
const _n_interceptors_1 = require("./interceptors/index");
const auth_service_module_1 = require("./modules/auth-service/auth-service.module");
const education_service_module_1 = require("./modules/education-service/education-service.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const file_upload_module_1 = require("./modules/file-upload/file-upload.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
                load: [app_config_1.default, database_config_1.default, email_config_1.default, redis_config_1.default],
                validate: env_validation_1.default,
            }),
            cache_manager_1.CacheModule.registerAsync(module_configs_1.RedisOptions),
            jwt_1.JwtModule.registerAsync(module_configs_1.JwtOptions),
            nestjs_pino_1.LoggerModule.forRoot(module_configs_1.LoggerOptions),
            prisma_module_1.PrismaModule,
            auth_service_module_1.AuthServiceModule,
            education_service_module_1.EducationServiceModule,
            file_upload_module_1.FileUploadModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: _n_interceptors_1.ResponseInterceptor,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: _n_exceptions_1.AllExceptionsFilter,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
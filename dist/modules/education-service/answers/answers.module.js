"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswersModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../../database/prisma/prisma.module");
const answers_service_1 = require("./answers.service");
const users_repository_1 = require("../../auth-service/users/users.repository");
const answers_controller_1 = require("./answers.controller");
const answers_repository_1 = require("./answers.repository");
let AnswersModule = class AnswersModule {
};
AnswersModule = __decorate([
    (0, common_1.Module)({
        controllers: [answers_controller_1.AnswersController],
        providers: [answers_service_1.AnswersService, answers_repository_1.AnswersRepository, users_repository_1.UsersRepository],
        imports: [prisma_module_1.PrismaModule],
    })
], AnswersModule);
exports.AnswersModule = AnswersModule;
//# sourceMappingURL=answers.module.js.map
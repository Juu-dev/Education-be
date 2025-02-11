"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExercisesModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../../database/prisma/prisma.module");
const exercises_service_1 = require("./exercises.service");
const exercises_controller_1 = require("./exercises.controller");
const exercises_repository_1 = require("./exercises.repository");
const classes_module_1 = require("../classes/classes.module");
const classes_repository_1 = require("../classes/classes.repository");
const quizzes_repository_1 = require("../quizzes/quizzes.repository");
const quizzes_module_1 = require("../quizzes/quizzes.module");
const users_module_1 = require("../../auth-service/users/users.module");
const users_repository_1 = require("../../auth-service/users/users.repository");
let ExercisesModule = class ExercisesModule {
};
ExercisesModule = __decorate([
    (0, common_1.Module)({
        controllers: [exercises_controller_1.ExercisesController],
        providers: [exercises_service_1.ExercisesService, exercises_repository_1.ExercisesRepository, classes_repository_1.ClassesRepository, quizzes_repository_1.QuizzesRepository, users_repository_1.UsersRepository],
        imports: [prisma_module_1.PrismaModule, classes_module_1.ClassesModule, quizzes_module_1.QuizzesModule, users_module_1.UsersModule],
        exports: [exercises_service_1.ExercisesService],
    })
], ExercisesModule);
exports.ExercisesModule = ExercisesModule;
//# sourceMappingURL=exercises.module.js.map
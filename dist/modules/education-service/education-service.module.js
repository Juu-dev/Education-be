"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EducationServiceModule = void 0;
const common_1 = require("@nestjs/common");
const classes_module_1 = require("./classes/classes.module");
const students_module_1 = require("./students/students.module");
const documents_module_1 = require("./documents/documents.module");
const teachers_module_1 = require("./teachers/teachers.module");
const tasks_module_1 = require("./tasks/tasks.module");
const books_module_1 = require("./books/books.module");
const quizzes_module_1 = require("./quizzes/quizzes.module");
const exercises_module_1 = require("./exercises/exercises.module");
const books_import_module_1 = require("./books-import/books-import.module");
const answers_module_1 = require("./answers/answers.module");
let EducationServiceModule = class EducationServiceModule {
};
EducationServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            documents_module_1.DocumentsModule,
            teachers_module_1.TeachersModule,
            classes_module_1.ClassesModule,
            students_module_1.StudentsModule,
            tasks_module_1.TasksModule,
            books_module_1.BooksModule,
            quizzes_module_1.QuizzesModule,
            exercises_module_1.ExercisesModule,
            books_import_module_1.BooksImportModule,
            answers_module_1.AnswersModule
        ],
        providers: [],
        controllers: [],
        exports: [],
    })
], EducationServiceModule);
exports.EducationServiceModule = EducationServiceModule;
//# sourceMappingURL=education-service.module.js.map
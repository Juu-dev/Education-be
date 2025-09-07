"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksImportModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../../database/prisma/prisma.module");
const books_import_service_1 = require("./books-import.service");
const books_import_controller_1 = require("./books-import.controller");
const books_import_repository_1 = require("./books-import.repository");
let BooksImportModule = class BooksImportModule {
};
BooksImportModule = __decorate([
    (0, common_1.Module)({
        controllers: [books_import_controller_1.BooksImportController],
        providers: [books_import_service_1.BooksImportService, books_import_repository_1.BooksImportRepository],
        imports: [prisma_module_1.PrismaModule],
    })
], BooksImportModule);
exports.BooksImportModule = BooksImportModule;
//# sourceMappingURL=books-import.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksImportService = void 0;
const common_1 = require("@nestjs/common");
const _n_exceptions_1 = require("../../../filter-exceptions/index");
const _n_constants_1 = require("../../../constants/index");
const books_import_repository_1 = require("./books-import.repository");
let BooksImportService = class BooksImportService {
    constructor(booksImportRepository) {
        this.booksImportRepository = booksImportRepository;
    }
    async createBook(createBookDto) {
        const book = await this.booksImportRepository.create({
            ...createBookDto,
        });
        return {
            data: book,
        };
    }
    async getOverviewBook() {
        const overview = await this.booksImportRepository.getOverviewBook();
        return {
            data: overview,
        };
    }
    async bulkBook(bulkBookDto) {
        const books = await this.booksImportRepository.createMany(bulkBookDto);
        return {
            data: books,
        };
    }
    async bulkOverrideBook(bulkBookDto) {
        await this.booksImportRepository.deleteAllBooks();
        const books = await this.booksImportRepository.createMany(bulkBookDto);
        return {
            data: books,
        };
    }
    async getListBook(page, pageSize) {
        const count = await this.booksImportRepository.count();
        const items = await this.booksImportRepository.findAllPagination({
            page,
            pageSize
        });
        return {
            pagination: {
                page,
                pageSize,
                totalPage: Math.ceil(count / pageSize),
            },
            count,
            data: items,
        };
    }
    async getBookById(id) {
        const book = await this.booksImportRepository.findById(id);
        if (!book) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.BOOK.BOOK_NOT_FOUND);
        }
        return { data: book };
    }
    async updateBook(id, updateBookDto) {
        const book = await this.booksImportRepository.findById(id);
        if (!book) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.BOOK.BOOK_NOT_FOUND);
        }
        return this.booksImportRepository.updateById(id, updateBookDto);
    }
    async softDeleteAllBook() {
        return this.booksImportRepository.deleteAllBooks();
    }
};
BooksImportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [books_import_repository_1.BooksImportRepository])
], BooksImportService);
exports.BooksImportService = BooksImportService;
//# sourceMappingURL=books-import.service.js.map
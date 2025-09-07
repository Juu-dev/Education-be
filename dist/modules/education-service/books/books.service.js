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
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const _n_exceptions_1 = require("../../../filter-exceptions/index");
const _n_constants_1 = require("../../../constants/index");
const books_repository_1 = require("./books.repository");
const file_upload_service_1 = require("../../file-upload/file-upload.service");
let BooksService = class BooksService {
    constructor(booksRepository, fileUploadService) {
        this.booksRepository = booksRepository;
        this.fileUploadService = fileUploadService;
    }
    async createBook(createBookDto, files) {
        const fileMappings = this.mapFiles(files);
        const [coverImageUrl, contentPdfUrl] = await this.uploadFiles(fileMappings);
        const book = await this.booksRepository.create({
            ...createBookDto,
            coverImageUrl,
            contentPdfUrl,
        });
        return {
            data: book,
        };
    }
    mapFiles(files) {
        const coverImage = files.find(file => file.mimetype.startsWith('image/'));
        const contentPdf = files.find(file => file.mimetype === 'application/pdf');
        if (!coverImage || !contentPdf) {
            throw new Error('Cover image or content PDF is missing');
        }
        return { coverImage, contentPdf };
    }
    async uploadFiles({ coverImage, contentPdf, }) {
        const [coverImageUpload, contentPdfUpload] = await Promise.all([
            this.fileUploadService.uploadFile(coverImage),
            this.fileUploadService.uploadFile(contentPdf),
        ]);
        return [coverImageUpload.Location, contentPdfUpload.Location];
    }
    async getListBook(page, pageSize, type) {
        const where = {};
        if (type) {
            where.type = type;
        }
        const count = await this.booksRepository.count({ where });
        const items = await this.booksRepository.findAllPagination({
            page,
            pageSize,
            where
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
        const book = await this.booksRepository.findById(id);
        if (!book) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.BOOK.BOOK_NOT_FOUND);
        }
        return { data: book };
    }
    async updateBook(id, updateBookDto) {
        const book = await this.booksRepository.findById(id);
        if (!book) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.BOOK.BOOK_NOT_FOUND);
        }
        return this.booksRepository.updateById(id, updateBookDto);
    }
};
BooksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [books_repository_1.BooksRepository,
        file_upload_service_1.FileUploadService])
], BooksService);
exports.BooksService = BooksService;
//# sourceMappingURL=books.service.js.map
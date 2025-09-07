"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformException = exports.busboyExceptions = exports.multerExceptions = void 0;
const common_1 = require("@nestjs/common");
exports.multerExceptions = {
    LIMIT_PART_COUNT: 'Too many parts',
    LIMIT_FILE_SIZE: 'File too large',
    LIMIT_FILE_COUNT: 'Too many files',
    LIMIT_FIELD_KEY: 'Field name too long',
    LIMIT_FIELD_VALUE: 'Field value too long',
    LIMIT_FIELD_COUNT: 'Too many fields',
    LIMIT_UNEXPECTED_FILE: 'Unexpected field',
    MISSING_FIELD_NAME: 'Field name missing',
};
exports.busboyExceptions = {
    MULTIPART_BOUNDARY_NOT_FOUND: 'Multipart: Boundary not found',
    MULTIPART_MALFORMED_PART_HEADER: 'Malformed part header',
    MULTIPART_UNEXPECTED_END_OF_FORM: 'Unexpected end of form',
    MULTIPART_UNEXPECTED_END_OF_FILE: 'Unexpected end of file',
};
function transformException(error) {
    if (!error || error instanceof common_1.HttpException) {
        return error;
    }
    switch (error.message) {
        case exports.multerExceptions.LIMIT_FILE_SIZE: {
            return new common_1.PayloadTooLargeException(error.message);
        }
        case exports.multerExceptions.LIMIT_FILE_COUNT:
        case exports.multerExceptions.LIMIT_FIELD_KEY:
        case exports.multerExceptions.LIMIT_FIELD_VALUE:
        case exports.multerExceptions.LIMIT_FIELD_COUNT:
        case exports.multerExceptions.LIMIT_UNEXPECTED_FILE:
        case exports.multerExceptions.LIMIT_PART_COUNT:
        case exports.multerExceptions.MISSING_FIELD_NAME: {
            return new common_1.BadRequestException(error.message);
        }
        case exports.busboyExceptions.MULTIPART_BOUNDARY_NOT_FOUND: {
            return new common_1.BadRequestException(error.message);
        }
        case exports.busboyExceptions.MULTIPART_MALFORMED_PART_HEADER:
        case exports.busboyExceptions.MULTIPART_UNEXPECTED_END_OF_FORM:
        case exports.busboyExceptions.MULTIPART_UNEXPECTED_END_OF_FILE: {
            return new common_1.BadRequestException(`Multipart: ${error.message}`);
        }
    }
    return error;
}
exports.transformException = transformException;
//# sourceMappingURL=multer.util.js.map
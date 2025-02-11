"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBookImportDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_book_import_dto_1 = require("./create-book-import.dto");
class UpdateBookImportDto extends (0, swagger_1.PartialType)(create_book_import_dto_1.CreateBookImportDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateBookImportDto = UpdateBookImportDto;
//# sourceMappingURL=update-book-import.dto.js.map
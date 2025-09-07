"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBookDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_book_dto_1 = require("./create-book.dto");
class UpdateBookDto extends (0, swagger_1.PartialType)(create_book_dto_1.CreateBookDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateBookDto = UpdateBookDto;
//# sourceMappingURL=update-book.dto.js.map
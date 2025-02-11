"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAnswerDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_answer_dto_1 = require("./create-answer.dto");
class UpdateAnswerDto extends (0, swagger_1.PartialType)(create_answer_dto_1.CreateAnswerDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateAnswerDto = UpdateAnswerDto;
//# sourceMappingURL=update-answer.dto.js.map
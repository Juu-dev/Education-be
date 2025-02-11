"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateExerciseDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_exercise_dto_1 = require("./create-exercise.dto");
class UpdateExerciseDto extends (0, swagger_1.PartialType)(create_exercise_dto_1.CreateExerciseDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateExerciseDto = UpdateExerciseDto;
//# sourceMappingURL=update-exercise.dto.js.map
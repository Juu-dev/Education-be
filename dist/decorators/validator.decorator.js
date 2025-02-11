"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsTimeFormat = void 0;
const class_validator_1 = require("class-validator");
const time_1 = require("./class-validator-custom/time");
function IsTimeFormat(validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            name: 'isTimeFormat',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: time_1.validate,
        });
    };
}
exports.IsTimeFormat = IsTimeFormat;
//# sourceMappingURL=validator.decorator.js.map
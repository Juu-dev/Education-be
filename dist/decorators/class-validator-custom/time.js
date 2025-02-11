"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
function validate(value) {
    const regexp = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/;
    return typeof value === 'string' && regexp.test(value);
}
exports.validate = validate;
//# sourceMappingURL=time.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListNeededMaskFields = exports.COMMON_CONSTANT = void 0;
exports.COMMON_CONSTANT = {
    DEFAULT_PAGE_SIZE: 10,
    DEFAULT_PAGE: 1,
    LOG_TIMESTAMP_FORMAT: 'YYYY-MM-DD HH:mm:ss',
    RADIX_BASE: 10,
    SALT_ROUND: 10,
    COOKIE_EXPIRES_IN: 604800000,
    SKU_PREFIX: 'SP',
    SKU_LENGTH: 9,
};
exports.ListNeededMaskFields = {
    COMPLETE: [
        'password',
        'otp',
        'otpExpiredAt',
    ],
    SEMI: [],
};
//# sourceMappingURL=common.constant.js.map
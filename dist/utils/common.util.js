"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformObject = exports.maskString = exports.isDateRangeOverlapping = exports.allRecordsCondition = exports.makePaginationResponse = exports.parseToISODate = exports.isNotEmptyStr = void 0;
const moment_1 = __importDefault(require("moment"));
const _n_constants_1 = require("../constants/index");
const filter_exceptions_1 = require("../filter-exceptions");
function isNotEmptyStr(s) {
    return s && s !== '';
}
exports.isNotEmptyStr = isNotEmptyStr;
function parseToISODate(dateString, type) {
    const isoDate = (date) => {
        if (type === 'from') {
            return date.startOf('day').toISOString();
        }
        if (type === 'to') {
            return date.endOf('day').toISOString();
        }
        return date.toISOString();
    };
    const iso8601Date = (0, moment_1.default)(dateString, moment_1.default.ISO_8601, true);
    if (iso8601Date.isValid()) {
        return isoDate(iso8601Date);
    }
    const customFormatDate = (0, moment_1.default)(dateString, 'DD-MM-YYYY', true);
    if (customFormatDate.isValid()) {
        return isoDate(customFormatDate);
    }
    throw new filter_exceptions_1.BaseException(_n_constants_1.Errors.INVALID_INPUT);
}
exports.parseToISODate = parseToISODate;
function makePaginationResponse(data, page, pageSize, total) {
    return {
        page,
        pageSize,
        totalPage: Math.ceil(total / pageSize),
        total,
        data,
    };
}
exports.makePaginationResponse = makePaginationResponse;
exports.allRecordsCondition = {
    OR: [
        { isActive: true },
        { isActive: false },
    ],
};
function isDateRangeOverlapping(startDate1, endDate1, startDate2, endDate2) {
    return !((0, moment_1.default)(endDate1).isBefore(startDate2) ||
        (0, moment_1.default)(startDate1).isAfter(endDate2));
}
exports.isDateRangeOverlapping = isDateRangeOverlapping;
function maskString(hashCharacter, endingWith, originString, startWith) {
    return startWith
        ? originString.slice(0, startWith) +
            originString
                .slice(startWith, -endingWith)
                .replace(/./g, hashCharacter) +
            originString.slice(-endingWith)
        : originString.slice(0, -endingWith).replace(/./g, hashCharacter) +
            originString.slice(-endingWith);
}
exports.maskString = maskString;
function transformObject(obj, type) {
    try {
        if (!obj || typeof obj !== 'object') {
            return obj;
        }
        Object.keys(obj).forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                if (_n_constants_1.ListNeededMaskFields.COMPLETE.includes(key)) {
                    if (type === 'request') {
                        obj[key] = '********';
                    }
                    else {
                        delete obj[key];
                    }
                }
                else if (_n_constants_1.ListNeededMaskFields.SEMI.includes(key) && obj[key]) {
                    const { length } = obj[key].toString();
                    if (length > 8) {
                        obj[key] = maskString('*', 3, obj[key], 3);
                    }
                    else if (length > 3) {
                        obj[key] = maskString('*', 0, obj[key], 0);
                    }
                    else {
                        obj[key] = '*'.repeat(length);
                    }
                }
                else {
                    obj[key] = transformObject(obj[key], type);
                }
            }
        });
        return obj;
    }
    catch (error) {
        return obj;
    }
}
exports.transformObject = transformObject;
//# sourceMappingURL=common.util.js.map
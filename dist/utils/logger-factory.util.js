"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.devLogger = exports.logger = void 0;
const winston_1 = require("winston");
const path_1 = __importDefault(require("path"));
const _n_constants_1 = require("../constants/index");
const logger = ({ infoFile, errorFile }) => (0, winston_1.createLogger)({
    level: 'info',
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: _n_constants_1.COMMON_CONSTANT.LOG_TIMESTAMP_FORMAT,
    }), winston_1.format.errors({ stack: true }), winston_1.format.splat(), winston_1.format.json()),
    defaultMeta: { service: 'category-sync-data' },
    transports: [
        new winston_1.transports.File({
            filename: path_1.default.join(__dirname, `../../logs/${errorFile}`),
            level: 'error',
        }),
        new winston_1.transports.File({
            filename: path_1.default.join(__dirname, `../../logs/${infoFile}`),
        }),
    ],
});
exports.logger = logger;
exports.devLogger = (0, exports.logger)({
    infoFile: 'dev-info.log',
    errorFile: 'dev-error.log',
});
//# sourceMappingURL=logger-factory.util.js.map
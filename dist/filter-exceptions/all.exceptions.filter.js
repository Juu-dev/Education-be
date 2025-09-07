"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = exports.BaseException = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const moment_1 = __importDefault(require("moment"));
const uuid_1 = require("uuid");
const _n_constants_1 = require("../constants/index");
const _n_utils_1 = require("../utils/index");
class BaseException extends common_1.HttpException {
    constructor(response, cause) {
        super(response, response.statusCode || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        this.stack = cause;
    }
}
exports.BaseException = BaseException;
let AllExceptionsFilter = class AllExceptionsFilter {
    constructor(configService) {
        this.configService = configService;
        this.loggerTerminal = new common_1.Logger('😟😕 HttpExceptionFilter');
        this.logger = (0, _n_utils_1.logger)({
            infoFile: 'access-info.log',
            errorFile: 'access-error.log',
        });
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const stacktraceEnable = parseInt(this.configService.get('STACKTRACE_ENABLE'), _n_constants_1.COMMON_CONSTANT.RADIX_BASE);
        if (exception instanceof common_1.InternalServerErrorException) {
            exception = new BaseException(_n_constants_1.Errors.DEFAULT, exception.stack);
        }
        else if (!(exception instanceof BaseException)) {
            exception = new BaseException(_n_constants_1.Errors.DEFAULT);
        }
        const detailError = exception.getResponse();
        const response = ctx.getResponse();
        const rawReqBody = request.body;
        const requestBody = (0, _n_utils_1.transformObject)(rawReqBody, 'request');
        const responsePayload = {
            errorCode: detailError.errorCode,
            message: detailError.message,
            statusCode: detailError.statusCode,
        };
        const errorLog = {
            timestamp: (0, moment_1.default)().format(_n_constants_1.COMMON_CONSTANT.LOG_TIMESTAMP_FORMAT),
            id: (0, uuid_1.v4)(),
            request: {
                type: 'http',
                method: request.method,
                path: request.path,
                ip: request.ip,
                userAgent: request.get('user-agent'),
                body: requestBody,
                params: request.params,
            },
            response: {
                body: stacktraceEnable
                    ? {
                        ...detailError,
                        stacktrace: exception.stack,
                    }
                    : detailError,
            },
        };
        common_1.Logger.log("exception: ", exception);
        response
            .status(exception.getStatus() || common_1.HttpStatus.BAD_REQUEST)
            .json(responsePayload);
        this.loggerTerminal.error(JSON.stringify(errorLog));
        this.logger.error(JSON.stringify(errorLog));
        return exception;
    }
};
AllExceptionsFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AllExceptionsFilter);
exports.AllExceptionsFilter = AllExceptionsFilter;
//# sourceMappingURL=all.exceptions.filter.js.map
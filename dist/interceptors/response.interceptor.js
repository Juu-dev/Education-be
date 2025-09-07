"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const moment_1 = __importDefault(require("moment"));
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const uuid_1 = require("uuid");
const _n_constants_1 = require("../constants/index");
const _n_utils_1 = require("../utils/index");
const filter_exceptions_1 = require("../filter-exceptions");
let ResponseInterceptor = class ResponseInterceptor {
    constructor() {
        this.logger = (0, _n_utils_1.logger)({
            infoFile: 'response-info.log',
            errorFile: 'response-error.log',
        });
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((res) => this.responseHandler(res, context)), (0, operators_1.catchError)((error) => (0, rxjs_1.throwError)(() => error)));
    }
    responseHandler(res, context) {
        if (res instanceof filter_exceptions_1.BaseException) {
            throw res;
        }
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const requestId = (0, uuid_1.v4)();
        const rawReqBody = request.body;
        const rawResBody = typeof res === 'object' ? JSON.parse(JSON.stringify(res)) : res;
        const requestBody = (0, _n_utils_1.transformObject)(typeof rawReqBody === 'object'
            ? JSON.parse(JSON.stringify(rawReqBody))
            : rawReqBody, 'request');
        const responseBody = (0, _n_utils_1.transformObject)(rawResBody, 'response');
        const responseLog = {
            timestamp: (0, moment_1.default)().format(_n_constants_1.COMMON_CONSTANT.LOG_TIMESTAMP_FORMAT),
            id: requestId,
            request: {
                type: 'http',
                body: requestBody,
                ip: request.ip,
                userAgent: request.get('user-agent'),
                path: request?.path,
            },
            response: {
                body: responseBody,
            },
        };
        this.logger.info(responseLog);
        return {
            message: 'Success',
            success: true,
            statusCode: common_1.HttpStatus.OK,
            result: responseBody,
        };
    }
};
ResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], ResponseInterceptor);
exports.ResponseInterceptor = ResponseInterceptor;
//# sourceMappingURL=response.interceptor.js.map
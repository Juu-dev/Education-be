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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileInterceptor = exports.MULTER_MODULE_OPTIONS = void 0;
const common_1 = require("@nestjs/common");
const fastify_multer_1 = __importDefault(require("fastify-multer"));
const multer_util_1 = require("../utils/multer.util");
exports.MULTER_MODULE_OPTIONS = 'MULTER_MODULE_OPTIONS';
function FileInterceptor(fieldName, localOptions) {
    let MixinInterceptor = class MixinInterceptor {
        constructor(options = {}) {
            this.multer = fastify_multer_1.default({
                ...options,
                ...localOptions,
            });
        }
        async intercept(context, next) {
            const ctx = context.switchToHttp();
            await new Promise((resolve, reject) => this.multer.single(fieldName)(ctx.getRequest(), ctx.getResponse(), (err) => {
                if (err) {
                    const error = (0, multer_util_1.transformException)(err);
                    return reject(error);
                }
                resolve();
            }));
            return next.handle();
        }
    };
    MixinInterceptor = __decorate([
        __param(0, (0, common_1.Optional)()),
        __param(0, (0, common_1.Inject)(exports.MULTER_MODULE_OPTIONS)),
        __metadata("design:paramtypes", [Object])
    ], MixinInterceptor);
    return (0, common_1.mixin)(MixinInterceptor);
}
exports.FileInterceptor = FileInterceptor;
//# sourceMappingURL=file.interceptor.js.map
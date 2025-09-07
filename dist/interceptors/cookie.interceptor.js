"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieInterceptor = void 0;
const _n_constants_1 = require("../constants/index");
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let CookieInterceptor = class CookieInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.tap)((data) => {
            const ctx = context.switchToHttp();
            const response = ctx.getResponse();
            response.cookie('refreshToken', data.refreshToken, {
                expires: new Date(Date.now() + _n_constants_1.COMMON_CONSTANT.COOKIE_EXPIRES_IN),
                sameSite: 'none',
                secure: true,
                httpOnly: true,
            });
            delete data.refreshToken;
        }));
    }
};
CookieInterceptor = __decorate([
    (0, common_1.Injectable)()
], CookieInterceptor);
exports.CookieInterceptor = CookieInterceptor;
//# sourceMappingURL=cookie.interceptor.js.map
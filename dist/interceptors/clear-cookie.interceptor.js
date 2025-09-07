"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClearCookieInterceptor = void 0;
const common_1 = require("@nestjs/common");
let ClearCookieInterceptor = class ClearCookieInterceptor {
    intercept(context, next) {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        response.clearCookie('refreshToken', {
            sameSite: 'none',
            secure: true,
            httpOnly: true,
        });
        return next.handle().pipe();
    }
};
ClearCookieInterceptor = __decorate([
    (0, common_1.Injectable)()
], ClearCookieInterceptor);
exports.ClearCookieInterceptor = ClearCookieInterceptor;
//# sourceMappingURL=clear-cookie.interceptor.js.map
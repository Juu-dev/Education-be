"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('app', () => ({
    port: parseInt(process.env.PORT || '6000', 10),
    env: process.env.APP_ENV,
    clientUrl: process.env.CLIENT_URL,
    enableSwagger: process.env.ENABLE_SWAGGER,
    enableCors: process.env.ENABLE_CORS,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpTime: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshTokenExpTime: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
}));
//# sourceMappingURL=app.config.js.map
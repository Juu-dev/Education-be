"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtOptions = void 0;
const config_1 = require("@nestjs/config");
exports.JwtOptions = {
    global: true,
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: async (configService) => ({
        secret: configService.get('app.accessTokenSecret'),
        signOptions: {
            expiresIn: `${configService.get('app.accessTokenExpTime')}`,
        },
    }),
};
//# sourceMappingURL=jwt.options.js.map
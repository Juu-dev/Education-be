"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const colorette_1 = require("colorette");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("module-alias/register");
const _n_constants_1 = require("./constants/index");
const _n_exceptions_1 = require("./filter-exceptions/index");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT || 3000;
    app.use((0, cookie_parser_1.default)());
    app.enableCors({
        credentials: true,
        origin: ['http://localhost:5173'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        exceptionFactory: (errors) => {
            console.log("exceptionFactory: ", errors);
            const { constraints } = errors[0];
            let validationErrFormat = _n_constants_1.Errors.VALIDATION_ERROR;
            validationErrFormat = {
                ...validationErrFormat,
                message: `${constraints[Object.keys(constraints)[0]]}. <Ref: CO06>`,
            };
            return new _n_exceptions_1.BaseException(validationErrFormat);
        },
    }));
    const globalPrefix = 'api/v1';
    app.setGlobalPrefix(globalPrefix);
    setupOpenApi(app);
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: ${(0, colorette_1.red)(`http://localhost:${port}/${globalPrefix}`)}`);
    common_1.Logger.log(`🚀 Application Swagger is running on: ${(0, colorette_1.red)(`http://localhost:${port}/swagger`)}`);
}
function setupOpenApi(app) {
    const options = new swagger_1.DocumentBuilder()
        .setTitle('EDUCATION API')
        .setDescription('NestJS application for Education Backend')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('swagger', app, document);
}
bootstrap();
//# sourceMappingURL=main.js.map
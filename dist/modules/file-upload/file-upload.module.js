"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const aws_s3_service_1 = require("../../utils/services/aws-s3.service");
const file_upload_controller_1 = require("./file-upload.controller");
const file_upload_service_1 = require("./file-upload.service");
const providers = [
    {
        provide: aws_s3_service_1.AwsS3Service,
        useFactory: () => new aws_s3_service_1.AwsS3Service({
            endpoint: 'https://s3.us-east-1.amazonaws.com',
            bucketApiVersion: '2006-03-01',
            bucketRegion: 'us-east-1',
            bucketName: 'mydocumenteducation',
            accessKey: 'AKIA6GBMDQLJE6X3VKSZ',
            secretKey: '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',
        }),
        inject: [config_1.ConfigService],
    },
];
let FileUploadModule = class FileUploadModule {
};
FileUploadModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [file_upload_controller_1.FileUploadController],
        providers: [file_upload_service_1.FileUploadService, ...providers],
        exports: [...providers],
    })
], FileUploadModule);
exports.FileUploadModule = FileUploadModule;
//# sourceMappingURL=file-upload.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
const iconv_lite_1 = require("iconv-lite");
const common_1 = require("@nestjs/common");
const aws_sdk_1 = require("aws-sdk");
const ENV_S3 = {
    accessKeyId: "AKIAVA5YLB7S735L52N3",
    secretAccessKey: "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",
    bucketName: "miraischools"
};
let FileUploadService = class FileUploadService {
    async uploadFile(file) {
        const s3 = new aws_sdk_1.S3({
            accessKeyId: ENV_S3.accessKeyId,
            secretAccessKey: ENV_S3.secretAccessKey,
        });
        const originalName = (0, iconv_lite_1.decode)(Buffer.from(file.originalname, 'binary'), 'utf-8');
        const params = {
            Bucket: ENV_S3.bucketName,
            Key: originalName,
            Body: file.buffer,
            ACL: 'public-read',
            ContentType: file.mimetype,
            ContentDisposition: 'inline',
            CreateBucketConfiguration: {
                LocationConstraint: 'us-east-1',
            },
        };
        try {
            const s3Response = await s3.upload(params)
                .promise();
            return s3Response;
        }
        catch (e) {
            console.log(e);
        }
    }
};
FileUploadService = __decorate([
    (0, common_1.Injectable)()
], FileUploadService);
exports.FileUploadService = FileUploadService;
//# sourceMappingURL=file-upload.service.js.map
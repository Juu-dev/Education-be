"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsS3Service = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const common_1 = require("@nestjs/common");
const node_http_handler_1 = require("@smithy/node-http-handler");
const https = __importStar(require("https"));
const getUTCDate = () => {
    const currentDate = new Date();
    const year = currentDate.getUTCFullYear();
    const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getUTCDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
};
let AwsS3Service = class AwsS3Service {
    constructor(s3Config) {
        this.s3Config = s3Config;
        this.s3 = new client_s3_1.S3({
            endpoint: this.s3Config.endpoint,
            apiVersion: this.s3Config.bucketApiVersion,
            region: this.s3Config.bucketRegion,
            credentials: {
                accessKeyId: this.s3Config.accessKey,
                secretAccessKey: this.s3Config.secretKey,
            },
            requestHandler: new node_http_handler_1.NodeHttpHandler({
                httpsAgent: new https.Agent({
                    secureProtocol: 'TLSv1_2_method',
                }),
            }),
        });
    }
    async uploadImage(imageId, file, bucketName, folder = '') {
        const fileExtension = file.mimetype.split('/')[1];
        const newFolder = `${(bucketName.split('/')[1] || '') + folder}/${getUTCDate()}`;
        const key = `${newFolder}/` + `${imageId}.${fileExtension}`;
        const uploadedFile = await this.s3.putObject({
            Bucket: bucketName.split('/')[0],
            Body: file.buffer,
            Key: key,
            ContentType: file.mimetype,
        });
        return {
            key,
            bucket: bucketName.split('/')[0],
            region: this.s3Config.bucketRegion,
            objectId: uploadedFile.VersionId,
            url: `${bucketName}/${key}`,
        };
    }
    async uploadFile(fileId, file, bucketName, folder = '') {
        const fileExtension = file.mimetype.split('/')[1];
        const newFolder = `${(bucketName.split('/')[1] || '') + folder}/${getUTCDate()}`;
        const key = `${newFolder}/` + `${fileId}.${fileExtension}`;
        const uploadedFile = await this.s3.putObject({
            Bucket: bucketName.split('/')[0],
            Body: file.buffer,
            Key: key,
            ContentType: file.mimetype,
        });
        return {
            key,
            bucket: bucketName.split('/')[0],
            region: this.s3Config.bucketRegion,
            objectId: uploadedFile.VersionId,
            url: `${bucketName}/${key}`,
        };
    }
    async generatePutObjectUrl(key, contentType) {
        const putObjectParams = {
            Bucket: this.s3Config.bucketName.split('/')[0],
            Key: `${this.s3Config.bucketName.split('/')[1]}/${key}`,
            ACL: client_s3_1.ObjectCannedACL.public_read,
            ContentType: contentType,
        };
        const command = new client_s3_1.PutObjectCommand(putObjectParams);
        return (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, { expiresIn: 3600 });
    }
    async deleteImage(key) {
        try {
            const result = await this.s3.deleteObject({
                Bucket: this.s3Config.bucketName.split('/')[0],
                Key: key,
            });
            return {
                success: result.DeleteMarker,
                message: 'Success',
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
    async deleteMultiImages(keys) {
        try {
            const command = new client_s3_1.DeleteObjectsCommand({
                Bucket: this.s3Config.bucketName.split('/')[0],
                Delete: {
                    Objects: keys.map((key) => ({
                        Key: key,
                    })),
                },
                BypassGovernanceRetention: true,
            });
            const { Deleted } = await this.s3.send(command);
            return {
                success: true,
                data: Deleted?.map((d, index) => `${index + 1} - ${d.Key}`) || [],
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
    async getAllObjects(bucketName) {
        const listObjectsParams = {
            Bucket: bucketName,
            MaxKeys: 1000,
        };
        const command = new client_s3_1.ListObjectsCommand(listObjectsParams);
        try {
            const response = await this.s3.send(command);
            return response.Contents?.map((object) => object.Key) || [];
        }
        catch (error) {
            console.error('Error listing objects:', error);
            throw error;
        }
    }
};
AwsS3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], AwsS3Service);
exports.AwsS3Service = AwsS3Service;
//# sourceMappingURL=aws-s3.service.js.map
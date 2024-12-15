import {decode} from 'iconv-lite';
import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

const ENV_S3 = {
    accessKeyId: "AKIAVA5YLB7S735L52N3",
    secretAccessKey: "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",
    bucketName: "miraischools"
}

@Injectable()
export class FileUploadService {
  // eslint-disable-next-line consistent-return
  async uploadFile(file) {
    const s3 = new S3({
      accessKeyId: ENV_S3.accessKeyId,
      secretAccessKey: ENV_S3.secretAccessKey,
    });

    const originalName = decode(Buffer.from(file.originalname, 'binary'), 'utf-8');

    const params =
            {
              Bucket: ENV_S3.bucketName,
              Key: originalName,
              Body: file.buffer,
              ACL: 'public-read',
              ContentType: file.mimetype,
              ContentDisposition: 'inline',
              CreateBucketConfiguration:
                    {
                      LocationConstraint: 'us-east-1',
                    },
            };

    try {
      const s3Response = await s3.upload(params)
        .promise();
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }
}

import {decode} from 'iconv-lite';
import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class FileUploadService {
  // eslint-disable-next-line consistent-return
  async uploadFile(file) {
    const s3 = new S3({
      accessKeyId: 'AKIA6GBMDQLJE6X3VKSZ',
      secretAccessKey: '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',
    });

    const originalName = decode(Buffer.from(file.originalname, 'binary'), 'utf-8');
    console.log('Decoded originalName:', originalName);

    const params =
            {
              Bucket: 'mydocumenteducation',
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

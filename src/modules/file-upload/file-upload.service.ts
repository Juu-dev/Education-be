
import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FileUploadService{
  constructor(
  ) {}

  async uploadFile(file) {
    const s3 = new S3({
        accessKeyId: "AKIA6GBMDQLJE6X3VKSZ",
        secretAccessKey: "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"
    });

    const params =
        {
          Bucket: "mydocumenteducation",
          Key: String(file.originalname),
          Body: file.buffer,
          ACL: "public-read",
          ContentType: file.mimetype,
          ContentDisposition:"inline",
          CreateBucketConfiguration:
              {
                LocationConstraint: "us-east-1"
              }
        };

    try
    {
      let s3Response = await s3.upload(params).promise();
      console.log(s3Response);
      return s3Response;
    }
    catch (e)
    {
      console.log(e);
    }
  }
}

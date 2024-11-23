import { Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AwsS3Service } from '@n-utils/services/aws-s3.service';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';

const providers: Provider[] = [
  {
    provide: AwsS3Service,
    useFactory: () =>
      new AwsS3Service({
        endpoint: 'https://s3.us-east-1.amazonaws.com',
        bucketApiVersion: '2006-03-01',
        bucketRegion: 'us-east-1',
        bucketName: 'mydocumenteducation',
        accessKey: 'AKIA6GBMDQLJE6X3VKSZ',
        secretKey: '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',
      }),
    inject: [ConfigService],
  },
];

@Module({
  imports: [], // Make sure to import ConfigModule if needed
  controllers: [FileUploadController],
  providers: [FileUploadService, ...providers],
  exports: [...providers],
})
export class FileUploadModule {
}

import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('file-upload')
export class FileUploadController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Thư mục lưu file
        filename: (req, file, callback) => {
          // Đổi tên file để tránh trùng lặp
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn dung lượng file 5MB
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'File uploaded successfully!',
      fileName: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
    };
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsOptional, IsString, IsInt, IsUUID } from 'class-validator';

export class UpdateLibBookDto {
  @IsUUID()
  @IsOptional()
  @ApiProperty({
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    description: 'ID của sách',
  })
  id?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Tiếng Việt Lớp 1 tập 1',
    description: 'Tiêu đề sách',
  })
  bookTitle?: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    example: 10,
    description: 'Số lượng sách còn lại trong thư viện',
  })
  remainingBooks?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    example: 10,
    description: 'Số lượng sách đã cho mượn từ thư viện',
  })
  borrowedBooks?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Cánh diều',
    description: 'Nhà xuất bản sách',
  })
  publisher?: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    example: 2023,
    description: 'Năm xuất bản sách',
  })
  publishedYear?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Sách giáo khoa',
    description: 'Loại sách',
  })
  bookType?: string;

  @IsDate()
  @IsOptional()
  @ApiProperty({
    example: '2024-11-03T10:15:30Z',
    description: 'Thời điểm sách được thêm vào hệ thống',
    type: String,
  })
  @Transform(({ value }) => new Date(value))
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({
    example: '2024-11-03T10:15:30Z',
    description: 'Thời điểm cập nhật thông tin sách',
    type: String,
  })
  @Transform(({ value }) => new Date(value))
  updatedAt?: Date;
}

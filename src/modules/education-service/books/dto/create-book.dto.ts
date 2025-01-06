import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty, IsNumber, IsOptional, IsString,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    example: 'Thế giới động vật',
    description: 'Tên của sách',
  })
  title?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    example: 'Hướng dẫn săn mồi và phát triển trong tự nhiên',
    description: 'Mô tả của sách',
  })
  description?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    example: 'Ngô Trung',
    description: 'Tên của tác giả',
  })
  author?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    example: 'Thiếu nhi',
    description: 'Thể loại sách',
  })
  bookType?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    example: 'NXB Trẻ',
    description: 'Tên của nhà xuất bản',
  })
  publishingHouse?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 5,
    description: 'Tổng số sách',
  })
  totalBooks?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 3,
    description: 'Số sách đang mượn',
  })
  borrowedBooks?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 5,
    description: 'Đánh giá sách',
  })
  evaluate?: string;
}

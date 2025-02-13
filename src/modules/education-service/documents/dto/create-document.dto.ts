import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate, IsOptional, IsString, IsUUID,
} from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'teacher-123',
    description: 'ID của giáo viên liên quan đến tài liệu',
  })
    userId?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'lecture-notes',
    description: 'Loại tài liệu',
  })
    type?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    example: 'Mô tả tài liệu',
    description: 'Mô tả chi tiết về tài liệu',
  })
    description?: string;

  @IsDate()
  @IsOptional()
  @ApiProperty({
    example: '2024-11-03T10:15:30Z',
    description: 'Thời điểm tạo tài liệu',
    type: String,
  })
  @Transform(({ value }) => new Date(value))
    createdAt?: Date;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    example: 'https://example.com/document.pdf',
    description: 'URL dẫn đến tài liệu',
  })
    url?: string;
}

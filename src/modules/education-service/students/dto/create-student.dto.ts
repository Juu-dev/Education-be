import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty, IsOptional, IsString, IsUUID,
} from 'class-validator';

export class CreateStudentDto {
  @IsUUID()
  @IsOptional()
  @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d482', description: 'ID của học sinh' })
    id?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d480',
    description: 'ID của người dùng liên quan đến học sinh',
  })
    userId?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d481', description: 'ID của lớp liên quan đến học sinh' })
    classId?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @ApiProperty({ example: 'https://example.com/metadata.json', description: 'URL của metadata liên quan đến học sinh' })
    metadataUrl?: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  @ApiProperty({ example: 'Nguyen Van B', description: 'Tên của học sinh' })
    name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '2005-01-01T00:00:00Z', description: 'Ngày sinh của học sinh', type: String })
  @Transform(({ value }) => new Date(value))
    birthDate?: Date;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @ApiProperty({ example: 'Nguyen Van A', description: 'Tên phụ huynh của học sinh' })
    parentName?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @ApiProperty({ example: 'Cấp 10', description: 'Cấp học của học sinh' })
    level?: string;
}

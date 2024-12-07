import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty, IsOptional, IsString, IsUUID,
} from 'class-validator';

export class CreateBookDto {
  @IsUUID()
  @IsOptional()
  @ApiProperty({
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    description: 'ID của giáo viên',
  })
    id?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d480',
    description: 'ID của người dùng liên quan đến giáo viên',
  })
    userId?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d481',
    description: 'ID của lớp liên quan đến giáo viên',
  })
    classId?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    example: 'https://example.com/metadata.json',
    description: 'URL của metadata liên quan đến giáo viên',
  })
    metadataUrl?: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    example: 'Nguyen Van A',
    description: 'Tên của giáo viên',
  })
    name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '1990-01-01T00:00:00Z',
    description: 'Ngày sinh của giáo viên',
    type: String,
  })
    dob?: Date;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    example: 'Giáo viên chính',
    description: 'Chức vụ của giáo viên',
  })
    position?: string;
}

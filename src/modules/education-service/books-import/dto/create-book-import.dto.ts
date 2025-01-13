import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty, IsNumber, IsString,
} from 'class-validator';

export class CreateBookImportDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    example: 'Thế giới động vật',
    description: 'Tên của sách',
  })
  title?: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    example: '2023',
    description: 'năm xuất bản',
  })
  yearOfPublication?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 5,
    description: 'Số sách đã cho mượn',
  })
  borrowedAmount?: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 5,
    description: 'Tổng số sách',
  })
  amount?: number;


}

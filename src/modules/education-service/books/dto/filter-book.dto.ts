import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class FilterBookDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 5,
    description: 'Loại sách',
  })
  type?: string;
}

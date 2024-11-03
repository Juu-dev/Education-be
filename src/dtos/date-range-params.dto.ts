import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DateRangeDto {
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @ApiProperty({ required: false, example: '2023-12-12' })
    from?: Date;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @ApiProperty({ required: false, example: '2024-12-12' })
    to?: Date;
}

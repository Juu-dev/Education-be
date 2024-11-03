import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class WorkShiftDTO {
  @Transform(({ value }) => new Date(`1970-01-01T${value}`))
  @IsNotEmpty()
  @IsDate()
  @ApiProperty({ type: String, example: '08:00' })
    start: Date;

  @Transform(({ value }) => new Date(`1970-01-01T${value}`))
  @IsNotEmpty()
  @IsDate()
  @ApiProperty({ type: String, example: '09:00' })
    end: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchClassDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'tester',
    required: false,
  })
    search: string;
}

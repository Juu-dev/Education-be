import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import {Transform} from "class-transformer";

export class FilterDocumentDto {
  @ApiProperty({
    required: false,
    example: ["1", "2", "3"],
    type: [String],
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return [value];
    }
    return value;
  })
  @IsArray()
    type: string[];
}

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchDocumentDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'tester',
    required: false,
  })
    search: string;
}

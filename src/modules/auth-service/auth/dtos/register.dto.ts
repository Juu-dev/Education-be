import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'test@gmail.com' })
    email?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123456' })
    password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Nguyễn Văn A' })
    name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Nguyễn Văn B' })
    parentName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '1A' })
    class?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty, IsString, IsOptional, IsBoolean, IsObject,
} from 'class-validator';

export class Create{{Service_not_s}}Dto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Trung tam 5F' })
    name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Mô tả ở đây nhé' })
    description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '343/5F Đ. Tô Hiến Thành, Phường 13, Quận 10, Thành phố Hồ Chí Minh 700000, Vietnam' })
    address?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '#ffffff' })
    color?: string;

  @IsObject()
  @IsOptional()
  @ApiProperty({ example: { name: 'Nguyen Minh Thuan' } })
    metadata?: object;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: true })
    status: boolean;
}

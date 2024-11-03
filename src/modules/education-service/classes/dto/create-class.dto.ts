import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
    IsNotEmpty, IsString, IsOptional, IsInt, IsPositive,
} from 'class-validator';

export class CreateClassDto {
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.trim())
    @ApiProperty({ example: 'Lớp 10A', description: 'Tên của lớp học' })
    name: string;

    @IsOptional()
    @IsInt()
    @IsPositive()
    @ApiProperty({ example: 30, description: 'Số lượng học sinh trong lớp', required: false })
    amount?: number;
}

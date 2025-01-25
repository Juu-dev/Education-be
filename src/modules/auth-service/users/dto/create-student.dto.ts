import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail, IsOptional, IsString, IsUUID,
} from 'class-validator';
import {Transform} from "class-transformer";

export class CreateStudentDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'tester' })
    name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '0918598843' })
    phone: string;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @ApiProperty({ example: '09/08/2002' })
    birthDate: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Tran Pham' })
    parentName: string;

  @IsUUID()
  @IsString()
  @IsOptional()
  @ApiProperty({ example: '123123123123' })
    classId: string;
}

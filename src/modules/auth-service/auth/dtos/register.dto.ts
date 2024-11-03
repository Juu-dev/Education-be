import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional, IsString,} from 'class-validator';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'admin'})
    username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: '123456'})
    password: string;

    @IsString()
    @IsOptional()
    @ApiProperty({example: 'test@gmail.com'})
    email?: string;
}

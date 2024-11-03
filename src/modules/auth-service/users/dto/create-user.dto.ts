import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsOptional, IsString,} from 'class-validator';

export class CreateUserDto {
    @IsString()
    // @IsMobilePhone('vi-VN')
    @IsNotEmpty()
    @ApiProperty({example: '0123456799'})
    username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'tester'})
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({example: 'https://www.example.com/image.jpg'})
    avatarUrl: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: '123456'})
    password: string;

    @IsString()
    @IsEmail({}, {message: 'EMAIL_IS_INVALID'})
    @IsOptional()
    @ApiProperty({example: 'test@gmail.com'})
    email: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ForgotPasswordDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'admin' })
    username: string;
}

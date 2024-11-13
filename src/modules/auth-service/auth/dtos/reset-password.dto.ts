import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '123456' })
    newPassword: string;
}

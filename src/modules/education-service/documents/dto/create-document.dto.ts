import {ApiProperty} from '@nestjs/swagger';
import {Transform} from 'class-transformer';
import {IsDate, IsOptional, IsString, IsUUID,} from 'class-validator';

export class CreateDocumentDto {
    @IsUUID()
    @IsOptional()
    @ApiProperty({
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        description: 'ID của tài liệu'
    })
    id?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        example: 'teacher-123',
        description: 'ID của giáo viên liên quan đến tài liệu'
    })
    teacherId?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        example: 'lecture-notes',
        description: 'Loại tài liệu'
    })
    type?: string;

    @IsString()
    @IsOptional()
    @Transform(({value}) => value.trim())
    @ApiProperty({
        example: 'Mô tả tài liệu',
        description: 'Mô tả chi tiết về tài liệu'
    })
    description?: string;

    @IsDate()
    @IsOptional()
    @ApiProperty({
        example: '2024-11-03T10:15:30Z',
        description: 'Thời điểm tạo tài liệu',
        type: String
    })
    @Transform(({value}) => new Date(value))
    createdAt?: Date;

    @IsString()
    @IsOptional()
    @Transform(({value}) => value.trim())
    @ApiProperty({
        example: 'https://example.com/document.pdf',
        description: 'URL dẫn đến tài liệu'
    })
    url?: string;

    @IsString()
    @IsOptional()
    @Transform(({value}) => value.trim())
    @ApiProperty({
        example: 'https://example.com/metadata.json',
        description: 'URL của metadata liên quan đến tài liệu'
    })
    metadataUrl?: string;
}

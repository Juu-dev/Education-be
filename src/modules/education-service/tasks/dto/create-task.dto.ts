import {ApiProperty} from '@nestjs/swagger';
import {Transform} from 'class-transformer';
import {IsDate, IsNotEmpty, IsOptional, IsString, IsUUID,} from 'class-validator';

export class CreateTaskDto {
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({example: '429860cf-d4c7-4439-b94e-def5bec2179f', description: 'ID của người giao task'})
    assignerId: string;

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({example: 'eee47eda-75bc-4c6b-8937-511a20fbe863', description: 'ID của người nhận task'})
    assigneeId: string;

    @IsString()
    @IsOptional()
    @Transform(({value}) => value.trim())
    @ApiProperty({example: 'Hoàn thành', description: 'Trạng thái của task'})
    status?: string;

    @IsString()
    @IsOptional()
    @Transform(({value}) => value.trim())
    @ApiProperty({example: 'Thu xếp hành lý', description: 'Miêu tả của task'})
    taskDescription?: string;

    @IsDate()
    @IsNotEmpty()
    @ApiProperty({
        example: '2024-11-03T10:15:30Z',
        description: 'Thời điểm giao task',
        type: String
    })
    @Transform(({value}) => new Date(value))
    assignedAt: Date;

    @IsDate()
    @IsOptional()
    @ApiProperty({
        example: '2024-11-03T10:15:30Z',
        description: 'Thời điểm bắt đầu task',
        type: String
    })
    @Transform(({value}) => new Date(value))
    startTime?: Date;

    @IsDate()
    @IsOptional()
    @ApiProperty({
        example: '2024-11-03T10:15:30Z',
        description: 'Thời điểm kết thúc task',
        type: String
    })
    @Transform(({value}) => new Date(value))
    endTime?: Date;
}

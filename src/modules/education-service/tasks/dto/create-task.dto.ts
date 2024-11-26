import {ApiProperty} from '@nestjs/swagger';
import {Transform} from 'class-transformer';
import {IsDate, IsNotEmpty, IsOptional, IsString, IsUUID,} from 'class-validator';

export class CreateTaskDto {
    @IsUUID()
    @IsOptional()
    @ApiProperty({example: 'f47ac10b-58cc-4372-a567-0e02b2c3d482', description: 'ID của task'})
    id?: string;

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({example: 'a5eeea5d-c032-4a41-9106-e5d4b7bf5acb', description: 'ID của người giao task'})
    assignerId: string;

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({example: '155d7667-fa3e-4426-8ed2-34f7bd4ab19b', description: 'ID của người nhận task'})
    assigneeId: string;

    @IsString()
    @IsOptional()
    @Transform(({value}) => value.trim())
    @ApiProperty({example: 'Hoàn thành/ chưa hoàn thành', description: 'Trạng thái của task'})
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

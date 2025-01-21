import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {IsNotEmpty, IsUUID, ValidateNested} from 'class-validator';

export class AnswerDto {
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({example: '429860cf-d4c7-4439-b94e-def5bec2179f', description: 'ID của người giao task'})
    questionId: string;

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({example: 'eee47eda-75bc-4c6b-8937-511a20fbe863', description: 'ID của người nhận task'})
    optionId: string;
}

export class CreateAnswerDto {
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({example: '429860cf-d4c7-4439-b94e-def5bec2179f', description: 'ID của người giao task'})
    studentId: string;

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({example: 'eee47eda-75bc-4c6b-8937-511a20fbe863', description: 'ID của người nhận task'})
    exerciseId: string;

    @ValidateNested({ each: true })
    @Type(() => AnswerDto)
    answers: AnswerDto[];
}

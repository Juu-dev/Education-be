import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty, IsString, IsNumber, IsUUID,
} from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Trung tam 5F' })
    name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Mô tả ở đây nhé' })
    description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 60 })
    timeOut: number;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({example: '429860cf-d4c7-4439-b94e-def5bec2179f', description: 'ID của người giao exercise'})
    assignerId: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({example: 'eee47eda-75bc-4c6b-8937-511a20fbe863', description: 'ID của lớp nhận exercise'})
    classAssigneeId: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({example: 'eee47eda-75bc-4c6b-8937-511a20fbe863', description: 'ID của quiz'})
    quizId: string;
}

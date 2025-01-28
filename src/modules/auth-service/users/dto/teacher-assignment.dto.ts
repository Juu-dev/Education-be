import {IsString, ValidateNested, IsOptional, IsNotEmpty} from 'class-validator';
import { Type } from 'class-transformer';

class ClassItem {
  @IsNotEmpty()
  @IsString()
  teacherId: string;

  @IsOptional()
  @IsString()
  classId?: string | null;
}

export class TeacherAssignmentDto {
  @ValidateNested({ each: true })
  @Type(() => ClassItem)
  school: ClassItem[];
}

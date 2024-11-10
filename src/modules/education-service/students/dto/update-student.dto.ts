import { PartialType } from '@nestjs/swagger';
import { CreateStudentDto } from '@n-modules/education-service/students/dto/create-student.dto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
}

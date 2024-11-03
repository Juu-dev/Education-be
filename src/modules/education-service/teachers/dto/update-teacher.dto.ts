import {PartialType} from '@nestjs/swagger';
import {CreateTeacherDto} from "@n-modules/education-service/teachers/dto/create-teacher.dto";

export class UpdateTeacherDto extends PartialType(CreateTeacherDto) {
}

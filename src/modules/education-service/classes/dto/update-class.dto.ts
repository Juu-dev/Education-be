import { PartialType } from '@nestjs/swagger';
import { CreateClassDto } from '@n-modules/education-service/classes/dto/create-class.dto';

export class UpdateClassDto extends PartialType(CreateClassDto) {
}

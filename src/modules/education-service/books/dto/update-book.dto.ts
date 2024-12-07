import { PartialType } from '@nestjs/swagger';
import { CreateBookDto } from '@n-modules/education-service/books/dto/create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
}

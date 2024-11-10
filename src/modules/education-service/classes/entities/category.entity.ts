import { CategoryType, CateServiceCategory, Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryEntity implements CateServiceCategory {
  @ApiProperty()
    id: string;

  @ApiProperty()
    platformid: string;

  @ApiProperty()
    name: string;

  @ApiProperty()
    description: string;

  @ApiProperty()
    address: string;

  @ApiProperty()
    color: string;

  @ApiProperty()
    categoryType: CategoryType;

  @ApiProperty()
    metadata: Prisma.JsonValue;

  @ApiProperty()
    createdAt: Date;

  @ApiProperty()
    updatedAt: Date;

  @ApiProperty()
    isActive: boolean;
}

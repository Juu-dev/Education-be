import { AuthServiceRole } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class RoleEntity implements AuthServiceRole {
  @ApiProperty()
    id: string;

  @ApiProperty()
    platformid: string;

  @ApiProperty()
    name: string;

  @ApiProperty()
    description: string;

  @ApiProperty()
    createdAt: Date;

  @ApiProperty()
    updatedAt: Date;

  @ApiProperty()
    isActive: boolean;
}

import { Injectable } from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { RolesRepository } from './roles.repository';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {
  }

  async createRole(createRoleDto: CreateRoleDto) {
    return this.rolesRepository.create(createRoleDto as any);
  }

  async getRoles(
    page?: number,
    pageSize?: number,
  ) {
    const result = await this.rolesRepository.findAllPagination(page, pageSize);

    return result;
  }

  getRoleById(id: string) {
    return this.rolesRepository.findById(id);
  }

  updateRole(id: string, updateRoleDto: UpdateRoleDto) {
    return this.rolesRepository.updateById(id, updateRoleDto as any);
  }
}

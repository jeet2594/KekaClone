import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { In, Repository } from 'typeorm';
import { PermissionService } from 'src/permission/permission.service';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private permissionService: PermissionService,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  async createRoleWithPermissions(
    roleName: string,
    permissionIds: number[],
  ): Promise<Role> {
    // Find the permissions by their IDs
    const permissions = await this.permissionService.findByIds(permissionIds);

    // Check if all specified permission IDs exist
    if (permissionIds.length !== permissions.length) {
      throw new NotFoundException('One or more permissions not found');
    }

    // Create a new role with the specified name and permissions
    const role = this.roleRepository.create({
      name: roleName,
      permissions: permissions, // Assign the permissions
    });

    // Save the role to the database
    return await this.roleRepository.save(role);
  }

  async updateRoleWithPermissions(
    roleId: number,
    updatedData: any,
  ): Promise<Role> {
    // Find the role by its ID
    const role = await this.roleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.permissions', 'permissions')
      .where('role.id = :roleId', { roleId })
      .getOne();

    if (!role) {
      throw new NotFoundException('Role not found');
    }
    const permissionIds: number[] = updatedData.permissionIds;
    // Find the permissions by their IDs
    const permissions = await this.permissionService.findByIds(permissionIds);

    // Check if all specified permission IDs exist
    if (permissionIds.length !== permissions.length) {
      throw new NotFoundException('One or more permissions not found');
    }

    // Update the role's permissions with the new permissions
    role.permissions = permissions;
    role.name = updatedData.name;

    // Save the updated role to the database
    return this.roleRepository.save(role);
  }

  async findAll() {
    try {
      return await this.roleRepository.find();
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error; // Re-throw the error
    }
  }

  findOne(id: number) {
    return this.roleRepository.findOne({ where: { id } });
  }

  async findByIds(ids: number[]): Promise<Role[]> {
    return await this.roleRepository.findBy({ id: In(ids) });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}

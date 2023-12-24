import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionService: Repository<Permission>,
  ) {}
  async create(createPermissionDto: CreatePermissionDto) {
    try {
      const { name } = createPermissionDto;
      const permission = this.permissionService.create({ name });
      console.log(permission);

      return this.permissionService.save(permission);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.permissionService.find();
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error; // Re-throw the error
    }
  }

  async findByIds(ids: number[]): Promise<Permission[]> {
    return await this.permissionService.findBy({ id: In(ids) });
  }

  async findOne(id: number) {
    return await this.permissionService.findOne({ where: { id } });
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    try {
      const permission = await this.permissionService.findOne({ where: { id } });
      if (!permission) {
        throw new NotFoundException('permission not found');
      }
      permission.name = updatePermissionDto.name;
      return this.permissionService.save(permission);
    } catch (error) {
      throw error;
    }
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}

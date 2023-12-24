import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() requestData: any) {
    console.log('asdasd', requestData);

    try {
      const role = await this.rolesService.createRoleWithPermissions(
        requestData.name,
        requestData.permissionIds,
      );
      return { status: true, message: 'Successfully created!', role: role };
    } catch (error) {
      return { status: false, message: 'Something went wrong!' };
    }
  }

  @Get()
  async findAll() {
    try {
      const roles = await this.rolesService.findAll();
      return { status: true, message: 'success', roles };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const role = await this.rolesService.findOne(+id);
      return { status: true, message: 'success', role };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto) {
    try {
      await this.rolesService.updateRoleWithPermissions(+id, updateRoleDto);
      return { status: true, message: 'Role Updated' };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto) {
    try {
      await this.permissionService.create(createPermissionDto);
      return { status: true, message: 'Permission Created' };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  @Get()
  async findAll() {
    try {
      const permissions = await this.permissionService.findAll();
      return { status: true, message: 'success', permissions };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const permission = await this.permissionService.findOne(+id);
      return { status: true, message: 'success', permission };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    try {
      await this.permissionService.update(+id, updatePermissionDto);
      return { status: true, message: 'Permission Updated' };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionService.remove(+id);
  }

  @UseGuards(AuthGuard)
  @Post('user-permissions')
  async permission(@Request() req) {
    const user = req.user.user;
    const permissions = user.roles.flatMap((role) =>
      role.permissions.map((permission) => permission.name),
    );
    return { status: true, response: permissions };
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
  Query,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/role-guard/role.enum';
import { Roles } from 'src/role-guard/role.decorator';
import { RoleGuard } from 'src/role-guard/role.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { Permissions } from 'src/permission-guard/permission.decorator';
import { Permission } from 'src/permission-guard/permission.enum';
import { PermissionGuardGuard } from 'src/permission-guard/permission-guard.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return { status: true, message: 'success', response: user };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  // @Roles(Role.Admin)
  @Permissions(Permission.UserList)
  @UseGuards(AuthGuard, PermissionGuardGuard)
  @Get()
  async findAll() {
    try {
      const users = await this.usersService.findAll();
      return { status: true, message: 'Success', users: users };
    } catch (error) {
      return { status: false, message: 'Something went wrong' };
    }
  }

  @Permissions(Permission.UserList)
  @UseGuards(AuthGuard, PermissionGuardGuard)
  @Get('pagination')
  async pagination(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
    @Query('query') query: string = '',
  ) {
    console.log(page, perPage, query);

    try {
      const users = await this.usersService.paginate(page, perPage, query);
      console.log('users is ', users);

      return { status: true, message: 'Success', users: users };
    } catch (error) {
      console.log('=== pagination error is', error);

      return { status: false, message: 'Something went wrong' };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(+id);
      return { status: true, message: 'Success', user: user };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = this.usersService.updateUserWithRoles(+id, updateUserDto);
      return { status: true, message: 'Password Updated!', user };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  @Put(':id/password')
  async updatePassword(@Param('id') id: number, @Body() reqeustBody) {
    try {
      await this.usersService.updatePassword(+id, reqeustBody.password);
      return { status: true, message: 'Success' };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.usersService.remove(+id);
      return { status: true, message: 'User Deleted' };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }
}

import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/entities/role.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private rolesService: RolesService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(createUserDto: CreateUserDto): Promise<User | undefined> {
    try {
      console.log('user requests', createUserDto);
      const { name, email, password } = createUserDto;
      const hashedPassword = await bcrypt.hash(password, 10);
      // const { roles, password, ...userData } = createUserDto;
      const user = await this.userRepository.create({
        name,
        email,
        password: hashedPassword,
      });
      const newUser = await this.userRepository.save(user);
      if (!newUser) {
        throw new InternalServerErrorException('Failed to create user');
      }
      console.log('created user', newUser);
      await this.assignRolesToUser(newUser.id, createUserDto.roles);
      console.log(newUser);
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    return this.userRepository.find();
  }

  async paginate(page: number, perPage: number, query: string) {
    let whereClause = {};

    if (query) {
      // If a query is provided, add a condition to search by username or any other field
      whereClause = {
        where: [
          { name: Like(`%${query}%`) },
          { email: Like(`%${query}%`) },
          { lastname: Like(`%${query}%`) },
          // Add more fields to search if needed
        ],
        deleted_at: null,
      };
    } else {
      whereClause = {
        where: { deleted_at: null }, // Add the condition for deleted_at
      };
    }
    const [users, totalItems] = await this.userRepository.findAndCount({
      ...whereClause,
      skip: (page - 1) * perPage,
      take: perPage,
    });

    const totalPages = Math.ceil(totalItems / perPage);

    return {
      page,
      perPage,
      totalItems,
      totalPages,
      data: users,
    };
  }

  // async findAlll(limit: number, offset: number): Promise<User | undefined> {
  //   const [data, total] = await this.findAndCount({
  //     take: limit,
  //     skip: offset,
  //   });
  //   return {
  //     result: data,
  //     count: total,
  //   };
  // }

  async findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByField(field: string, value: any): Promise<User | undefined> {
    const query: Record<string, any> = {};
    query[field] = value;
    return await this.userRepository.findOne({ where: query });
  }

  async update(id: number, updateUserDto: any) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update user properties with values from updateUserDto
    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }
    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }
    // Add more properties as needed

    // Save the updated user entity
    const updatedUser = await this.userRepository.save(user);

    return updatedUser;
  }

  async updateUserWithRoles(userId: number, updatedData: any): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('roles.permissions', 'permissions')
      .where('user.id = :userId', { userId })
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const roleIds: number[] = updatedData.roles;
    const roles = await this.rolesService.findByIds(roleIds);

    if (roleIds.length !== roles.length) {
      throw new NotFoundException('One or more roles not found');
    }

    // Assign the retrieved roles to the user
    const { name, lastname, dob, joindate } = updatedData;
    user.roles = roles;
    user.name = name;
    user.lastname = lastname;
    user.dob = dob;
    user.joindate = joindate;
    // Save the updated user to the database
    return this.userRepository.save(user);
  }

  async updatePassword(userId: number, password: string) {
    try {
      const user = await this.findOne(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      return this.userRepository.save(user);
    } catch (error) {
      throw new NotFoundException('Password update failed');
    }
  }

  async assignRolesToUser(userId: number, roleIds: number[]): Promise<User> {
    const user = await this.findOne(userId);
    console.log('assign log', user);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const roles = await this.rolesService.findByIds(roleIds);
    user.roles = roles;
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    return await this.userRepository.update(id, { deleted_at: new Date() });
  }
}

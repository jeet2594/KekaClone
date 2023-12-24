import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service'; // Correct import path
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

// @Dependencies(UsersService, JwtService)
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findByField('email', username);
      const passwordMatch = await bcrypt.compare(pass, user.password);
      if (!passwordMatch || !user) {
        throw new UnauthorizedException();
      }

      const payload = { user };
      console.log('=== userData ', user);

      console.log('this is the login user details :', user.role);
      const permissions = user.roles.flatMap((role) =>
        role.permissions.map((permission) => permission.name),
      );
      console.log('this is the user permissions: ', permissions);

      return {
        status: 1,
        message: 'Successfully Logged In',
        token: await this.jwtService.signAsync(payload),
        permissions: permissions,
      };
    } catch (error) {
      return {
        status: 0,
        message: 'Wrong Credentials',
      };
    }
  }
}

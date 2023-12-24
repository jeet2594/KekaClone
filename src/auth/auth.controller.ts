import {
  Controller,
  HttpCode,
  Get,
  Post,
  Request,
  HttpStatus,
  Body,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseInterceptors(FileInterceptor(''))
  async signIn(@Body() signInDto: Record<string, any>) {
    console.log(signInDto);
    try {
      const token = await this.authService.signIn(
        signInDto.username,
        signInDto.password,
      );
      return token;
    } catch (error) {
      return { status: 0, message: error };
    }
  }

  @Get('check-token')
  @UseGuards(AuthGuard)
  checkAuth() {
    return { message: 'Authenticated successfully', status: 1 };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

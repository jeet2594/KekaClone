import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module'; // Import UsersModule
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthGuard } from './auth.guard';
// import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    // UsersModule, // Import UsersModule
    UsersModule,
    // forwardRef(() => UsersModule),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
})
export class AuthModule {}

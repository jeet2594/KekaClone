import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from './role.enum';
import { ROLES_KEY } from './role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const userData = user.user;
    // console.log('this is the user data', user);
    // return requiredRoles.some((name) => user.roles?.includes(name));
    if (!userData || !userData.roles || !userData.roles.length) {
      console.log('this is the roles', requiredRoles);
      console.log('this is list of roles', userData.roles);
      return false; // User has no roles or no user object, deny access.
    }

    // Check if any of the required roles' names are included in the user's roles.
    const hasRequiredRole = requiredRoles.some((requiredRole) =>
      userData.roles.some((userRole) => userRole.name === requiredRole),
    );

    return hasRequiredRole;
  }
}

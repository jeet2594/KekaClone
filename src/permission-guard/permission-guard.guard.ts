import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/role-guard/role.decorator';
import { Role } from 'src/role-guard/role.enum';
import { Permission } from './permission.enum';
import { PERMISSIONS_KEY } from './permission.decorator';

@Injectable()
export class PermissionGuardGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    console.log('required permissions is ', requiredPermissions);

    if (!requiredRoles && !requiredPermissions) {
      console.log('28 line true');

      return true; // No specific roles or permissions required, allow access.
    }

    const { user } = context.switchToHttp().getRequest();
    const userData = user.user;

    if (!userData || !userData.roles || !userData.roles.length) {
      return false; // User has no roles or no user object, deny access.
    }

    console.log('users data', userData);

    // Check if any of the required roles' names are included in the user's roles.
    // const hasRequiredRole = requiredRoles
    //   ? requiredRoles.some((requiredRole) =>
    //       userData.roles.some((userRole) => userRole.name === requiredRole),
    //     )
    //   : true; // If no roles are required, consider it fulfilled.
    // console.log('user data is ', userData);

    // Check if any of the required permissions are included in the user's permissions.
    const hasRequiredPermission = requiredPermissions
      ? requiredPermissions.every((requiredPermission) =>
          userData.roles.some((userRole) =>
            userRole.permissions.some(
              (permission) => permission.name === requiredPermission,
            ),
          ),
        )
      : true;
    // If no permissions are required, consider it fulfilled.
    console.log('has ', hasRequiredPermission);
    // console.log('required permission is', requiredPermission);

    return hasRequiredPermission;
  }
}

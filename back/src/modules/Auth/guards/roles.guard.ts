import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../../Users/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requireRoles) return true;

    const request = context.switchToHttp().getRequest();


    const user = request.user;

    // Verificamos el rol del usuario
    const hasRole = () => requireRoles.includes(user?.role);
    const valid = hasRole();

    if (!valid)
      throw new ForbiddenException(
        "You don't have permission to access this route",
      );

    return valid;
  }
}

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Role } from '../../Users/roles.enum'; 

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization header is missing or malformed');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token required');
    }

    try {
      const secret = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(token, { secret });

      // Verificar si el token ha expirado
      if (Date.now() >= payload.exp * 1000) {
        throw new UnauthorizedException('Token has expired');
      }

      // Asignar el rol basado en el payload (ya que puede tener Admin, Receptionist o Employee)
      let roles: Role[] = [];
      if (payload.isAdmin) {
        roles.push(Role.Admin);
      } else if (payload.isReceptionist) {
        roles.push(Role.Recep);
      } else if (payload.isEmployee) {
        roles.push(Role.Emplo);
      }

      if (roles.length === 0) {
        throw new ForbiddenException('User does not have valid roles');
      }

      // Adjuntar la información del usuario al request
      request.user = { ...payload, roles };

      return true;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expired');
      } else if (error.name === 'JsonWebTokenError') {
        throw new ForbiddenException('Invalid token');
      } else {
        throw new UnauthorizedException('Invalid token guard');
      }
    }
  }
}

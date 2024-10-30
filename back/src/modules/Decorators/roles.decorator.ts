import { SetMetadata } from '@nestjs/common';
import { Role } from '../Users/roles.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
